// What Skryba reads: the stat of the staged changes, and a trimmed diff
// (lock files skipped, each file and the whole capped) so it fits a small model.
const SKIP = /(^|\/)(package-lock\.json|uv\.lock|yarn\.lock|pnpm-lock\.yaml)$/;

// git: a GitCli (src/bridges/git-cli.mjs)
export function stagedDiff(git, repo, { perFile = 1500, total = 8000 } = {}) {
  const stat = git.try(["diff", "--cached", "--stat"], repo) ?? "";
  const diff = git.try(["diff", "--cached", "-U2", "--no-color"], repo) ?? "";
  let budget = total;
  const parts = diff
    .split(/^(?=diff --git )/m)
    .filter((part) => {
      const path = part.match(/^diff --git a\/(\S+)/)?.[1] ?? "";
      return path && !SKIP.test(path);
    })
    .map((part) => {
      const cut = part.slice(0, Math.max(0, Math.min(perFile, budget)));
      budget -= cut.length;
      return cut.length < part.length ? `${cut}\n… (trimmed)\n` : cut;
    })
    .filter(Boolean);
  return { stat, diff: parts.join("") };
}
