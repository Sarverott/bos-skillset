# Phase 1: adopt the core deliberately

## UNIXUSAT=1793960017813 · integration round, merge f896cfc

### Sett's request (verbatim)

great purge of code there! sad to see your work vanish in vein propably but trust me it was required... we can work now - new participant joins us here! i made here again some mess here but you can proceede. i made here lot of changes after joker finish his job so as we know (propably) not you should switch the branch to "dev/Sarverott", each change of file diff shows you should be staged and commited in separed commit first, then push all dev branches from local to remote, then push all "dev/*" changes into merged development branch, then push it to remote, then switch branch to "dev/Cleo" and adapt to current situation. a lot is going on here now. by the way make information note for others to work like that in future so i will not have to explain it yet again.

**Decision:** Sett's edits are committed on `dev/Sarverott`, one commit per
changed file (28 commits, `393e7a1..218bed8`); a pure move counts as one.
Every `dev/*` branch is pushed, `development` is fast-forwarded to
`origin/development` (which already held PR #31 from `dev/Joker`) and
`dev/Sarverott` merged with `--no-ff` (`f896cfc`), then pushed. Cleo works on
`dev/Cleo`, started from `development`. The procedure is written down as
[integration round](../guidelines/integration-round.md) and linked from
`AGENTS.md` and `CONTRIBUTING.md`.


## UNIXUSAT=1793963367630 · commit 76b5158 / 807b80e, PR #38

### Sett's request (verbatim)

can you manage these PRs by dependabot there? he always make lot of them and someone has to later check all of them and merge whole stack of PRs with every time it is done wents to collisions to be yet additionaly solved there. each edited uncommited files you can threat like Cleo does that there: switch to "dev/Sarverott", then each change listed on diff should be staged and commited one after another commit per change, then push it to development, then switch to your dev branch and try to solve dependabot PRs

**Decision:** Follow the integration round first. The only current owner
change, the Copilot ruleset export, is preserved as `dc55402` on
`dev/Sarverott`, brought to `development` by merge `3d1fdcb`, and pushed.
Continue on `dev/Joker`.

Nine open Dependabot PRs represent six distinct updates. Resolve the six
versions together, regenerate the source uv lockfile and requirements export,
then merge the tested batch as [PR #38](https://github.com/Sarverott/bos-skillset/pull/38)
(`69527e6`). Close #26, #27, #28, #30 and #33–#37 as superseded only after
verifying the exact artifacts on development. All nine are now closed.

Use native uv updates in `/docs`, group weekly minor/patch updates by
ecosystem, keep majors separate, and cap open version-update PRs at three
per ecosystem. Omit npm until a usable manifest exists. A new export drift
check runs through Task and CI. Default-branch activation is handled by the
configuration-only [PR #39](https://github.com/Sarverott/bos-skillset/pull/39).

Validation: Python 3.12 resolution and installed-package compatibility,
strict docs build, watchdog 7 preview/rebuild in a temporary fixture, and
positive/negative checks of the export guard. GitHub docs, skills and security
checks pass. The existing missing `.github/labeler.yml` fails the separate
Labeler job; the development tree's empty hooks/MCP JSON still fails full
plugin validation. Those scaffolding issues remain separate.

The activation PR #39 merged as `4dc7413`. The open Dependabot inventory
is now empty. Grouping is effective on the default branch; both branch
copies of the policy are synchronized. The configuration-only branch's
full `task check` passed locally, with existing plugin listing warnings.


## UNIXUSAT=1793963814492 · commit 4eb7737, first grouped PR #40

The activated policy opened a group for backrefs 8.1, certifi
2026.10.23 and mkdocs-material 9.8.0. The new consistency check rejected
its original mismatched lockfile/export locally and in GitHub run
`42208366149`. Repair `4eb7737` re-resolves precisely those three versions
and is pushed without rewriting the bot branch. Consistency, strict docs
build, installed-package compatibility and GitHub docs/skills/security
checks pass on the repaired head.

PR #40 merged as `2317581` after those checks passed. The active policy
now covers the first grouped maintenance round as well as the original
stack cleanup.
