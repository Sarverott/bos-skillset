import { Procedure } from "blacksmith-organization-system";

import { askSkryba } from "./ask-skryba.mjs";
import { composeDraft } from "./compose-message.mjs";
import { readStaged } from "./read-staged.mjs";
import { writeMessage } from "./write-message.mjs";

// draft a conventional commit message from the staged changes
export const describing = new Procedure("describing", [
  { name: "read staged changes", run: readStaged },
  { name: "compose draft", run: composeDraft },
  { name: "ask Skryba", run: askSkryba },
  { name: "write into commit message", run: writeMessage },
]);

export default describing;
