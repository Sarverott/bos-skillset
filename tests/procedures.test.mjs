import assert from "node:assert/strict";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "vitest";

import { findTool } from "../src/index.mjs";
import { sandbox } from "./helpers.mjs";

const run = (model, name, suit, input = {}) => findTool(model, name).run(suit, input);
const events = (root) =>
  readFileSync(join(root, ".BOS/storylines/logs/workshop.jsonl"), "utf8").trim().split("\n").map(JSON.parse);

test("opening: a dry run plans, the real run builds the workshop, the guides, and records it", async () => {
  const { root, suit } = sandbox();
  const plan = await run("workshop", "open", suit, { dryRun: true });
  assert.equal(existsSync(root), false);
  assert.ok(plan.changes.includes(join(root, "AGENTS.md")));

  const opened = await run("workshop", "open", suit);
  assert.deepEqual(opened.changes.sort(), plan.changes.sort(), "the dry run planned exactly what was done");
  for (const area of ["forge", "devarmory", "craftbook", "archive", ".BOS"]) assert.ok(existsSync(join(root, area)));
  assert.match(readFileSync(join(root, "AGENTS.md"), "utf8"), /Blacksmith Organization System/);
  assert.equal(events(root).at(-1).event, "open");

  writeFileSync(join(root, "AGENTS.md"), "the owner's own\n");
  assert.deepEqual((await run("workshop", "open", suit)).changes, [], "nothing missing, nothing overwritten");
  assert.equal(readFileSync(join(root, "AGENTS.md"), "utf8"), "the owner's own\n");
});

test("closing: the shell history kept as a ttystory", async () => {
  const { root, suit } = sandbox();
  await suit.bootstrap();
  const history = join(dirname(root), "history");
  writeFileSync(history, "ls\ngit status\n");
  process.env.HISTFILE = history;
  const closed = await run("workshop", "close", suit);
  assert.match(closed.ttystory, /\.BOS\/storylines\/ttystories\/ttystory-.+-\d+\.txt$/);
  assert.equal(readFileSync(closed.ttystory, "utf8"), "ls\ngit status\n");
  assert.deepEqual([events(root).at(-1).event, events(root).at(-1).ttystory], ["close", closed.ttystory]);
});
