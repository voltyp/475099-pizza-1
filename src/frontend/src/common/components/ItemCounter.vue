<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="decrement"
      :disabled="value <= 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input :value="value" type="text" :name="name" class="counter__input" />

    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="increment"
      :disabled="value >= 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    name: String,
    value: Number,
  },
  methods: {
    increment() {
      this.$emit("input", this.value + 1);
    },
    decrement() {
      this.$emit("input", this.value - 1);
    },
  },
};
</script>

<style scoped></style>
