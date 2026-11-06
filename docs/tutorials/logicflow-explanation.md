# Procedures (logicflows)

A procedure is a list of ordered, named steps that share one context object
(the core's `Procedure` and `createContext`). Every run leaves
`context.trace` (step, ok, ms) and `context.changes` (paths created, or planned
in a dry run).

The workshop's own procedures (bootstrapping, inspecting, watching, the flow,
versioning, crediting) are the core's
([blacksmith-organization-system](https://github.com/Sarverott/blacksmith-organization-system)).
The suit adds the ones agents need, each in its own directory of `src/procedures/`:

```
procedures/closing/
├── DESCRIPTION.md          why it exists
├── capture-ttystory.mjs    one step
├── record-closing.mjs      one step
└── _index.mjs              assembly: new Procedure("closing", [steps])
```

| Procedure | Steps |
| --------- | ----- |
| opening | bootstrap the workshop (core) → deploy the agents' guides → record the opening |
| closing | capture the ttystory → record the closing |
| describing | read staged changes → compose draft → ask Skryba → write into the commit message |
| hooking | record hook; installingHooks: link hooks |
| gathering | read the House registry → list served models → merge residents |
| skilling | collect elements → compose skills → write missing skills |

Tools run them:

```js
import { NodeHost } from "blacksmith-organization-system";
import { findTool, Suit } from "bos-skillset";

const suit = new Suit(new NodeHost());
const result = await findTool("workshop", "open").run(suit, { dryRun: true });
console.log(result.changes);
```

To add a procedure:
1. Create `src/procedures/<name>/` with `DESCRIPTION.md`, one file per step, and `_index.mjs`.
2. Collect it in `src/procedures/_index.mjs`.
3. Give it a tool in `src/tools/<model>.mjs` (the core's `tool()` format) and a test: it becomes
   `bos <model> <tool>`, and an MCP tool too when it is read-only.

If the behaviour is about the workshop itself rather than about agents, it
belongs in the core: leave a note in `~/__WORKSHOP/forge/NOTES-for-repositories.md`.

Rules the procedures keep: create only what is missing, never overwrite,
respect `context.dryRun`, and record events in storylines.
