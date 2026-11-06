#!/usr/bin/env node
// bos <model> <tool> [operands] [--flags]  ·  bos mcp  ·  bos hook <event>  ·  bos help  ·  bos --version
// The core's tools and the suit's, one command per run. In the bundle (dist/bos-skillset.mjs)
// this is the only entry: the plugin's hooks, MCP server and `bos` on PATH all start here.
import { inputFor, NodeHost, parseArgs } from "blacksmith-organization-system";

import { runHook } from "./agent/hook.mjs";
import { startMcpServer } from "./mcp/server.mjs";
import { VERSION } from "./self.mjs";
import Suit from "./suit.mjs";
import { CORE_TOOLS, findTool, SUIT_TOOLS, streams } from "./tools/_index.mjs";
import { CORE_VERSION } from "./version-of-core.mjs";
import { helpText } from "./views/help.mjs";

// what a tool returned, to the terminal: a streaming tool printed its data already, so its
// summary goes to stderr; --json gives the result as JSON; otherwise the tool's text for people
function print(entry, result, input, json) {
  const asJson = JSON.stringify(result ?? null, null, 2);
  const forPeople = entry.render ? entry.render(result, input) : asJson;
  if (streams(entry)) console.error(forPeople);
  else if (json || forPeople) console.log(json ? asJson : forPeople);
}

async function main(argv) {
  const { operands, flags } = parseArgs(argv);
  const { workshop, json, ...toolFlags } = flags;
  const [model, name, ...rest] = operands;
  const host = new NodeHost();
  if (flags.version) {
    console.log(VERSION);
    return 0;
  }
  if (model === "hook") return runHook(name);
  const suit = new Suit(host, { workshop: typeof workshop === "string" ? workshop : host.env("BOS_WORKSHOP") });
  if (model === "mcp") {
    await startMcpServer(suit);
    return null; // the server keeps the process alive
  }
  if (!model || model === "help") {
    console.log(helpText({ core: CORE_TOOLS, suit: SUIT_TOOLS }, { suit: VERSION, core: CORE_VERSION }));
    return 0;
  }
  const entry = findTool(model, name);
  if (json && streams(entry)) toolFlags.json = json;
  const input = inputFor(entry, rest, toolFlags);
  // Ctrl+C stops a long tool (bos workshop watch) cleanly instead of killing it
  const stop = new AbortController();
  process.once("SIGINT", () => stop.abort());
  const result = await entry.run(suit, input, { print: (line) => console.log(line), signal: stop.signal });
  print(entry, result, input, Boolean(json));
  return 0;
}

main(process.argv.slice(2)).then(
  (code) => {
    if (code !== null) process.exitCode = code;
  },
  (error) => {
    console.error(`bos: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  },
);
