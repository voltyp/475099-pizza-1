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
              @change="$emit('input', sauce)"
              :checked="sauce.name === checked"
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
                :disable="ingredient.count < 3"
              >
                <span :class="['filling', `${ingredient.class}`]">
                  {{ ingredient.name }}
                </span>
              </app-drag>

              <item-counter
                v-model="ingredient.count"
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

export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter, RadioButton, AppDrag },
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    checked: {
      type: String,
    },
  },
  methods: {},
};
</script>
