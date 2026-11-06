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
