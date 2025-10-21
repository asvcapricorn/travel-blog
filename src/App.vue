<script setup lang="ts">
import AppHeader from './components/AppHeader.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const isHomePage = computed(() => route.name === 'home');

</script>

<template>
  <AppHeader :home-page=isHomePage />
  <RouterView />
</template>
