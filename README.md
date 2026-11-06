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
| **Gemini CLI** | `gemini extensions install https://github.com/Sarverott/bos-skillset` |
| **Codex, Cursor, Copilot, …** | `npx skills add Sarverott/bos-skillset` |

For the commands the skills use, install the core: `npm install -g blacksmith-organization-system`
(gives `bos`). Details: [installation](docs/tutorials/installation.md).

## The skills

| Skill | Use |
| ----- | --- |
| [`bos-workshop`](skills/bos-workshop/SKILL.md) | recognize workshops, their areas and elements; place work where it belongs |
| `bos-project` `bos-scope` `bos-house` `bos-forge` | a project and its craft loop, a scope and its GRIH version, the House of Anubis, the forge |
| `bos-devarmory` `bos-craftbook` `bos-archive` `bos-sheme` `bos-throwbox` `bos-sarcophag` `bos-exhibit` `bos-craftset` | the other areas and assets (drafts, growing) |

A new skill starts from [`assets/template/SKILL.md`](assets/template/SKILL.md) and the
element's glossary page.

## Repository layout

```
skills/            Agent Skills, one per element (the product)
.claude-plugin/    Claude Code plugin + marketplace
gemini-extension.json, BOS-CONTEXT.md    Gemini CLI extension and its context
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
