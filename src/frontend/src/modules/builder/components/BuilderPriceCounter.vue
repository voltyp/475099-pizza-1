<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      :class="['button', disable ? 'button--disabled' : '']"
      :disabled="disable"
      @click="$emit('addToCart')"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {
      type: Number,
      required: true,
    },
    disable: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
