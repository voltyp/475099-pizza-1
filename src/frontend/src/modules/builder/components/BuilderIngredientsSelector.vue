<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <label
            class="radio ingridients__input"
            v-for="sauce in sauces"
            :key="sauce.name"
          >
            <radio-button
              name="sauce"
              :value="sauce.name"
              @change="selectSauce({ sauce })"
              :checked="sauce.name === sauceName"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              class="ingridients__item"
              v-for="ingredient in ingredients"
              :key="ingredient.name"
            >
              <app-drag
                :transfer-data="ingredient"
                :disable="ingredient.quantity >= 3"
              >
                <span
                  :class="[
                    'filling',
                    `filling--${getImageName(ingredient.image)}`,
                  ]"
                >
                  {{ ingredient.name }}
                </span>
              </app-drag>

              <item-counter
                @input="updateIngredient"
                :value="ingredient.quantity"
                :name="ingredient.name"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDrag from "@/common/components/drag-and-drop/AppDrag";
import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";

import { mapMutations, mapState } from "vuex";
import { getImageName } from "@/common/helpers";
import { module } from "@/store/modules/builder.store";
import { UPDATE_PIZZA_PARAMS, UPDATE_INGREDIENT } from "@/store/mutation-types";

export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter, RadioButton, AppDrag },
  methods: {
    ...mapMutations(module, {
      selectSauce: UPDATE_PIZZA_PARAMS,
      updateIngredient: UPDATE_INGREDIENT,
    }),
    getImageName,
  },
  computed: {
    ...mapState(module, {
      sauces: "sauces",
      ingredients: "ingredients",
      sauceName: (state) => state.pizza.sauce.name,
    }),
  },
};
</script>
