// The plugin as it is installed: the bundle with no node_modules next to it, run like
// Claude Code, Gemini CLI or an MCP client run it.
import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "esbuild";
import { test } from "vitest";

import { ROOT, VERSION } from "../src/index.mjs";
import { sandbox } from "./helpers.mjs";

// a plugin root like the marketplace's: manifests, skills, resources, glossary, bin and the bundle
async function installed() {
  const plugin = mkdtempSync(join(tmpdir(), "bos-plugin-"));
  for (const part of ["package.json", "bin", "resources", "skills", "hooks", ".claude-plugin"]) {
    cpSync(join(ROOT, part), join(plugin, part), { recursive: true });
  }
  mkdirSync(join(plugin, "docs"));
  symlinkSync(join(ROOT, "docs", "glossary"), join(plugin, "docs", "glossary"));
  const { options } = await import("../esbuild.config.mjs");
  await build({ ...options, outfile: join(plugin, "dist", "bos-skillset.mjs"), logLevel: "silent" });
  return plugin;
}

const bos = (plugin, args, options = {}) =>
  execFileSync("node", [join(plugin, "bin", "bos"), ...args], { encoding: "utf8", ...options });

test("the bundle runs alone: CLI, the Claude Code hook, and an MCP handshake", async () => {
  const plugin = await installed();
  const { root, suit } = sandbox();
  await suit.bootstrap();
  const env = { ...process.env, BOS_WORKSHOP: root };

  assert.equal(bos(plugin, ["--version"], { env }).trim(), VERSION);
  assert.match(bos(plugin, ["help"], { env }), /core \(blacksmith-organization-system\)[\s\S]*suit \(bos-skillset\)/);
  assert.match(bos(plugin, ["workshop", "glossary", "scope"], { env }), /^# Scope/);
  const brief = bos(plugin, ["hook", "session-start"], { env, input: JSON.stringify({ cwd: root, session_id: "b1" }) });
  assert.match(brief, /^# BOS: Blacksmith Organization System\n.*you are in: workshop root/s);

  const server = spawn("node", [join(plugin, "bin", "bos"), "mcp"], { env, cwd: tmpdir() });
  const answers = [];
  let buffer = "";
  server.stdout.on("data", (chunk) => {
    buffer += chunk;
    for (let at = buffer.indexOf("\n"); at >= 0; at = buffer.indexOf("\n")) {
      answers.push(JSON.parse(buffer.slice(0, at)));
      buffer = buffer.slice(at + 1);
    }
  });
  const send = (message) => server.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", ...message })}\n`);
  const reply = async (id) => {
    for (let wait = 0; wait < 100 && !answers.some((a) => a.id === id); wait++)
      await new Promise((r) => setTimeout(r, 50));
    return answers.find((a) => a.id === id);
  };
  send({
    id: 1,
    method: "initialize",
    params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "0" } },
  });
  assert.equal((await reply(1)).result.serverInfo.name, "bos");
  send({ method: "notifications/initialized" });
  send({ id: 2, method: "tools/list" });
  const names = (await reply(2)).result.tools.map((t) => t.name);
  assert.ok(names.includes("workshop_status") && names.includes("agent_brief"));
  send({ id: 3, method: "tools/call", params: { name: "agent_brief", arguments: {} } });
  assert.match((await reply(3)).result.content[0].text, /House of Anubis/);
  server.kill();
}, 30000);
