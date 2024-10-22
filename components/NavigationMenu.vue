<template>
  <div
    class="app-navigation bg-black/75 md:bg-none left-0 md:left-auto right-0 md:right-auto top-0 md:top-auto p-10 md:p-0"
  >
    <UButton class="app-navigation--button" @click="menuHidden = !menuHidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
    </UButton>
    <UVerticalNavigation
      :links="data"
      class="app-navigation--content w-[250px] md:w-auto md:block"
      :class="{ hidden: menuHidden }"
      @click="menuClick"
    />
  </div>
</template>
<script lang="ts" setup>
import { useAsyncData } from "#app";

const { data } = await useAsyncData(async () => {
  const { data } = await useFetch("/api/codes");
  return data.value?.map(({ id, label }) => ({ label, to: `/${id}` }));
});

const menuClick = () => (menuHidden.value = true);

const menuHidden = ref(true);
</script>
<style lang="scss" scoped>
.app-navigation--button {
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
}
</style>
