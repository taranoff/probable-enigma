<template>
  <div class="app-layout flex flex-col md:flex-row justify-stretch p-10 gap-3">
    <NavigationMenu
      class="app-layout--nav md:w-1/6 w-auto md:relative absolute"
    />
    <div class="app-layout--content md:w-5/6 md:pt-0 pt-24">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import NavigationMenu from "~/components/NavigationMenu.vue";
</script>
<style lang="scss">
.app-layout {
  max-width: 1024px;
  margin: 0 auto;

  &--nav {
  }

  &--content {
  }
}
</style>
