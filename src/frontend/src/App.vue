<template>
  <div id="app">
    <app-layout :cart-items="cartItems">
      <router-view @cartItem="addCartItems" />
    </app-layout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
export default {
  name: "App",
  components: { AppLayout },
  data: () => ({ cartItems: [] }),
  methods: {
    addCartItems(e) {
      this.cartItems = [...e];
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
