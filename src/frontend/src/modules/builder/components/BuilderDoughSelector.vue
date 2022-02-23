<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="item in dough"
          :key="item.name"
          :class="['dough__input', classDough(item.name)]"
        >
          <radio-button
            name="dough"
            :value="item.name"
            :checked="item.name === doughName"
            @change="selectDough({ dough: item })"
          />

          <b>{{ item.name }}</b>
          <span>{{ item.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

import { mapMutations, mapState } from "vuex";

import { UPDATE_PIZZA_PARAMS } from "@/store/mutation-types";
import { module } from "@/store/modules/builder.store";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  methods: {
    ...mapMutations(module, {
      selectDough: UPDATE_PIZZA_PARAMS,
    }),
    classDough(type) {
      return type.includes("Тонкое")
        ? "dough__input--light"
        : "dough__input--large";
    },
  },
  computed: {
    ...mapState(module, {
      dough: "dough",
      doughName: (state) => state.pizza.dough.name,
    }),
  },
};
</script>
