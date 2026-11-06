# Owning repository and BOS handoff

Read this when the user works in a BOS repository or several people/agents
share a workshop. These are orientation pointers; the target's current rules
and the user's instructions govern the task.

## Establish the boundary

The skillset packages knowledge. The core repository owns BOS implementation.
An instance asked to prepare this skill in `bos-skillset` must not start fixing
the core's PRs. The instance installed in the core checkout can act there when
the user requests it, after verifying cwd, the git root and remote. Installing
a plugin does not confer cross-project authorization.

Start from the target checkout, not the cached plugin installation:

```sh
pwd
git rev-parse --show-toplevel
git status --short --branch
git remote -v
git log -8 --oneline
task --list
```

Read the applicable `AGENTS.md`, `.github/CONTRIBUTING.md` and, when present,
`docs/devlog/{README,ORDERS,INQUIRIES,TODO,BRAINSTORM}.md`, plus
`docs/.agents/NOTES.md`. Do not assume paths absent from a different project.
Never infer an individual's contribution solely from git's author: agents
may commit under the owner's configured identity and use coauthor trailers.

## Owner intake and concurrent contributors

Some BOS projects explicitly prescribe `dev/Sarverott`, one owner change per
commit, then integration into `development`, followed by the agent's own
`dev/<name>`. Apply that procedure only when authorized by the user or current
local rules. The skill itself does not authorize committing arbitrary dirty
files or pushing every contributor's unpublished work.

Read each supplied change. Stage explicit paths, including both sides of a
pure rename. Preserve unrelated content and never format owner material just
to suppress a warning. Stop command sequences when a step fails; do not let a
failed validation fall through into a push or merge. A harmless pre-existing
whitespace warning is distinct from a failed required hook.

A branch is not an isolated workspace. A checkout switch moves every process
using that directory. Coordinate a shared-checkout handoff or use a separate
worktree. Fetch and inspect upstream history before integrating; do not
blindly stash, reset, delete branches or force-push to repair divergence.

## Core-specific checks to discover

In a core checkout, inspect its current Taskfile, package scripts,
`.github/bos.json`, CI and git hooks. Earlier core work used `task check` for
types/lint/tests, plus build, strict docs and package validation. Confirm the
current definitions; this skillset's docs-only checks are not substitutes.

Contributor hooks may bump the package version on commits and stage the lock.
Inspect the post-hook commit and all declared version locations. A failed
dependency install must not be worked around by bypassing hooks, silently
changing the supported Node version, or upgrading every package at once.

If a trial needs a workshop, use the core's configured development workshop
or a temporary one under the target's rules. Read-only location/status is
different from bootstrapping, archiving or recording events. A dependency task
does not require writing into the owner's home workshop.

When another repository needs a change, record a handoff in the owning
project's work records, or the workshop's cross-repository notes if permitted.
Include repository, exact base/head, requested action, failing check, proposed
fix and validation still required. Do not edit that repository from here.
