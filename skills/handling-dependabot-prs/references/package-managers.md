# Resolve one environment, then verify its representations

Use the target repository's package-manager version, workspace configuration
and existing Task commands. The examples are recipes to adapt, not instructions
to install tools or apply these exact packages in every repository.

## npm: the common BOS core surface

Inspect `package.json`, `package-lock.json` (or the actual lockfile in use),
`.npmrc`, Node/npm versions, workspaces, peer/engine constraints, overrides and
scripts. Distinguish runtime dependencies from development tools: a dev-only
compiler, build tool or test runner can still break the shipped package.

For a compatible reviewed PR, run the repository's normal clean install and
its checks, for example:

```sh
npm ci
task check
```

Use the real project's additional build, docs, package or integration checks.
`npm ci` fails on manifest/lock disagreement and does not repair it. When
combining updates, first establish the intended manifest ranges and versions,
then regenerate with that project's npm version and configuration. Preserve
whether a dependency belongs in dependencies, devDependencies or a workspace.
Do not use a root install command to silently change that classification.

A lock-only bot change can be legitimate when the manifest range already
permits it. Inspect the resolved tree, peer/engine compatibility, changed
integrity metadata and install scripts. For a native module, compiler, SDK or
build-tool major, exercise the affected build/runtime contract. Do not turn a
dependency review into an unrequested runtime migration. Keep incompatible
PRs open with a concrete reason while handling compatible ones.

On conflicts, reconcile manifest intent and let npm regenerate the resolution;
do not splice integrity records or delete the lock to obtain a green install.
Inspect unexpected transitive changes and keep relevant lock/config pairs
together. Retain install flags the project relies on. Never use
`npm audit fix --force`, `--legacy-peer-deps` or ignored engine constraints as a
generic escape from an incompatibility. Lifecycle scripts execute code:
inspect changes and use the repository's permitted isolated test environment.

## uv, pip exports and documentation

Identify whether `requirements.txt` is authoritative input or generated output.
For a uv project the usual chain is:

```text
pyproject.toml → uv.lock → requirements export → pip consumer
```

Use the native uv updater for uv source files. Resolve exactly the reviewed
versions in the candidate project; this example illustrates repeated arguments:

```sh
uv lock --upgrade-package 'backrefs==8.1' --upgrade-package 'certifi==2026.10.23'
```

Regenerate exports using the repository's Task wrapper or established export
flags (groups, extras, markers and hashes matter). For the simple BOS docs
export used in the original maintenance round:

```sh
uv export --locked --no-hashes --no-header --no-annotate --no-emit-project -o requirements.txt
```

Compare a freshly generated export from the lock with the committed file,
without rewriting either during a check. Then use a frozen install/build and
package compatibility check. A strict static docs build covers rendering; a
watcher major also needs a temporary preview where editing a page actually
causes a rebuild. It must not touch the owner's live workshop or documents.

Both directions of drift are possible: an export with an old lock, or an
updated lock with an old export. Native Dependabot uv support once produced
a group naming new backrefs/certifi versions in requirements while retaining
old versions in the lock. The new consistency check failed, and a targeted
uv re-resolution fixed it. Reconfirm this in the target; it is a failure case,
not a claim that all grouped updates are broken.

## GitHub Actions and bot policy

For action updates, inspect changed `uses:` references, release/migration
notes, runner/runtime support, permissions and changed inputs. Run affected CI
where possible. Package installation alone does not validate an action major.
Never run untrusted PR code under a privileged `pull_request_target` context
as a shortcut to repair CI.

Group routine minor/patch changes per ecosystem; review majors separately
unless testing supports a combined migration. As an adaptable policy example,
weekly groups and three open version-update PRs per ecosystem reduced the
original backlog. Security-update PR limits and default-branch targeting have
different semantics; preserve actual security coverage.

Ensure manifest directories and package ecosystems match the real projects.
Do not configure independent pip and uv jobs to fight over the same generated
file. An absent/empty npm manifest explains why an npm updater was omitted in
one earlier skillset round; it is not a reason to disable updates for the
TypeScript core's real npm dependencies. That skillset manifest was later filled.

Deploy policy changes through the repository's permitted review/promotion
route. Dependabot reads policy on the default branch; `target-branch` selects
where version-update PRs go. Do not promote unrelated development changes just
to activate grouping, and do not silently disable security updates or bypass
an owner's release decision.

Sources: [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/),
[uv locking and syncing](https://docs.astral.sh/uv/concepts/projects/sync/),
[uv and Dependabot](https://docs.astral.sh/uv/guides/integration/dependabot/),
[Dependabot options](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference).
