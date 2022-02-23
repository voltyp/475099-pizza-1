<template>
  <div class="app-layout-main">
    <app-layout-header />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";
export default {
  name: "AppLayoutMain",
  components: { AppLayoutHeader },
};
</script>

<style lang="scss">
.app-layout-main {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
