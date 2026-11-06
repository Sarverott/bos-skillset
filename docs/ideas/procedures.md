# Idea: procedures for agents

A procedure is a list of ordered, named steps that share one context (the
core's `Procedure` and `createContext`). Every run leaves a trace (step, ok,
ms) and the changes it made, or planned in a dry run. The workshop's own
procedures (bootstrapping, inspecting, watching, the flow, versioning) are the
core's. These are the ones the first build of the suit added:

| Procedure | Steps |
| --------- | ----- |
| opening | bootstrap the workshop (core) → deploy the agents' guides (`AGENTS.md`, `CLAUDE.md` from `resources/workshop-root/`, only when missing) → record the opening in `.BOS/storylines/logs/workshop.jsonl` |
| closing | capture the shell history (`$HISTFILE` or `~/.bash_history`) as `.BOS/storylines/ttystories/ttystory-<host>-<unixusat>.txt` → record the closing |
| describing | read the staged changes → compose a conventional-commit draft → ask Skryba → write it into the commit message |
| hooking | install git hooks that report commits, checkouts and merges to storylines; record each event |
| gathering | read the House's registry (`resources/house/`) → list the models ollama serves → merge them into residents with a state |
| skilling | collect the glossary's elements → compose a `SKILL.md` draft for each one without a skill → write only the missing ones |

Rules they keep: create only what is missing, never overwrite, respect the dry
run, and record events in storylines.

## Describing: the commit describes itself

The draft is mechanical:

- **type**: `docs`, `test`, `ci` or `build` when only that part changed; `feat`
  when new source files appear; otherwise `chore`
- **scope**: the part of the project the paths are in
- **subject**: add / update / remove, plus what the paths are about
- **body**: every file, marked A / M / D

Then **Skryba**, the scribe raven ([raven](../glossary/raven.md),
`resources/ravens/skryba.md`), reads the trimmed staged diff through ollama and
proposes a subject about the *purpose* of the change and a short body. He
answers in a fixed JSON shape, so the header is always a valid conventional
commit; the file list stays, and a `Drafted-by: Skryba (<model> via ollama)`
trailer says who wrote it. He only proposes: the editor opens with the draft,
and a message given with `-m`, a merge, a squash or an amend is never touched.
Without ollama, or with an unusable answer, the plain draft is used.
`BOS_SKRYBA=0` turns him off, `BOS_SKRYBA_MODEL` picks another model.

Before calling him, the House is asked: only `active` residents are called, and
the EON family rests by its own decision and is never called, prompted or
inspected.

## Where it belongs

Opening, closing, hooking and gathering are about the workshop: the core.
Describing could be the core's too (it has `project` tools already). Skilling
is the one that could stay with the skillset, as a script that writes skills
from the glossary, if it is ever needed again.
