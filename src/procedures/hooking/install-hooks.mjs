import { join } from "node:path";

import { createIfMissing } from "blacksmith-organization-system";

import GitCli from "../../bridges/git-cli.mjs";
import { CLI } from "../../self.mjs";
import { HOOKS } from "./hooks.mjs";

// link a repository's hooks to `bos project hook <name>`; someone's own hook is left alone
export const installHooks = (context) => {
  const { host } = context;
  const git = new GitCli(host);
  const root = git.root(context.options.dir ?? host.cwd());
  if (!root) throw new Error("not inside a git repository");
  context.skipped = [];
  // hooks managed elsewhere (e.g. husky sets core.hooksPath): those hooks call `bos project hook <name>` themselves
  const managed = git.hooksPath(root);
  if (managed) {
    context.managedBy = managed;
    context.skipped.push(`all: core.hooksPath is ${managed}`);
    return;
  }
  for (const hook of Object.keys(HOOKS)) {
    const target = join(root, ".git", "hooks", hook);
    if (host.exists(target)) context.skipped.push(target);
    createIfMissing(context, target, () => {
      host.writeText(target, `#!/bin/sh\nexec node "${CLI}" project hook ${hook} "$@" || true\n`);
      host.run("chmod", ["755", target]);
    });
  }
};
