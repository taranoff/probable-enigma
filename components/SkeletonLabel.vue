<template>
  <USkeleton v-if="props.skeleton" class="h-6 w-[250px]" />
  <Component :is="props.tag" v-else>{{ props.value }}</Component>
</template>
<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";
const props = withDefaults(
  defineProps<{ value?: string; skeleton?: boolean; tag?: string }>(),
  { tag: "p", skeleton: false, value: "" },
);
</script>
