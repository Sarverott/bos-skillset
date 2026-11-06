# Agent findings

Newest findings first. Date observations, name evidence, distinguish proposals
from decisions, and re-check facts that may drift. Sett answers in the devlog.

## 2026-11-06 — Joker: contributor-guide foundation

- Inspected sibling core `blacksmith-organization-system`, package version
  `1.11.0`, on `dev/Cleo`. Its untracked examples were left untouched. Read its
  guide, devlog, glossary, Taskfile, settings, tool registry and relevant source;
  ran `node src/cli.ts help` without changing that checkout.
- This skillset currently has no npm manifest, `.github/bos.json`, versioning
  hooks or release workflow. Its checked-in automation is
  `.github/workflows/checks.yml`. The core's abbreviated `revision → master`
  workflow is specific to the core; the full loop remains the local guide.
- Current core workshop resolution includes `WORKSHOP_ROOT` before ancestor
  discovery. Explicit paths may name the containing directory. Several local
  glossary and skill pages still describe older resolution, `.mjs` model files,
  `developement`, or nonexistent commands such as `bos project promote`.
  Reconciliation is recorded in devlog Phase 1, not silently completed here.
- `bos devlog state` reads the eight maintained devlog files and prints by
  default; `--write` generates STATE.md. Proposal parsing expects
  `### PP<n> beg`, not an arbitrary heading. Evidence:
  `src/models/devlog/class.ts` and `src/tools/devlog.ts` in the core.
- Core bumps operate on package versions; plugin manifests need their own
  synchronized update. Do not advertise release automation before wiring it.
- An empty, untracked root `SKILL.md` was present before this task. It is kept
  untouched and excluded from any task commit.

Reference dumps were supplied for this task and are removed before committing.
Maintained upstream references replace them:

- [Agent Skills specification](https://agentskills.io/specification)
- [Skill creation guidance](https://agentskills.io/skill-creation/best-practices)
- [Task documentation index](https://taskfile.dev/llms.txt)
- [Task schema](https://taskfile.dev/docs/reference/schema)
- [Task dependencies and ordered calls](https://taskfile.dev/docs/guide/dependencies)

### Validation

- `task skills`: passed; all 13 `bos-*` skills found. Also lists the existing
  template as `skill-name` and skips Sett's empty root `SKILL.md` for missing
  frontmatter. Those discovery issues are recorded in devlog Phase 1.
- `claude plugin validate .`: passed with warnings about root `CLAUDE.md`
  not shipping plugin context and a missing listing icon. The former is why
  contributor entrypoints and installed skill context are kept distinct.
- `task docs:build`: strict build passed after removing the supplied manuals;
  the baseline build failed on a broken example link in a manual.
- All three JSON manifests parse and all four version fields agree at `1.0.1`.
- The core's `devlog state --dir=<this checkout> --json` reads both phases,
  no pending inbox entries and no missing files. It writes nothing by default.
- npm registry access and uv's cache required execution outside the filesystem
  sandbox; the existing check commands themselves were unchanged.
