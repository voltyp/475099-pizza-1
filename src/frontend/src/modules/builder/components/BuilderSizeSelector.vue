<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.name"
          :class="['diameter__input', classSize(size.multiplier)]"
        >
          <radio-button
            name="diameter"
            :value="size.name"
            :checked="size.name === sizeName"
            @change="selectSize({ size })"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

import { mapMutations, mapState } from "vuex";

import { module } from "@/store/modules/builder.store";
import { UPDATE_PIZZA_PARAMS } from "@/store/mutation-types";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  methods: {
    ...mapMutations(module, {
      selectSize: UPDATE_PIZZA_PARAMS,
    }),
    classSize(multiplier) {
      switch (multiplier) {
        case 1:
          return "diameter__input--small";
        case 2:
          return "diameter__input--normal";
        case 3:
          return "diameter__input--big";
      }
    },
  },
  computed: {
    ...mapState(module, {
      sizes: "sizes",
      sizeName: (state) => state.pizza.size.name,
    }),
  },
};
</script>
