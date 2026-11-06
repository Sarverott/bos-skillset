```
      █▄▄ █░░ ▄▀█ █▀▀ █▄▀ █▀ █▀▄▀█ █ ▀█▀ █░█
      █▄█ █▄▄ █▀█ █▄▄ █░█ ▄█ █░▀░█ █ ░█░ █▀█

   █▀█ █▀█ █▀▀ ▄▀█ █▄░█ █ ▀█ ▄▀█ ▀█▀ █ █▀█ █▄░█
   █▄█ █▀▄ █▄█ █▀█ █░▀█ █ █▄ █▀█ ░█░ █ █▄█ █░▀█

             █▀ █▄█ █▀ ▀█▀ █▀▀ █▀▄▀█
             ▄█ ░█░ ▄█ ░█░ ██▄ █░▀░█
```
> ###### [Sett Sarverott](https://github.com/Sarverott) @ 2019-2026

# BOS skillset: the Blacksmith Organization System for AI agents

Agent Skills that teach AI agents to work **inside** a BOS workshop, the
ordered digital workshop of the
[Blacksmith Organization System](https://github.com/Sarverott/blacksmith-organization-system).
`~/__WORKSHOP` (per user) and `/media/**/__WORKSHOP` (per partition) are the
root of code crafting, with the same shape on every host:

```
__WORKSHOP/
├── .BOS/        BOS itself: setup, data, nests, storylines
├── devarmory/   tools
├── forge/       active work: <scope>/<project>
├── craftbook/   notes, recipes, procedures
└── archive/     work at rest
```

Everything BOS *does* is the **core**, the npm package
`blacksmith-organization-system` and its `bos` command. This repository holds
no code: only the skills, the manifests that install them, and the docs.
What each element means: [docs/glossary](docs/glossary/README.md).

## Install

| Agent | How |
| ----- | --- |
| **Claude Code** | `/plugin marketplace add Sarverott/bos-skillset` then `/plugin install bos@bos-skillset` |
| **Codex** | `codex plugin marketplace add Sarverott/bos-skillset` then `codex plugin add bos@bos-skillset` |
| **Gemini CLI** | `gemini extensions install https://github.com/Sarverott/bos-skillset` |
| **Cursor, Copilot, …** | `npx skills add Sarverott/bos-skillset --full-depth` |

The commands the skills use come from the core, `blacksmith-organization-system`
(gives `bos`). The Claude Code and Codex plugins install it into their own data
directory at session start. Elsewhere, prefer a local install
(`npm install blacksmith-organization-system`, then `npx bos`) over `-g`.
Details: [installation](docs/tutorials/installation.md).

## The skills

| Skill | Use |
| ----- | --- |
| [`bos-skillset`](SKILL.md) | the repository root: install and check BOS for an agent |
| [`bos-workshop`](skills/bos-workshop/SKILL.md) | recognize workshops, their areas and elements; place work where it belongs |
| `bos-project` `bos-scope` `bos-house` `bos-forge` | a project and its craft loop, a scope and its GRIH version, the House of Anubis, the forge |
| `bos-devarmory` `bos-craftbook` `bos-archive` `bos-sheme` `bos-throwbox` `bos-sarcophag` `bos-exhibit` `bos-craftset` | the other areas and assets (drafts, growing) |

A new skill starts from [`assets/template/SKILL.md`](assets/template/SKILL.md) and the
element's glossary page.

## Repository layout

```
SKILL.md           the root skill: installing the skillset itself
skills/            Agent Skills, one per element (the product)
.claude-plugin/    Claude Code plugin + marketplace
.codex-plugin/     Codex plugin (+ a Codex-schema marketplace, not read there yet)
gemini-extension.json, BOS-CONTEXT.md    Gemini CLI extension and its context
hooks/             session start: install the pinned core, report the workshop
.mcp.json .app.json .lsp.json settings.json   adapter maps, empty until there is something to declare
package.json       pins the core (npm ci, npx bos)
evals/             evals of the root skill
docs/              glossary, tutorials, ideas, devlog, guidelines
assets/template/   a blank SKILL.md
```

Where this is heading: [docs/ideas](docs/ideas/README.md). Rules for agents
working on this repository: [AGENTS.md](AGENTS.md).

## Branches

`master` (spine of canon) ← `releasing` ← `testing` ← `revision` ←
`development` (here we code) ← `dev/<name>`, as in the core
([branch movement procedures](docs/infographics/branch-movement-procedures.md)).

## License

MIT — see [LICENSE](LICENSE).
