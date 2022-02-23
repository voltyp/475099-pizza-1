import { capitalize } from "@/common/helpers";

const entity = "cart";
export const module = capitalize(entity);
const namespace = { entity, module };

console.log(namespace);

export default {
  namespaced: true,
  state: {
    pizzas: [],
  },

  getters: {
    totalPrice: (state) =>
      state.pizzas.reduce((sum, pizza) => pizza.price + sum, 0),
  },

  mutations: {},

  actions: {},
};
