import House from "../../house/class.mjs";

export const readRegistry = (context) => {
  context.house = context.options.housePath ? new House(context.options.housePath) : context.suit.house;
  context.children = context.house.children();
  context.orders = context.house.orders();
};
