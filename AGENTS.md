# AGENTS.md: bos-skillset

Instructions for AI agents working **on this repository**. For working
anywhere in a workshop, see `resources/workshop-root/AGENTS.md` (deployed to
every workshop root as `__WORKSHOP/AGENTS.md`); for what agents *using* the
suit get, see `BOS-CONTEXT.md`.

## Where this project sits

The skillset is the agents' suit of the Blacksmith Organization System (BOS):
skills, the Claude Code plugin, the Gemini CLI extension and the MCP server.
It is built on the core and is itself a BOS project, so its path tells its
place in the machine:

```
~/__WORKSHOP/                              workshop (root of crafting on this host)
└── forge/                                 active work
    └── blacksmith-organization-system/    scope (family of BOS repositories)
        ├── blacksmith-organization-system/  the core (github + npm: blacksmith-organization-system)
        └── bos-skillset/                  ← this project (github: Sarverott/bos-skillset, npm: bos-skillset)
```

`node bin/bos agent brief` prints this place as BOS computes it.

## The core and the suit

The workshop itself (models, bootstrapping, inspecting, watching, scopes and
their GRIH versions, the craft loop, devlog) is the **core**, the npm package
`blacksmith-organization-system`, imported as a dependency. It is never
copied here. The suit adds only what agents need on top of it.

- Need a new behaviour of the workshop? It belongs in the core. Don't edit the
  core's repository from here: leave an entry in
  `~/__WORKSHOP/forge/NOTES-for-repositories.md`.
- Every part imports the core by its name: `import { BOS, tool } from "blacksmith-organization-system"`.
- The core's tool format is the suit's: `tool({ model, name, info, args, readOnly, run(suit, input, io), render })`.

## Meaning before code

`docs/glossary/` defines every element (workshop, forge, scope, sarcophag…),
one page each. The author annotates it directly; read their changes before
changing code. The glossary as classes lives in the core; a skill
(`skills/bos-<type>/`) is the glossary for agents: keep the three consistent,
and write the page first when adding an element.

## Architecture

```
src/
├── suit.mjs        spine: class Suit extends the core's BOS, adds the House
├── self.mjs        where the suit lives (ROOT, resources, glossary, skills, bin/bos)
├── tools/          the suit's tools, one file per model; _index.mjs = core tools + suit tools
├── mcp/            the MCP server, generated from the read-only, non-streaming tools
├── agent/          Claude Code hooks (bos hook <event>): brief, place, records in storylines
├── procedures/     steps that close routines: DESCRIPTION.md + one file per step + _index.mjs
├── house/          the House of Anubis: children, orders, bloodlines (resources/house/)
├── ravens/         the ravens (resources/ravens/): Skryba, the scribe
├── bridges/        outside systems: ollama-link (ollama), git-cli (git through the core's Host.run)
├── views/          text for people: help, house, skills, colors
├── cli.mjs         bos <model> <tool> · bos mcp · bos hook <event>; the bundle's entry
└── index.mjs       library entry
```

| Part | Role |
| ---- | ---- |
| `skills/` | Agent Skills (open SKILL.md format), one per element; installed by every agent |
| `commands/` | Claude Code slash commands (`/bos:<name>`), thin: they run `bos` |
| `hooks/hooks.json` | Claude Code hooks → `bin/bos hook <event>` |
| `.claude-plugin/` | plugin manifest, marketplace, MCP config |
| `gemini-extension.json` + `BOS-CONTEXT.md` | the Gemini CLI extension and the context it loads |
| `bin/bos` | what everything runs: `dist/bos-skillset.mjs` when built, `src/cli.mjs` otherwise |
| `esbuild.config.mjs` | bundles `src/cli.mjs` with every dependency into `dist/bos-skillset.mjs` |

`dist/` is ignored on the coding branches. The release on `master` builds the
bundle and commits it, so the marketplace always installs a plugin that needs
nothing but Node. `tests/bundle.test.mjs` runs it as an installed plugin.

## Why the code is scattered into small files

- **One concern per file.** A step, a bridge or a tool is small enough to read
  whole, and its path says what it is (`procedures/closing/capture-ttystory.mjs`).
- **Revisions don't collide.** The owner and agents work in parallel. When the
  owner revises one file, an agent's next change to another file doesn't
  overwrite it. Long files turn every change into a merge of everything.
- **Feedback has an address.** A comment on one small file is about one thing,
  and a rejected piece can be replaced without touching the rest.
- **The tree is the documentation.** Directories and `_index.mjs` files show
  the structure. `DESCRIPTION.md` explains why a procedure exists; the code
  only says how.

So: add a new file rather than growing an old one, collect it in the nearest
`_index.mjs`, and keep each file to one responsibility.

## Rules

1. Procedures are code. A new behaviour of the suit is a procedure step in its
   own file, assembled in `procedures/<name>/_index.mjs` (the core's `Procedure`)
   and described in its `DESCRIPTION.md`. A behaviour of the workshop itself goes to the core.
2. BOS creates only what is missing and never overwrites or deletes. Keep
   every write behind the core's `createIfMissing` or an explicit, dry-run-aware step.
3. Outside systems are reached only through bridges (`src/bridges/`); files and
   commands through the core's `Host` where it can.
4. MCP offers only read-only tools. A tool that writes is `readOnly: false` and
   stays on the command line.
5. Test against a temporary workshop (`tests/helpers.mjs`: `sandbox()`), never the
   real one. Run `npm test`; `tests/bundle.test.mjs` builds and runs the bundle.
6. Branch flow: work on `development` (or your own `dev/<name>`); `revision` →
   `testing` → `releasing` → `master` (pull request). Never commit to `master` directly.
7. The owner works in parallel with agents. Re-check `git status` and the tree
   before acting, and treat what you find as intended.
8. Unknowns are marked [`TODO`]; don't invent meanings. Mark interpretations *(assumed)*.
9. Commits are conventional commits (`type(scope): subject`). The type decides the
   next version, so choose it honestly: `feat` for new behaviour, `fix` for fixes.
   Husky's hooks run tests and commitlint; don't bypass them with `--no-verify`.
   Details: `docs/tutorials/committing-and-releasing.md`.
10. Biome lints and formats (`npm run lint`, `npm run format`; config `biome.json`:
    2 spaces, double quotes, semicolons, 120 columns). Silence a rule only with a
    `// biome-ignore <rule>: <reason>` that says why.
11. Before calling any AI resident (ollama model), ask the House
    (`resources/house/`, `src/house/`, `bos house may-call`): only `active` residents are called.
    The EON family rests by its own decision; never call, prompt or inspect it.
12. Manifests carry one version: `package.json`, `.claude-plugin/plugin.json`,
    `.claude-plugin/marketplace.json`, `gemini-extension.json`. The release sets them
    all (`release/sync-plugin-version.mjs`); don't bump them by hand.
