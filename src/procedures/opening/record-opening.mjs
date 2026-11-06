export const recordOpening = (context) => {
  const { host, workshop } = context;
  context.event = workshop.system.storylines.record(
    { event: "open", user: host.user(), from: workshop.located?.source ?? null },
    context,
  );
};
