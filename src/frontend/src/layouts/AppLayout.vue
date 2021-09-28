<template>
  <component :is="layout" :cart-items="cartItems">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  props: {
    cartItems: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    l() {
      console.log("3");
    },
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
