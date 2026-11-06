import { Procedure } from "blacksmith-organization-system";

import { installHooks } from "./install-hooks.mjs";
import { recordHook } from "./record-hook.mjs";

export const hooking = new Procedure("hooking", [{ name: "record hook", run: recordHook }]);
export const installingHooks = new Procedure("installing-hooks", [{ name: "link hooks", run: installHooks }]);

export default hooking;
