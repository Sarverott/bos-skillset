# Getting started

The skills point at the core's `bos` command
([installation](installation.md)). Add `--json` to any tool for
machine-readable output; `bos help` lists them all.

| Command | What happens |
| ------- | ------------ |
| `bos workshop locate` | finds the active workshop: `--workshop`, then `$BOS_WORKSHOP`, then the nearest parent `__WORKSHOP`, then `~/__WORKSHOP` |
| `bos workshop status [--all]` | the whole workshop as one report: areas, scopes, projects, findings (reads only) |
| `bos workshop bootstrap [--dryRun]` | creates the missing areas and descriptors; never overwrites |
| `bos workshop watch [--record] [--json]` | changes in the workshop as events, until Ctrl+C |
| `bos scope version <scope>` / `bos scope bump <scope> <event>` | a scope's GRIH version, raised per step, phase, milestone, flip |
| `bos flow explain` / `bos flow next <branch>` | the project's craft loop and a branch's forward step |
| `bos devlog state` | where a project stands: TODO phases, open questions, waiting orders |
| `bos project authors` | `.github/AUTHORS` kept up to date |

What the suit once added on top (opening and closing, commit drafts, the House
as a command): [ideas](../ideas/README.md).

Next: [first use](first-use-example.md)
