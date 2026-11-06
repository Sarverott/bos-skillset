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

Skills, plugins and an MCP server that let AI agents work **inside** a BOS
workshop, the ordered digital workshop of the
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

The workshop itself (bootstrap, status, watch, scopes, the craft loop,
versions) is the **core**, the npm package `blacksmith-organization-system`.
This repository is the **suit** an agent wears over it. What each element means:
[docs/glossary](docs/glossary/README.md).

## Install

| Agent | How |
| ----- | --- |
| **Claude Code** | `/plugin marketplace add Sarverott/bos-skillset` then `/plugin install bos@bos-skillset` |
| **Gemini CLI** | `gemini extensions install https://github.com/Sarverott/bos-skillset` |
| **Codex, Cursor, Copilot, …** (skills) | `npx skills add Sarverott/bos-skillset` |
| **any MCP client** | `npx -y bos-skillset mcp` (stdio) |

Details per agent, and installing from a local clone:
[installation](docs/tutorials/installation.md). Only Node ≥ 22.18 is needed: the
plugin carries one bundled file (`dist/bos-skillset.mjs`) with everything in it.

## What an agent gets

| Part | Claude Code | Gemini CLI | other agents |
| ---- | :---------: | :--------: | :----------: |
| **Skills** `skills/bos-*`: the workshop and each element in it | ✓ | ✓ | ✓ (`npx skills add`) |
| **MCP tools**: every read-only tool, e.g. `agent_brief`, `workshop_status`, `workshop_glossary`, `flow_explain`, `house_may_call` | ✓ | ✓ | ✓ |
| **Context**: the workshop's rules | session brief | `BOS-CONTEXT.md` | `BOS-CONTEXT.md` / `agent_brief` |
| **Slash commands** `/bos:status`, `/bos:open`, `/bos:close`, `/bos:glossary`, `/bos:commit`, `/bos:flow`, `/bos:house` | ✓ | | |
| **`bos` on PATH**: the core's commands and the suit's | ✓ | | `npx bos-skillset` |
| **Storylines**: the agent's sessions and shell commands recorded in the workshop | ✓ (hooks) | | |

Writing tools are never offered over MCP: agents look and plan through MCP;
changing the workshop stays a conscious act on the command line
([agent suit](docs/tutorials/agent-suit.md)).

## The command

```bash
bos agent brief          # the workshop, where you are in it, who must never be called, the rules
bos workshop status      # the whole workshop as one report with findings (core, read-only)
bos workshop open        # bootstrap (core) + agents' guides + a record in storylines
bos workshop close       # shell history kept as a ttystory, the closing recorded
bos flow explain         # the project's craft loop (core)
bos house show           # the House of Anubis: who may be called
bos help                 # every tool: the core's, then the suit's
```

| Skill | Use |
| ----- | --- |
| [`bos-workshop`](skills/bos-workshop/SKILL.md) | recognize workshops, their areas and elements; place work where it belongs |
| `bos-project` `bos-scope` `bos-house` `bos-forge` | a project and its craft loop, a scope and its GRIH version, the House, the forge |
| `bos-devarmory` `bos-craftbook` `bos-archive` `bos-sheme` `bos-throwbox` `bos-sarcophag` `bos-exhibit` `bos-craftset` | the other areas and assets (drafts, growing) |

`bos skills draft` drafts a skill for an element that has none, from its
glossary page; drafts are never overwritten and grow by hand.

## Repository layout

```
src/
├── suit.mjs        class Suit extends the core's BOS (+ the House)
├── tools/          the suit's tools, in the core's tool format; _index = core + suit
├── mcp/            the MCP server, generated from the read-only tools
├── agent/          Claude Code hooks: the brief, the agent's work in storylines
├── procedures/     opening, closing, describing, hooking, gathering, skilling
├── house/ ravens/  the House of Anubis and its ravens (Skryba)
├── bridges/        ollama-link, git-cli
├── views/          text for people
└── cli.mjs         bos <model> <tool> · bos mcp · bos hook <event>
skills/  commands/  hooks/  .claude-plugin/  gemini-extension.json  BOS-CONTEXT.md
bin/bos  dist/ (built)  resources/  docs/  tests/  template/
```

Details and the reasons behind the split: [AGENTS.md](AGENTS.md).

## Branches

`master` (spine of canon) ← `releasing` ← `testing` ← `revision` ←
`development` (here we code) ← `dev/<name>`, as in the core
([branch movement procedures](docs/infographics/branch-movement-procedures.md);
`bos flow explain`). Every push of `development`, `testing`, `releasing` or
`master` releases on npm (`-dev.N`, `-beta.N`, `-rc.N`, `x.y.z`); the release on
`master` also commits the bundle the marketplace installs
([committing and releasing](docs/tutorials/committing-and-releasing.md)).

## License

MIT — see [LICENSE](LICENSE).
