<template>
  <header class="header">
    <div class="header__logo">
      <a href="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="/">{{ totalPrice }} ₽</a>
    </div>
    <div class="header__user">
      <a href="#" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayout",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((acc, pizza) => pizza.totalPrice + acc, 0);
    },
  },
};
</script>
