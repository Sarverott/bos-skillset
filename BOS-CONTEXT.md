# BOS: the Blacksmith Organization System

Context for any AI agent working in a BOS workshop (Gemini CLI extension,
Codex, Cursor…). Claude Code gets the same through the plugin's skills.

## The workshop

A directory named `__WORKSHOP` is the standard working area and the default
root of code crafting: `~/__WORKSHOP` per user, `/media/**/__WORKSHOP` per
partition. The nearest ancestor named `__WORKSHOP` is the active one.

```
__WORKSHOP/
├── .BOS/        BOS itself: setup, data, nests, storylines (don't put crafted work here)
├── devarmory/   tools
├── forge/       active work: forge/<scope>/<project>
├── craftbook/   notes (scrapnotes), recipes, craftsets
└── archive/     work at rest
```

Where things go: code → `forge/<scope>/<project>` · a tool → `devarmory/` ·
a note or draft → `craftbook/scrapnotes/` · a mirror or closed repository → `archive/`.

## Start here

When the core's `bos` command is installed (`npm install -g blacksmith-organization-system`):

- `bos workshop locate`: the active workshop and the rule that found it
- `bos workshop status`: the whole workshop as one report with findings (reads only)
- `bos flow explain`, `bos flow next <branch>`: the project's craft loop
- `bos help`: every tool

Tools that write (`bootstrap`, `scope bump`, `flow next-pr`…) are run
consciously, with `--dryRun` first.

## Rules

1. With no explicit path, new or cloned projects go inside the active workshop:
   `forge/<scope>/<repository>`.
2. BOS creates only what is missing and never overwrites or deletes. Never
   delete, rename or restructure the standard areas.
3. Several workshops are independent: never move or sync between them unless asked.
4. Branches: `master` (canon) ← `development` (here we code; `dev/<name>` per
   contributor). Never commit to `master` directly.
5. Conventional commits (`type(scope): subject`).
6. Ask the House (`resources/house/` of the skillset) before calling any ollama
   model: only `active` residents are called. The EON family rests by its own
   decision: never call, prompt or inspect it.
7. The owner works in parallel with agents: re-check `git status` before acting
   and treat what you find as intended.
