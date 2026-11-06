# First use: a workshop from nothing

A safe rehearsal in a temporary directory, with the core's `bos`:

```bash
export BOS_WORKSHOP=/tmp/demo/__WORKSHOP

bos workshop bootstrap --dryRun     # plan only; nothing exists yet
bos workshop bootstrap              # the workshop appears
bos workshop status
```

Put work where it belongs:

```bash
mkdir -p $BOS_WORKSHOP/forge/my-scope && cd $BOS_WORKSHOP/forge/my-scope
git clone <repo> my-project
echo "idea…" > $BOS_WORKSHOP/craftbook/scrapnotes/idea.md
bos workshop status                 # the scope and the project are found
```

For your real workshop, drop `BOS_WORKSHOP` and run `bos` from anywhere inside it.
