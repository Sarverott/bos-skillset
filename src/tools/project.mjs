// The suit's tools of a project (the git repository around a path): bos project <tool>.
// The core has `project authors`; the branch flow is the core's `bos flow …`.
import { tool } from "blacksmith-organization-system";

import { describing } from "../procedures/describing/_index.mjs";
import { hooking, installingHooks } from "../procedures/hooking/_index.mjs";
import { contextFor } from "./context.mjs";

const dir = { name: "dir", type: "string", info: "a path inside the repository (default: current directory)" };

export const projectTools = [
  tool({
    model: "project",
    name: "describe",
    info: "conventional-commit draft of what is staged (Skryba the scribe raven refines it with --skryba)",
    args: [dir, { name: "skryba", type: "boolean", info: "let Skryba refine it through ollama (up to 90 s)" }],
    run: async (suit, input) => {
      const context = await describing.run(contextFor(suit, { ...input, skryba: Boolean(input.skryba) }));
      return { repo: context.repo, message: context.message, skryba: context.skryba ?? null };
    },
    render: (result) =>
      (result.message ?? "nothing staged") +
      (result.skryba && !result.skryba.used ? `\n# Skryba: ${result.skryba.reason}` : ""),
  }),
  tool({
    model: "project",
    name: "prepare-message",
    info: "(git prepare-commit-msg) write the draft into the commit message of a plain `git commit`",
    readOnly: false,
    args: [
      { name: "file", type: "string", info: "commit message file", positional: true, required: true },
      { name: "source", type: "string", info: "git's message source", positional: true },
    ],
    run: async (suit, input) => {
      const context = await describing.run(contextFor(suit, { file: input.file, source: input.source ?? "" }));
      return { written: context.written ?? null };
    },
    render: () => "",
  }),
  tool({
    model: "project",
    name: "install-hooks",
    info: "link a repository's git hooks to the workshop's storylines (skipped when e.g. husky manages them)",
    readOnly: false,
    args: [dir, { name: "dryRun", type: "boolean", info: "only say what would be linked" }],
    run: async (suit, input) => {
      const context = await installingHooks.run(contextFor(suit, input));
      return { dryRun: context.dryRun, installed: context.changes, skipped: context.skipped };
    },
    render: (result) => JSON.stringify(result, null, 2),
  }),
  tool({
    model: "project",
    name: "hook",
    info: "(called by git) record a hook in the workshop's storylines",
    readOnly: false,
    args: [
      {
        name: "name",
        type: "string",
        info: "post-commit, post-checkout or post-merge",
        positional: true,
        required: true,
      },
      dir,
    ],
    run: async (suit, input) => {
      const context = await hooking.run(contextFor(suit, { hook: input.name, dir: input.dir }));
      return context.event ?? null;
    },
    render: () => "",
  }),
];
