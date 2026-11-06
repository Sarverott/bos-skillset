# Getting started

`bos` (in Claude Code with the plugin; elsewhere `npx bos-skillset` or `node bin/bos`
in a clone) runs the core's tools and the suit's. Add `--json` to any of them
for machine-readable output; `bos help` lists them all.

## The workshop (core)

| Command | What happens |
| ------- | ------------ |
| `bos workshop locate` | finds the active workshop: `--workshop`, then `$BOS_WORKSHOP` / `$WORKSHOP_ROOT`, then the nearest parent `__WORKSHOP`, then `~/__WORKSHOP` |
| `bos workshop status [--all]` | the whole workshop as one report: areas, scopes, projects, findings (reads only) |
| `bos workshop bootstrap [--dryRun]` | creates the missing areas and descriptors; never overwrites |
| `bos workshop watch [--record] [--json]` | changes in the workshop as events, until Ctrl+C |
| `bos scope version <scope>` / `bos scope bump <scope> <event>` | a scope's GRIH version, raised per step, phase, milestone, flip |
| `bos flow explain` / `bos flow next <branch>` | the project's craft loop and a branch's forward step |
| `bos devlog state` | where a project stands: TODO phases, open questions, waiting orders |
| `bos project authors` | `.github/AUTHORS` kept up to date |

## The suit

| Command | What happens |
| ------- | ------------ |
| `bos agent brief` | what an agent learns at the start of a session |
| `bos workshop glossary [term]` | the definition of an element; without a term, the list |
| `bos workshop open [--dryRun]` | bootstrap (core), then `AGENTS.md` / `CLAUDE.md` in the workshop root when missing, then the opening recorded in `.BOS/storylines/logs/workshop.jsonl` |
| `bos workshop close` | copies shell history to `.BOS/storylines/ttystories/ttystory-<host>-<unixusat>.txt` and records the closing. Run `history -a` first so the current shell is included |
| `bos project describe [--skryba]` | a conventional-commit draft of what is staged; Skryba the scribe raven refines it |
| `bos project install-hooks` | inside a repository, links its git hooks to BOS, so commits, checkouts and merges land in storylines |
| `bos house show` / `bos house may-call <model>` | the House of Anubis; whether an AI resident may be called |
| `bos skills list` / `bos skills draft` | the suit's skills; a draft for every element without one |

Modes of work and host roles ([mode](../glossary/mode.md),
[host role](../glossary/host-role.md)) are not handled by the rebuilt suit yet:
they wait for the core [`TODO`].

Next: [first use](first-use-example.md)
