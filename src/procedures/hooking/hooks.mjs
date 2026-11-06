// what each git hook adds to its storyline entry
export const HOOKS = {
  "post-commit": (git, repo) => ({ commit: git.last(repo) }),
  "post-checkout": (git, repo) => ({ branch: git.branch(repo) }),
  "post-merge": (git, repo) => ({ head: git.head(repo) }),
};
