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
      <router-link v-if="isLogin" :to="{ name: 'Login' }" class="header__login">
        <span>Войти</span>
      </router-link>

      <template v-else>
        <router-link :to="{ name: 'Profile' }">
          <picture>
            <source
              type="image/webp"
              srcset="
                @/assets/img/users/user5.webp    1x,
                @/assets/img/users/user5@2x.webp 2x
              "
            />
            <img
              src="@/assets/img/users/user5.jpg"
              srcset="@/assets/img/users/user5@2x.jpg"
              alt="Василий Ложкин"
              width="32"
              height="32"
            />
          </picture>
          <span>Василий Ложкин</span>
        </router-link>
        <a href="#" @click="isLogin = !isLogin" class="header__logout">
          <span>Выйти</span>
        </a>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeader",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    isLogin: false,
  }),
  computed: {
    totalPrice() {
      return this.cartItems.reduce((acc, pizza) => pizza.totalPrice + acc, 0);
    },
  },
};
</script>
