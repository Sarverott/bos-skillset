# GitHub inventory, repairs and merges

Use the connected GitHub integration when it supports the operation. The `gh`
examples below are fallbacks or concrete command equivalents. Set `repo` from
the verified owning repository; no repository name below is an implicit target.
Confirm supported flags with the installed CLI when necessary.

## Inventory without dumping PR bodies

```sh
repo=OWNER/REPOSITORY
gh repo view "$repo" --json nameWithOwner,defaultBranchRef
gh api --paginate "repos/$repo/pulls?state=open&per_page=100" \
  --jq '.[] | select(.user.login == "dependabot[bot]") | {number, title, url: .html_url, base: .base.ref, base_sha: .base.sha, head: .head.ref, head_sha: .head.sha}'
```

An integration's first page or a CLI `--limit 100` result is not proof of a
complete larger queue. Include all base branches in the inventory. Verify bot
authorship rather than trusting a branch prefix or PR title.

For each candidate (set `pr` to its number):

```sh
gh pr view "$pr" --repo "$repo" \
  --json number,url,title,author,baseRefName,baseRefOid,headRefName,headRefOid,files,statusCheckRollup,reviewDecision,mergeStateStatus
gh pr diff "$pr" --repo "$repo"
gh pr checks "$pr" --repo "$repo"
```

Read review submissions and unresolved inline threads as well. With a plugin,
request changed filenames before fetching per-file patches if the tool requires
it. A lockfile diff too large for one response must be inspected locally at
the exact candidate SHA; do not treat truncated output as the complete diff.

Fetch candidate objects without moving the main checkout; verify the fetched
SHA against the recorded head before creating a detached worktree. Pin its
review to the merge-base with the PR base. Revalidate a combined candidate
against the current target after earlier merges.

## Diagnose a red check

```sh
gh run view RUN_ID --repo "$repo" --log-failed
```

Compare the failing command and its baseline. A missing optional path-label
configuration can explain a Labeler failure; it does not explain failing
package compatibility, an export mismatch or a new security finding. Report
unrelated failures with evidence, and keep required checks and review gates.
Do not commit raw logs containing private data or credential-bearing URLs.

## Propose and merge the verified result

Write a concise body to a file: problem, versions, artifacts, validation,
remaining failures and original PRs superseded. A single consolidation PR can
replace repeated overlapping updates while preserving credit and traceability.

```sh
gh pr create --repo "$repo" --base TARGET --head CONTRIBUTOR_BRANCH \
  --title 'chore(deps): reconcile the reviewed dependency batch' \
  --body-file /tmp/dependency-batch-pr.md
```

Use only the locally permitted merge method and route. After checking the
final head and CI/reviews:

```sh
gh pr merge "$pr" --repo "$repo" --merge --match-head-commit "$tested_head"
```

`--match-head-commit` guards the head, not a moving base. The branch protection
or merge queue may require new checks against an updated base. Let it enforce
those requirements; never add `--admin` to make a failed merge succeed.

Verify the merged state and artifacts in the remote target. Then close an
equivalent superseded original, if needed:

```sh
gh pr close ORIGINAL_NUMBER --repo "$repo"
```

Do not automatically delete its branch. Normal fast-forward repair pushes to
a bot branch are possible when authorized; refetch and reconcile on rejection.
Do not force-push or blindly invoke a bot recreation that overwrites repairs.

## Tool and permission failures

- An app's `Resource not accessible by integration` can mean that connector
  lacks a capability. For an already authorized operation, check whether the
  normal authenticated `gh` client can perform it. Do not copy tokens into
  commands, logs or files, or hunt another contributor's credentials.
- A sandbox filesystem/DNS failure requires the host's normal escalation
  flow if that command is necessary. Switching tools is not a way around a
  sandbox, a policy rejection or a missing authorization.
- A stale-head rejection requires a fresh review/check of the moved head.
  A required-check or required-review rejection remains a gate. Permission
  failure is not a reason to change repository rules or force a merge.

Sources: [gh pr view](https://cli.github.com/manual/gh_pr_view),
[gh pr merge](https://cli.github.com/manual/gh_pr_merge),
[Dependabot options](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
