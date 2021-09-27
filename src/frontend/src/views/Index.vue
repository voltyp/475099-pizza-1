<template>
  <main>
    <app-layout-header :cart-items="cart" />
    <form class="content" action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <builder-dough-selector
          :dough="dough"
          v-model="paramsPizza.dough"
          :checked="paramsPizza.dough.name"
        />

        <builder-size-selector
          :sizes="sizes"
          v-model="paramsPizza.size"
          :checked="paramsPizza.size.name"
        />

        <builder-ingredients-selector
          :ingredients="ingredients"
          :sauces="sauces"
          :checked="paramsPizza.sauce.name"
          @ingredient-counter="changeCount"
          v-model="paramsPizza.sauce"
        />

        <builder-pizza-view
          :type-dough="typeDough"
          :filling="fillingPizza"
          :total-price="totalPrice"
          v-model="paramsPizza.name"
          :is-disable="isDisableBtn"
          @addedIngredient="dropIngredient"
          @addToCart="addToCart"
        />
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import { getImageName, getTypeDough } from "@/common/helpers";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "Index",
  components: {
    AppLayoutHeader,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  data: () => ({
    dough: pizza.dough,
    ingredients: pizza.ingredients.map((el) => ({
      ...el,
      key: getImageName(el.image),
      count: 0,
    })),
    sauces: pizza.sauces,
    sizes: pizza.sizes,

    paramsPizza: {
      dough: pizza.dough[0],
      sauce: pizza.sauces[0],
      size: pizza.sizes[0],
      name: "",
    },

    cart: [],
  }),
  computed: {
    typeDough() {
      return getTypeDough(
        this.paramsPizza.dough.name,
        this.paramsPizza.sauce.name
      );
    },
    fillingPizza() {
      return this.ingredients.filter((ingredient) => ingredient.count > 0);
    },
    totalPrice() {
      const sumIngredient = this.fillingPizza.reduce(
        (acc, ingredient) => ingredient.price * ingredient.count + acc,
        0
      );

      const { dough, sauce, size } = this.paramsPizza;

      return (sumIngredient + dough.price + sauce.price) * size.multiplier;
    },
    isDisableBtn() {
      return this.fillingPizza.length === 0 || this.paramsPizza.name === "";
    },
    pizza() {
      return {
        ingredients: this.fillingPizza,
        ...this.paramsPizza,
        totalPrice: this.totalPrice,
      };
    },
  },
  methods: {
    setDough(payload) {
      this.doughSelected = payload;
    },
    setSauce(payload) {
      this.sauceSelected = payload;
    },
    dropIngredient(event) {
      for (const ingredient of this.ingredients) {
        if (event.key === ingredient.key) {
          ingredient.count++;
          return;
        }
      }
    },
    addToCart() {
      this.cart.push(this.pizza);
    },
    changeCount(item) {
      for (const ingredient of this.ingredients) {
        if (ingredient.name === item.name) {
          ingredient.count = item.count;
          break;
        }
      }
    },
  },
};
</script>
