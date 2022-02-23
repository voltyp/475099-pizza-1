<template>
  <ul class="cart-list sheet">
    <li class="cart-list__item" v-for="pizza in pizzas" :key="pizza.id">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Капричоза"
        />
        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>{{ pizza.size.name }}, на {{ pizza.dough.name }} тесте</li>
            <li>Соус: {{ pizza.sauce.name }}</li>
            <li>{{ filling(pizza.filling) }}</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button type="button" class="counter__button counter__button--minus">
          <span class="visually-hidden">Меньше</span>
        </button>
        <input type="text" name="counter" class="counter__input" value="1" />
        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ pizza.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "CartProductList",
  props: {
    pizzas: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    console.log("pizzas", this.pizzas);
  },
  methods: {
    filling(filling) {
      return filling.map((ingredient) => ingredient.name).join(", ");
    },
  },
};
</script>
