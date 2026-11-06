import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "vitest";

import { findTool } from "../src/index.mjs";
import { composeMessage } from "../src/procedures/describing/compose-message.mjs";
import { repository, sandbox } from "./helpers.mjs";

test("drafts follow the staged paths", () => {
  assert.equal(composeMessage([]), null);
  assert.match(
    composeMessage([["docs/glossary/mode.md", "modified"]]),
    /^docs\(docs\): update mode\n\nM docs\/glossary\/mode\.md\n$/,
  );
  assert.match(
    composeMessage([
      ["src/procedures/describing/_index.mjs", "added"],
      ["src/procedures/describing/scopes.mjs", "added"],
    ]),
    /^feat\(procedures\): add describing\n/,
  );
  assert.match(composeMessage([["tests/a.test.mjs", "modified"]]), /^test\(tests\): update a\.test/);
  assert.match(
    composeMessage([
      ["src/suit.mjs", "modified"],
      ["package.json", "modified"],
    ]),
    /^chore\(suit,build\): update suit, package/,
  );
  assert.match(composeMessage([["hooks/hooks.json", "modified"]]), /^chore\(plugin\): update hooks/);
});

test("describe reads what git staged; prepare-commit-msg fills only a plain commit", async () => {
  const { root, host, suit } = sandbox();
  const repo = join(root, "forge/scope/project");
  const git = repository(host, repo);
  writeFileSync(join(repo, "README.md"), "# project\nmore\n");
  mkdirSync(join(repo, "src/procedures/forging"), { recursive: true });
  writeFileSync(join(repo, "src/procedures/forging/_index.mjs"), "export default 1;\n");
  git("add", "README.md", "src/procedures/forging/_index.mjs");

  const described = await findTool("project", "describe").run(suit, { dir: repo });
  assert.match(
    described.message,
    /^feat\(repo,procedures\): update README, forging\n\nM README\.md\nA src\/procedures\/forging\/_index\.mjs\n/,
  );

  const prepare = findTool("project", "prepare-message");
  const file = join(root, "COMMIT_EDITMSG");
  writeFileSync(file, "\n# Please enter the commit message\n");
  process.chdir(repo);
  await prepare.run(suit, { file, source: "" });
  assert.match(readFileSync(file, "utf8"), /^feat\(repo,procedures\): update README, forging\n[\s\S]*# drafted by BOS/);

  writeFileSync(file, "fix: my own words\n");
  await prepare.run(suit, { file, source: "message" });
  assert.equal(readFileSync(file, "utf8"), "fix: my own words\n");
});

test("git hooks report to storylines; their installation respects hooks managed elsewhere", async () => {
  const { root, host, suit } = sandbox();
  await suit.bootstrap();
  const repo = join(root, "forge/scope/project");
  const git = repository(host, repo);
  await findTool("project", "hook").run(suit, { name: "post-commit", dir: repo });
  const event = readFileSync(join(root, ".BOS/storylines/logs/workshop.jsonl"), "utf8")
    .trim()
    .split("\n")
    .map(JSON.parse)
    .find((e) => e.event === "git-hook");
  assert.deepEqual(
    [event.event, event.hook, event.commit.subject, event.place.project],
    ["git-hook", "post-commit", "docs: start", "project"],
  );

  const install = findTool("project", "install-hooks");
  const installed = await install.run(suit, { dir: repo });
  assert.equal(installed.installed.length, 3);
  assert.match(readFileSync(join(repo, ".git/hooks/post-commit"), "utf8"), /bin\/bos" project hook post-commit/);
  assert.deepEqual((await install.run(suit, { dir: repo })).installed, [], "never twice, never over");
  git("config", "core.hooksPath", ".husky");
  assert.match((await install.run(suit, { dir: repo })).skipped[0], /core\.hooksPath is \.husky/);
});
