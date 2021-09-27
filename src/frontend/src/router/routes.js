export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/Orders.vue",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../views/Profile"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
];
