export const recordClosing = (context) => {
  const { host, workshop } = context;
  context.event = workshop.system.storylines.record(
    { event: "close", user: host.user(), ttystory: context.ttystory ?? null },
    context,
  );
};
