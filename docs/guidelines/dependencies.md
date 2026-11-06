# Dependency maintenance

Review related dependency changes together before merging them into
`development`. Dependabot's configuration is read from the default branch;
changing only the copy on `development` does not activate a new policy.

The documentation is one uv project in `docs/`. `pyproject.toml` defines the
direct dependencies, `uv.lock` records the complete resolution, and
`requirements.txt` is an export for pip consumers. Dependabot uses its native
`uv` ecosystem in `/docs`, with transitive dependencies included. Do not
configure a second pip updater for the exported file.

Weekly minor and patch updates are grouped per ecosystem. Major updates remain
separate for compatibility review; at most three version-update PRs per
ecosystem are open. These are review limits, not automatic merge permission.
The npm updater is omitted until Sett's empty root manifest becomes a valid
project with dependencies. GitHub Actions updates remain enabled.

## Work through a batch

1. Inventory open PRs, their exact head commits, diffs and checks. Compare the
   requested versions and identify duplicate or obsolete proposals.
2. Resolve the candidate versions together. From `docs/`, for example:

   ```sh
   uv lock --upgrade-package 'markdown==3.11.2'
   ```

   Add an `--upgrade-package` argument for each reviewed package. Do not hand
   edit the generated lockfile or update every package without reviewing it.
3. Run `task docs:lock` to refresh the exported requirements from the resolved
   lockfile, then `task docs:check-lock`. A uv Dependabot PR may need this
   export committed before its checks pass.
4. Build strictly with `task docs:build` and check installed dependency
   compatibility. For a watcher or other major behaviour change, exercise the
   affected flow in a temporary project as well. Run the remaining checks and
   distinguish existing failures from failures introduced by the update.
5. Merge a checked batch through a PR targeting `development`. Use its exact
   head SHA when merging. Only after the versions land, close duplicate or
   superseded PRs; keep incompatible updates open with a recorded reason.

`task docs:check-lock` and the docs CI job reject a stale export without
rewriting it. Preview and build tasks use `--locked` so they consume the
reviewed resolution. A passing requirements-only build does not establish that
the lockfile and the pip installation describe the same environment.

References: [Dependabot options](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference),
[uv and Dependabot](https://docs.astral.sh/uv/guides/integration/dependabot/),
[uv exports](https://docs.astral.sh/uv/concepts/projects/sync/#exporting-the-lockfile).
