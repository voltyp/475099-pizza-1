<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        @input="$emit('input', $event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <app-drop @drop="addIngredient">
        <div :class="['pizza', typeDough]">
          <div class="pizza__wrapper">
            <div
              v-for="ingredient in filling"
              :key="ingredient.key"
              :class="[
                'pizza__filling',
                `pizza__filling--${ingredient.key}`,
                getRepeatClass(ingredient),
              ]"
            ></div>
          </div>
        </div>
      </app-drop>
    </div>

    <builder-price-counter
      @addToCart="$emit('addToCart')"
      :disable="isDisable"
      :price="totalPrice"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/drag-and-drop/AppDrop";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop, BuilderPriceCounter },
  props: {
    typeDough: {
      type: String,
      required: true,
    },
    filling: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isDisable: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    addIngredient(event) {
      this.$emit("addedIngredient", event);
    },
    getRepeatClass(ingredient) {
      switch (ingredient.count) {
        case 1:
          return "pizza__filling--second";
        case 2:
          return "pizza__filling--third";
        default:
          return "";
      }
    },
    test() {
      console.log("tett");
    },
  },
};
</script>
