import { capitalize } from "@/common/helpers";

const entity = "builder";
export const module = capitalize(entity);

import pizza from "@/static/pizza.json";
import { getCssClassForPizza, getImageName } from "@/common/helpers";
import { uniqueId, cloneDeep, omit } from "lodash";

import {
  ADD_ENTITY,
  RESET_STATE,
  SET_ENTITY,
  UPDATE_INGREDIENT,
  UPDATE_PIZZA_PARAMS,
} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    dough: [],
    ingredients: [],
    ingredientsPos: {},
    sauces: [],
    sizes: [],

    pizza: {
      name: "",
      dough: {},
      sauce: {},
      size: {},
    },
    initialState: null,
  },

  getters: {
    cssClassForPizza: (state) =>
      getCssClassForPizza(state.pizza.dough.name, state.pizza.sauce.name),
    filling: (state) =>
      state.ingredients.filter((ingredient) => ingredient.quantity > 0),
    pizzaPrice(state, getters) {
      const sumIngredient = getters.filling.reduce(
        (acc, ingredient) => ingredient.price * ingredient.quantity + acc,
        0
      );

      const { dough, sauce, size } = state.pizza;

      return (sumIngredient + dough.price + sauce.price) * size.multiplier;
    },
    isDisableBtnAddToCart(state, getters) {
      return getters.filling.length === 0 || state.pizza.name === "";
    },
  },

  mutations: {
    [UPDATE_PIZZA_PARAMS](state, param) {
      state.pizza = { ...state.pizza, ...param };
    },
    [UPDATE_INGREDIENT](state, { ingredientName, quantity }) {
      let ingredient;

      if (state.ingredientsPos[ingredientName]) {
        const ingredientIdx = state.ingredientsPos[ingredientName];
        ingredient = state.ingredients[ingredientIdx];
      } else {
        const ingredientIdx = state.ingredients.findIndex(
          (item) => item.name === ingredientName
        );

        state.ingredientsPos[ingredientName] = ingredientIdx;
        ingredient = state.ingredients[ingredientIdx];
      }

      ingredient.quantity = quantity;
    },
    [RESET_STATE](state) {
      Object.assign(state, omit(state.initialState, "initialState"));
    },
  },

  actions: {
    async init({ state, dispatch, commit }) {
      dispatch("fetchDough");
      dispatch("fetchIngredients");
      dispatch("fetchSauces");
      dispatch("fetchSizes");

      commit(UPDATE_PIZZA_PARAMS, {
        dough: state.dough[0],
        sauce: state.sauces[0],
        size: state.sizes[0],
      });
      commit(
        SET_ENTITY,
        {
          module,
          entity: "initialState",
          value: cloneDeep(state),
        },
        {
          root: true,
        }
      );
    },

    async fetchDough({ commit }) {
      const getDough = pizza.dough;

      commit(
        SET_ENTITY,
        {
          module,
          entity: "dough",
          value: getDough,
        },
        {
          root: true,
        }
      );
    },
    async fetchIngredients({ commit }) {
      const getIngredients = pizza.ingredients;
      const ingredientsWithCounter = getIngredients.map((item) => ({
        ...item,
        className: getImageName(item.image),
        quantity: 0,
      }));

      commit(
        SET_ENTITY,
        {
          module,
          entity: "ingredients",
          value: ingredientsWithCounter,
        },
        {
          root: true,
        }
      );
    },
    async fetchSauces({ commit }) {
      const getSauces = pizza.sauces;

      commit(
        SET_ENTITY,
        {
          module,
          entity: "sauces",
          value: getSauces,
        },
        {
          root: true,
        }
      );
    },
    async fetchSizes({ commit }) {
      const getSizes = pizza.sizes;

      commit(
        SET_ENTITY,
        {
          module,
          entity: "sizes",
          value: getSizes,
        },
        {
          root: true,
        }
      );
    },
    addToCart({ state, commit, getters }) {
      const pizza = {
        ...state.pizza,
        id: uniqueId(),
        filling: getters.filling,
        price: getters.pizzaPrice,
      };

      commit(
        ADD_ENTITY,
        {
          module: "Cart",
          entity: "pizzas",
          value: pizza,
        },
        {
          root: true,
        }
      );
      commit(RESET_STATE);
    },
  },
};
