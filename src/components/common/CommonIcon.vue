<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps<{
  iconName: string
  fill?: string
  stroke?: string
  width?: string
  height?: string
  bcg?: string
}>()

const iconComponent = defineAsyncComponent(
  () => import(`@/components/icons/${props.iconName}.vue`)
)
</script>

<template>
  <component :is="iconComponent" :fill="fill" :stroke="stroke" :width="width" :height="height" :bcg="bcg" />
</template>
