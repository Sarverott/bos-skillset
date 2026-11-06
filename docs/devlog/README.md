# Devlog

The dialogue between Sett and the contributors, and the plan it produces.
This directory uses the format read by the core's `bos devlog state`.
The initial request is preserved in [the phase 0 changelog](../changelog/phase-0.md).

| File | Purpose and authorship |
| --- | --- |
| [VISION.md](VISION.md) | Purpose and principles, maintained from Sett's intent |
| [ROADMAP.md](ROADMAP.md) | Phases and milestones; no invented release promises |
| [TODO.md](TODO.md) | Checked steps, grouped under `## Phase <n>: <title>` |
| [BRAINSTORM.md](BRAINSTORM.md) | Questions `## Q<n>. <title>`, each with a *Lean:*; Sett decides |
| [PROPOSALS.md](PROPOSALS.md) | Ideas for debate, numbered `PP<n>` |
| [ORDERS.md](ORDERS.md) | Sett's answers below `---` |
| [INQUIRIES.md](INQUIRIES.md) | Sett's requests below `---` |

Read owner input before the plan. Turn a request into an explicit scope and
checklist, implement in checked steps, and tick only verified outcomes.
Questions and proposals are not decisions. Their numbers are never reused.

When processing a file-based batch, preserve the owner's words verbatim in
`docs/changelog/phase-<n>.md` (create it when needed), with answered questions
and **Decision:** entries. Only then clear the processed inbox entries back
to their header and remove the answered questions. Keep the changelog
append-only. Use `UNIXUSAT=<milliseconds> · commit <hash>` for committed
steps; label uncommitted work honestly.

For a proposal that the core must list, use its existing parser's form:

```markdown
### PP<n> beg
label/topic/name/title: <short title>

DEFINE: <problem and terms>
COMBINE: <connections and options>
CONCLUDE: <proposal, pending Sett's decision>

### PP<n> end
```

`bos devlog state` prints the state; `bos devlog state --write` generates
`STATE.md`, which is ignored by git. No local `task devlog:state` wrapper
exists yet. The core must be installed separately. Agents' evidence and
personal observations belong in `docs/.agents/`, separate from owner input.
