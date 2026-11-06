import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "vitest";

import { handleHook } from "../src/index.mjs";
import { repository, sandbox } from "./helpers.mjs";

test("agent hooks: silent outside a workshop, then a brief and the agent's work in storylines", async () => {
  const { root, host, suit } = sandbox();
  process.env.BOS_WORKSHOP = root;
  assert.equal(handleHook("session-start", { cwd: process.cwd() }), "", "no workshop yet: silent");
  assert.equal(existsSync(root), false, "hooks never create a workshop");

  await suit.bootstrap();
  const project = join(root, "forge", "scope", "project");
  repository(host, project);
  const brief = handleHook("session-start", { cwd: project, session_id: "s1", source: "startup" });
  assert.match(brief, /you are in: forge \/ scope \/ project/);
  assert.match(brief, /Resting, never call or prompt: EON/);

  handleHook("bash", { cwd: project, session_id: "s1", tool_input: { command: "npm test\necho done" } });
  handleHook("session-end", { cwd: project, session_id: "s1" });
  const stories = join(root, ".BOS/storylines/ttystories");
  const [story] = host.list(stories).map((e) => e.name);
  assert.match(story, /^ttystory-.+-claude-s1\.txt$/);
  assert.match(readFileSync(join(stories, story), "utf8"), /^\d+\t.+\/forge\/scope\/project\tnpm test\\necho done\n$/);
  const log = readFileSync(join(root, ".BOS/storylines/logs/workshop.jsonl"), "utf8")
    .trim()
    .split("\n")
    .map(JSON.parse);
  assert.equal(log[0].event, "bootstrap", "the core's own record comes first");
  assert.deepEqual(
    log.filter((e) => e.agent).map((e) => [e.event, e.session, e.place?.project]),
    [
      ["agent-session-start", "s1", "project"],
      ["agent-session-end", "s1", "project"],
    ],
  );
  delete process.env.BOS_WORKSHOP;
});
