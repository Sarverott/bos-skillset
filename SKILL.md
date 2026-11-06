---
name: bos-skillset
description: "Install and set up the BOS skillset (Blacksmith Organization System) for an AI agent: the Claude Code plugin, the Codex plugin, the Gemini CLI extension or plain Agent Skills, plus the BOS core command `bos`. Use when someone asks to install, add, enable, update or check BOS for an agent, or when the bos-* skills or the `bos` command are missing."
license: MIT
compatibility: "Node.js >=22.18 and npm for the BOS core; git and network access to install from GitHub."
metadata:
  author: Sett Sarverott
  version: "1.0.1"
  repository: https://github.com/Sarverott/bos-skillset
---

# BOS skillset

This repository is one package with several faces. Each one teaches an agent
to work inside a BOS workshop (`~/__WORKSHOP`, `/media/**/__WORKSHOP`):

| Face | Read by | Manifest |
| --- | --- | --- |
| Claude Code plugin `bos` | Claude Code | `.claude-plugin/plugin.json`, marketplace `.claude-plugin/marketplace.json` |
| Codex plugin `bos` | Codex CLI and app | `.codex-plugin/plugin.json` |
| Gemini CLI extension `bos` | Gemini CLI | `gemini-extension.json` + `BOS-CONTEXT.md` |
| Agent Skills `bos-*` | any skills-aware agent | `skills/bos-*/SKILL.md` |
| MCP toolkit | MCP clients | `.mcp.json` (empty until the core ships an MCP server) |

The skills hold knowledge only. Everything BOS *does* comes from the **core**,
the npm package `blacksmith-organization-system`, which provides the `bos`
command.

## Install

Pick the agent being set up. Ask if it isn't clear. Don't install for agents
the person doesn't use.

| Agent | Commands |
| --- | --- |
| Claude Code | `/plugin marketplace add Sarverott/bos-skillset`, then `/plugin install bos@bos-skillset` |
| Codex | `codex plugin marketplace add Sarverott/bos-skillset`, then `codex plugin add bos@bos-skillset` |
| Gemini CLI | `gemini extensions install https://github.com/Sarverott/bos-skillset` |
| Cursor, Copilot, others | `npx skills add Sarverott/bos-skillset --full-depth` |

`--full-depth` matters: without it the skills CLI stops at this root skill and
skips the `bos-*` skills beneath it.

Installing changes the agent's configuration, so do it only on request. The
Claude Code and Codex plugins carry a session-start hook (`hooks/register.js`).
It installs the core pinned by this package's `package.json` into the plugin's
data directory and reports the active workshop. Codex asks the user to trust
hooks before they run.

## The core

Prefer a local, pinned install over a global one:

```bash
npm install blacksmith-organization-system   # in the project that uses it
npx bos --version                            # runs node_modules/.bin/bos
```

`npm install -g blacksmith-organization-system` also works when `bos` should
be available everywhere. In a checkout of this repository, `npm ci` installs
the pinned core and `npx bos help` lists every tool.

## Check the result

1. `bos --version` (or `npx bos --version`) prints the core's version.
2. `bos workshop locate` names the active workshop and the rule that found it.
3. The agent lists the `bos-workshop` skill (Claude Code: `/plugin`, Codex:
   `/plugins`, Gemini: `gemini extensions list`).

If a step fails, report the failure as it is. Don't simulate `bos` output.

## After installing

Work through the element skills: start with `bos-workshop` (areas and where
work belongs), then `bos-project`, `bos-scope`, `bos-forge` and `bos-house`.
Run tools that write (`bootstrap`, `scope bump`, `flow next-pr`) with
`--dryRun` first. Never bootstrap a workshop as a side effect of a test.
