// The suit's tools of the workshop: bos workshop <tool> (the core has locate, status, bootstrap, watch)
import { join } from "node:path";

import { tool } from "blacksmith-organization-system";

import { closing } from "../procedures/closing/_index.mjs";
import { opening } from "../procedures/opening/_index.mjs";
import { GLOSSARY } from "../self.mjs";
import { changesText, contextFor } from "./context.mjs";

const dryRun = { name: "dryRun", type: "boolean", info: "only say what would be written" };

// a term → its page's file name; nothing but letters, digits and dashes reaches the path
export const glossaryName = (term) => term.toLowerCase().replace(/[^a-z0-9-]/g, "");

export const workshopTools = [
  tool({
    model: "workshop",
    name: "glossary",
    info: "definition of a BOS element (forge, scope, sheme, house, raven…); without a term, the list",
    args: [{ name: "term", type: "string", info: "element name, e.g. forge", positional: true }],
    run: (suit, input) => {
      const { host } = suit;
      if (!input.term) {
        return host
          .list(GLOSSARY)
          .filter((entry) => !entry.directory && entry.name.endsWith(".md") && entry.name !== "README.md")
          .map((entry) => entry.name.slice(0, -3))
          .sort();
      }
      const page = host.readText(join(GLOSSARY, `${glossaryName(String(input.term))}.md`));
      return page ?? `no glossary page for "${input.term}" (bos workshop glossary lists them)`;
    },
    render: (result) => (Array.isArray(result) ? result.join("\n") : result),
  }),
  tool({
    model: "workshop",
    name: "open",
    info: "bootstrap the workshop (core), put the agents' guides in its root, record the opening",
    readOnly: false,
    args: [dryRun],
    run: async (suit, input) => {
      const context = await opening.run(contextFor(suit, input));
      return { dryRun: context.dryRun, changes: context.changes, event: context.event };
    },
    render: (result) => `${changesText(result)}\n${result.dryRun ? "would open" : "opened, recorded in storylines"}`,
  }),
  tool({
    model: "workshop",
    name: "close",
    info: "keep the shell history as a ttystory, record the closing (run `history -a` first)",
    readOnly: false,
    args: [dryRun],
    run: async (suit, input) => {
      const context = await closing.run(contextFor(suit, input));
      return { dryRun: context.dryRun, ttystory: context.ttystory ?? null, event: context.event };
    },
    render: (result) => `closed · ttystory: ${result.ttystory ?? "no shell history found"}`,
  }),
];
