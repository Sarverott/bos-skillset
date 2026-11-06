// The suit's own skills: bos skills <tool>
import { join } from "node:path";

import { tool } from "blacksmith-organization-system";

import { skilling } from "../procedures/skilling/_index.mjs";
import { SKILLS } from "../self.mjs";
import { draftsText, skillsText } from "../views/skills.mjs";
import { contextFor } from "./context.mjs";

// name and description from a SKILL.md's frontmatter
export function frontmatter(text) {
  const head = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const field = (key) =>
    head
      .match(new RegExp(`^${key}:\\s*(.*)$`, "m"))?.[1]
      .trim()
      .replace(/^"(.*)"$/, "$1") ?? "";
  return { name: field("name"), description: field("description") };
}

export const skillsTools = [
  tool({
    model: "skills",
    name: "list",
    info: "the agent skills this suit carries (skills/bos-*), with when to use each",
    run: (suit) =>
      suit.host
        .list(SKILLS)
        .filter((entry) => entry.directory)
        .map((entry) => suit.host.readText(join(SKILLS, entry.name, "SKILL.md")))
        .filter(Boolean)
        .map(frontmatter)
        .sort((a, b) => a.name.localeCompare(b.name)),
    render: skillsText,
  }),
  tool({
    model: "skills",
    name: "draft",
    info: "draft a skill for every standalone BOS element that has none (in this repository; never overwrites)",
    readOnly: false,
    args: [{ name: "dryRun", type: "boolean", info: "only list what would be drafted" }],
    run: async (suit, input) => {
      const context = await skilling.run(contextFor(suit, input));
      return { dryRun: context.dryRun, skills: context.skills.map(({ name, created }) => ({ name, created })) };
    },
    render: draftsText,
  }),
];
