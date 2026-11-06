# AGENTS.md: bos-skillset

Instructions for AI agents working **on this repository**. For working
anywhere in a workshop, see `resources/workshop-root/AGENTS.md` (the guide for
every workshop root, `__WORKSHOP/AGENTS.md`); for what agents *using* the
skills get, see `BOS-CONTEXT.md`.

## Where this project sits

```
~/__WORKSHOP/                              workshop (root of crafting on this host)
└── forge/                                 active work
    └── blacksmith-organization-system/    scope (family of BOS repositories)
        ├── blacksmith-organization-system/  the core (github + npm: blacksmith-organization-system)
        └── bos-skillset/                  ← this project (github: Sarverott/bos-skillset)
```

## What this repository is

Skills and the manifests that install them into agents. **No code, no npm
package, no dependencies.** Every behaviour of BOS (models, bootstrapping,
inspecting, watching, scopes, the craft loop, devlog) is the **core**, the npm
package `blacksmith-organization-system` with its `bos` command. Skills tell
agents to run `bos`; they never ship their own implementation.

| Part | Role |
| ---- | ---- |
| `skills/` | Agent Skills (open SKILL.md format), one per element: the product |
| `.claude-plugin/` | Claude Code plugin manifest and marketplace |
| `gemini-extension.json` + `BOS-CONTEXT.md` | the Gemini CLI extension and the context it loads |
| `resources/` | data the skills point at: the House (`house/`), the ravens (`ravens/`), the workshop root's guides (`workshop-root/`) |
| `docs/` | glossary (meaning), tutorials, ideas (what could be built, and where) |
| `template/SKILL.md` | the start of a new skill |

## Meaning before skills

`docs/glossary/` defines every element (workshop, forge, scope, sarcophag…),
one page each. The author annotates it directly; read their changes first. A
skill (`skills/bos-<type>/`) is the glossary for agents: keep the two
consistent, and write the page first when adding an element.

## Rules

1. Don't add code here. A behaviour BOS needs belongs in the core: write the
   idea in `docs/ideas/` and leave an entry in
   `~/__WORKSHOP/forge/NOTES-for-repositories.md`. Don't edit the core's repository from here.
2. Skills reference only commands that exist in the core (`bos help` lists them).
3. Branch flow: work on `development` (or your own `dev/<name>`); `revision` →
   `testing` → `releasing` → `master` (pull request). Never commit to `master` directly.
4. The owner works in parallel with agents. Re-check `git status` and the tree
   before acting, and treat what you find as intended.
5. Unknowns are marked [`TODO`]; don't invent meanings. Mark interpretations *(assumed)*.
6. Commits are conventional commits (`type(scope): subject`).
7. Manifests carry one version: `.claude-plugin/plugin.json`,
   `.claude-plugin/marketplace.json` (twice), `gemini-extension.json`. Change them together.
8. Before calling any AI resident (ollama model), ask the House
   (`resources/house/`): only `active` residents are called.
   The EON family rests by its own decision; never call, prompt or inspect it.
9. Check before a pull request: `claude plugin validate .`, `npx skills add . --list`
   (every skill found), `task docs:build` (strict).
