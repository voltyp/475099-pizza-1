<template>
  <input
    type="radio"
    :name="name"
    :value="value"
    @input="$emit('change', $event.target.value)"
    class="visually-hidden"
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
