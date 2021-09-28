<template>
  <main class="app-layout-main">
    <app-layout-header :cart-items="cartItems" />
    <slot />
  </main>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutMain",
  components: { AppLayoutHeader },
  props: {
    cartItems: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
