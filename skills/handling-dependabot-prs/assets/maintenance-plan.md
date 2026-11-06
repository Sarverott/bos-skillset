# Dependency maintenance round

## Scope and repository

- User request and authorized operations:
- Owning checkout and verified remote:
- Default branch; dependency target branch(es):
- Contributor branch or isolated worktree:
- Baseline commit and inventory time:
- Local rules/handoff and other contributors' edits:
- Package manager/runtime; authoritative manifests and derived artifacts:

## PR ledger

| PR/link | Base/head SHA | Requested upgrade | Decision | Check/review evidence | Final disposition |
| --- | --- | --- | --- | --- | --- |

Explain why duplicates are equivalent, which original fixes a replacement
covers, and why any update must remain open. Keep major migrations and
security coverage visible. Record newly arrived PRs separately from the initial
inventory; do not copy entire PR bodies or private logs.

## Candidate and validation

- Sequential merges or consolidation PR, with reason:
- Intended versions and any additional resolver changes:
- Lock/export consistency result:
- Exact tested base/head and test commands/results:
- Affected behaviour exercised:
- Existing failures versus introduced failures; required checks/reviews:
- Post-hook commit changes and final CI head:

## Landed result and handoff

- Merged PRs/commits and remotely verified target artifacts:
- Originals closed as superseded, with equivalent landed replacements:
- Blocked or newly arrived PRs and next action:
- Bot policy: prepared, pending activation, or verified on the default branch:
- Final branch, clean/dirty state and remaining worktrees:
- Owning devlog/agent-note records:
