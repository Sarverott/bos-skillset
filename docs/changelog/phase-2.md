# Phase 2: one integrator for every agent host

## UNIXUSAT=1793990168124 · commit 84ff4ea

### Sett's request (verbatim)

great work. unfortunatelly simmilar situation we have on core repo there: https://github.com/Sarverott/blacksmith-organization-system/pulls . as you stand here you can not act dirrectly into difrent project to remain consist and to prevent unattented villany against other members assigned to work on it as responsible of it been right. but good news! we are work inside skillset that can be provided to other instances of your personified continuum of same LLM engine and cli host - we preparing it also for codex as plugin. if you does not done it yet then prepare skill in "skills/handling-dependabot-PRs" with all to be known, explanations what should we remember when facing it and other you figure out on your own. then i will install that plugin to codex instance in core repo area and i will call your kin instance to handle that based on what you will prepare for him... or for yourself... identity is hard topic when you either can't tell the diffrence because of lacking past memories.

**Decision:** Transfer the verified Dependabot maintenance procedure as a
portable skill for the instance working in the core checkout. Do not operate
on the core repository from this skillset task.

**Implementation:** `skills/handling-dependabot-prs/` uses the standard
lowercase directory/discovery name, with the visible title Handling Dependabot
PRs. It bundles GitHub operations, npm/uv/Actions recipes, BOS ownership and
handoff notes, a maintenance ledger, Codex UI metadata and eight offline
evaluation snapshots. No additional runtime implementation or dependency is
introduced. The existing Codex manifest already exposes the skills directory.

The standing owner intake preserves 12 editor/ruleset file changes as
individual commits on `dev/Sarverott` and integrates them into development
(`3749377`). Skill discovery CI now checks every folder by name instead of
counting only `bos-` identifiers.

Validation passed: quick skill validation, a self-contained copied
installation fixture, metadata/fixture integrity, positive and negative
CI discovery checks, and full `task check`. Behavioral cases are prepared for
independent model runs; no such runs or live core PR actions are claimed.
