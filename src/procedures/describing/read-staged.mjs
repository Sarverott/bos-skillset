import GitCli from "../../bridges/git-cli.mjs";

export const readStaged = (context) => {
  const git = new GitCli(context.host);
  const cwd = context.options.dir ?? context.host.cwd();
  context.repo = git.root(cwd) ?? cwd;
  context.staged = git.staged(context.repo);
};
