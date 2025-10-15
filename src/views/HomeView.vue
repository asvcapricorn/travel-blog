<script setup lang="ts">
import RandomMovie from '../components/RandomMovie.vue';
import TopMovies from '@/components/TopMovies.vue';
</script>

<template>
  <main>
    <div class="container">
      <h1 class="visually-hidden">Главная страница</h1>
      <RandomMovie />
      <TopMovies />
    </div>
  </main>
</template>
