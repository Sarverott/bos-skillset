// the base of the workshop is the core's to build: its changes join this context
export const bootstrapWorkshop = async (context) => {
  const built = await context.suit.bootstrap({ dryRun: context.dryRun });
  context.workshop = built.workshop;
  context.changes.push(...built.changes);
};
