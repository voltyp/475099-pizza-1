<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        :value="pizza.name"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        @input="handlerPizzaName"
      />
    </label>

    <div class="content__constructor">
      <app-drop @drop="addIngredient">
        <div :class="['pizza', cssClassForPizza]">
          <div class="pizza__wrapper">
            <div
              v-for="ingredient in filling"
              :key="ingredient.key"
              :class="[
                'pizza__filling',
                `pizza__filling--${ingredient.className}`,
                getRepeatClass(ingredient),
              ]"
            ></div>
          </div>
        </div>
      </app-drop>
    </div>

    <builder-price-counter
      @addToCart="addToCart"
      :disable="isDisableBtnAddToCart"
      :price="pizzaPrice"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/drag-and-drop/AppDrop";

import { module } from "@/store/modules/builder.store";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { UPDATE_INGREDIENT, UPDATE_PIZZA_PARAMS } from "@/store/mutation-types";
import { debounce } from "lodash/function";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop, BuilderPriceCounter },
  methods: {
    ...mapActions(module, ["addToCart"]),
    ...mapMutations(module, {
      setPizzaName: UPDATE_PIZZA_PARAMS,
      updateIngredient: UPDATE_INGREDIENT,
    }),
    handlerPizzaName: debounce(function (event) {
      this.setPizzaName({ name: event.target.value });
    }, 300),
    addIngredient({ name: ingredientName, quantity }) {
      this.updateIngredient({ ingredientName, quantity: quantity + 1 });
    },
    getRepeatClass(ingredient) {
      switch (ingredient.count) {
        case 2:
          return "pizza__filling--second";
        case 3:
          return "pizza__filling--third";
        default:
          return "";
      }
    },
  },
  computed: {
    ...mapGetters(module, [
      "cssClassForPizza",
      "filling",
      "isDisableBtnAddToCart",
      "pizzaPrice",
    ]),
    ...mapState(module, ["pizza"]),
  },
};
</script>
