import assert from "node:assert/strict";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "vitest";

import { findTool, ROOT, SKILLS } from "../src/index.mjs";
import { skilling } from "../src/procedures/skilling/_index.mjs";
import { contextFor } from "../src/tools/context.mjs";
import { frontmatter } from "../src/tools/skills.mjs";
import { sandbox } from "./helpers.mjs";

test("every skill of the suit is a valid Agent Skill: name = directory, a description, no draft left behind", () => {
  for (const dir of readdirSync(SKILLS)) {
    const text = readFileSync(join(SKILLS, dir, "SKILL.md"), "utf8");
    const { name, description } = frontmatter(text);
    assert.equal(name, dir);
    assert.match(name, /^[a-z0-9-]{1,64}$/);
    assert.ok(description.length > 20 && description.length <= 1024, `${dir}: description`);
    assert.doesNotMatch(text, /\.\.\/\.\.\/src\/models\//, `${dir}: links to the old core's models`);
  }
});

test("skills list reads them all", async () => {
  const { suit } = sandbox();
  const skills = await findTool("skills", "list").run(suit, {});
  assert.equal(skills.length, readdirSync(SKILLS).length);
  assert.ok(skills.some((s) => s.name === "bos-workshop"));
});

test("skilling drafts a skill per standalone element, never overwrites", async () => {
  const root = mkdtempSync(join(tmpdir(), "bos-skills-"));
  cpSync(join(ROOT, "docs", "glossary"), join(root, "docs", "glossary"), { recursive: true });
  mkdirSync(join(root, "skills", "bos-forge"), { recursive: true });
  writeFileSync(join(root, "skills", "bos-forge", "SKILL.md"), "hand-grown\n");
  const { suit } = sandbox();

  const context = await skilling.run(contextFor(suit, { root }));
  assert.equal(readFileSync(join(root, "skills", "bos-forge", "SKILL.md"), "utf8"), "hand-grown\n");
  const scope = readFileSync(join(root, "skills", "bos-scope", "SKILL.md"), "utf8");
  assert.match(scope, /^---\nname: bos-scope\ndescription: ".+ Use when creating, finding or handling a BOS scope/);
  assert.match(scope, /blacksmith-organization-system\/tree\/master\/src\/models\/scope\/class\.ts/);
  assert.ok(existsSync(join(root, "skills", "bos-house", "SKILL.md")));
  assert.ok(context.changes.length >= 7);
  assert.deepEqual((await skilling.run(contextFor(suit, { root }))).changes, []);
});
