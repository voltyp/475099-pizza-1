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
            @change="$emit('input', item)"
            :value="item.name"
            :checked="item.name === checked"
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
export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  props: {
    dough: {
      type: Array,
      required: true,
    },
    checked: {
      type: String,
      required: true,
    },
  },
  methods: {
    classDough(type) {
      return type.includes("Тонкое")
        ? "dough__input--light"
        : "dough__input--large";
    },
  },
};
</script>
