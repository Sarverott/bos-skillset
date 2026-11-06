import { join } from "node:path";

import { createIfMissing, Ttystories } from "blacksmith-organization-system";

// ttystory-<host>-<unixusat>.txt: the shell history as it is at closing time.
// bash writes history on exit: run `history -a` first to include the current shell
export const ttystoryName = (host) => `ttystory-${host.hostname()}-${host.now()}.txt`;

export const captureTtystory = (context) => {
  const { host, workshop } = context;
  const history = host.env("HISTFILE") || join(host.home(), ".bash_history");
  const text = host.readText(history);
  if (text === null) return;
  const ttystories = workshop.system.storylines.child(Ttystories);
  const target = ttystories.file(ttystoryName(host));
  createIfMissing(context, target, () => {
    ttystories.ensure(context);
    host.writeText(target, text);
  });
  context.ttystory = target;
};
