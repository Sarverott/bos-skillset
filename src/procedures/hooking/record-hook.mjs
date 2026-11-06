import { placeIn } from "../../agent/place.mjs";
import GitCli from "../../bridges/git-cli.mjs";
import { HOOKS } from "./hooks.mjs";

export const recordHook = (context) => {
  const { hook } = context.options;
  if (!(hook in HOOKS)) throw new Error(`unhandled hook "${hook}" (known: ${Object.keys(HOOKS).join(", ")})`);
  const git = new GitCli(context.host);
  const cwd = context.options.dir ?? context.host.cwd();
  const repo = git.root(cwd) ?? cwd;
  const { workshop } = context.suit;
  // a repository outside any workshop leaves no story, and git is never blocked
  if (!workshop.exists()) return;
  context.event = workshop.system.storylines.record(
    { event: "git-hook", hook, repo, place: placeIn(context.suit, repo), ...HOOKS[hook](git, repo) },
    context,
  );
};
