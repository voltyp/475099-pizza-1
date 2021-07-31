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
            @change="$emit('input', size)"
            :value="size.name"
            :checked="size.name === checked"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    checked: {
      type: String,
      required: true,
    },
  },
  methods: {
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
};
</script>
