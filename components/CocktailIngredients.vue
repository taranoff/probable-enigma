<template>
  <div v-if="props.items" class="ingredients-container flex flex-col gap-3">
    <SkeletonLabel value="List of ingredients:" :skeleton="props.skeleton" />

    <div class="ingredients-list gap-1.5">
      <template v-for="item in props.items" :key="item.id">
        <div class="ingredients-list--item-label">
          <SkeletonLabel :value="item.ingredient" :skeleton="props.skeleton" />
        </div>
        <div class="ingredients-list--item-value">
          <SkeletonLabel :value="item.measure" :skeleton="props.skeleton" />
        </div>
      </template>
    </div>
  </div>
  <div v-else>Ingredients are unknown</div>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    items: TIngredient[] | undefined;
    skeleton: boolean;
  }>(),
  { skeleton: false },
);
</script>
<style>
.ingredients-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
