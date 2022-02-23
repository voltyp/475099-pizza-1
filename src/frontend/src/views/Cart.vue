<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container" style="height: 100%">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="pizzas.length === 0">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <cart-product-list :pizzas="pizzas" />

          <cart-additional-list />

          <cart-form />
        </template>
      </div>
    </main>

    <cart-footer />
  </form>
</template>

<script>
import CartProductList from "../modules/cart/components/CartProductList";
import CartAdditionalList from "../modules/cart/components/CartAdditionalList";
import CartForm from "../modules/cart/components/CartForm";

import { mapState } from "vuex";
import { module } from "@/store/modules/cart.store";
import CartFooter from "../modules/cart/components/CartFooter";

export default {
  name: "CartVue",
  components: { CartFooter, CartForm, CartAdditionalList, CartProductList },
  computed: {
    ...mapState(module, ["pizzas"]),
  },
};
</script>

<style scoped></style>
