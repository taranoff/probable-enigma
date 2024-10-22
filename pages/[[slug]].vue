<template>
  <div class="container">
    <div v-if="showErrorMessage">Error occurred</div>
    <div v-else class="flex flex-col gap-3">
      <div
        class="content flex md:flex-row flex-col-reverse justify-start gap-3"
      >
        <div class="flex flex-1 flex-col gap-3">
          <SkeletonLabel
            :value="state.currentCocktail?.strDrink"
            :skeleton="showSkeleton"
            tag="h1"
          />

          <SkeletonLabel
            :value="state.currentCocktail?.strCategory"
            :skeleton="showSkeleton"
          />

          <SkeletonLabel
            :value="state.currentCocktail?.strAlcoholic"
            :skeleton="showSkeleton"
          />

          <SkeletonLabel
            :value="state.currentCocktail?.strGlass"
            :skeleton="showSkeleton"
          />

          <SkeletonLabel value="Instructions:" :skeleton="showSkeleton" />

          <SkeletonLabel
            :value="state.currentCocktail?.strInstructions"
            :skeleton="showSkeleton"
          />
        </div>
        <div class="flex justify-center align-middle">
          <NuxtImg :src="imgSrc" loading="lazy" class="md:w-[250px] w-3/4" />
        </div>
      </div>
      <CocktailIngredients
        :items="store.currentCocktailIngredients"
        :skeleton="showSkeleton"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCocktailStore } from "~/stores/useCocktailStore";
import CocktailIngredients from "~/components/CocktailIngredients.vue";

const store = useCocktailStore();
const state = store.state;
const route = useRoute();
const showSkeleton = computed(
  () => !!~["pending", "idle"].indexOf(state.loadingState),
);
// const showContent = computed(() => state.loadingState === "success");
const showErrorMessage = computed(() => state.loadingState === "error");
const imgSrc = computed<string | undefined>(() =>
  state.currentCocktail?.strDrinkThumb === null
    ? undefined
    : state.currentCocktail?.strDrinkThumb,
);

useAsyncData(
  "cocktail-data",
  async () => {
    if (route.params.slug)
      await store.fetchCocktail(route.params.slug as string);
    return state.currentCocktail || null;
  },
  { lazy: true },
);

definePageMeta({
  middleware: ["redirect"],
});
</script>
<style lang="scss" scoped>
.content {
  min-width: 200px;
}
</style>
