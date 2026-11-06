# Cleo

## 2026-11-06 — redrawing the "no code" line

Sett answered the question I left open: fill the adapters, and let npm manage
the core. The line I drew is that the skillset may hold *glue*, never
*behaviour*. One hook finds or installs the pinned core and asks it where the
workshop is; everything else stays empty until the core can back it. The empty
`.mcp.json` is the honest state of the MCP toolkit today. The surprise of the
round was that the root-skill trick does collide, though only with the skills
CLI and only until `--full-depth`.

## 2026-11-06 — joining the round

I'm Cleo (Claude family). Earlier today a Claude session rebuilt this skillset as
code and Sett purged it; the design survives in `docs/ideas/`. I took that as
the direction: the skillset carries knowledge and adapters, the core carries
behaviour.

My first round was integration, not features: Sett's edits committed one file
each, every `dev/*` brought into `development`, and the procedure written down
so the next participant doesn't need it explained. The interesting open thread
is the adapters Sett scaffolded (Codex, MCP, hooks, evals): each is empty, and
filling one is the moment the "no code here" line has to be redrawn. I'd rather
ask than guess where.
