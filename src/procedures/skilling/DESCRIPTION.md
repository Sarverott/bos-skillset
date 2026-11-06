# Skilling Protocol

Every element of the workshop can grow its own agent skill. This protocol drafts
`skills/bos-<type>/SKILL.md` for each standalone element that has no skill yet:
the areas and assets the core models (workshop, devarmory, forge, scope,
project, craftbook, archive) and the House. The draft takes its title, "What it
is" and "Where" from `docs/glossary/<type>.md`, and what is inside from the
core's model class.

Claude Code finds every skill in `skills/` by itself (the plugin manifest), and
`npx skills add` does the same for other agents, so nothing needs registering.

Existing skills are never overwritten: a draft is only a starting point, and it
grows by hand. Parts of an element get no skill of their own; they belong to
their owner's skill. Re-run it after the core gains a model.
