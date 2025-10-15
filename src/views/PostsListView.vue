<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import MovieCard from '@/components/MovieCard.vue';
import type { IMovie } from '../types/movie';
import { handleAxiosError } from '@/utils'

const route = useRoute();
const movie = ref<IMovie | null>(null);
const getMovie = async (movieId: string): Promise<void> => {
  try {
    const resp = await api.get(`/movie/${movieId}`);
    movie.value = await resp.data;
  } catch (err) {
    handleAxiosError(err)
  }
};


onMounted(() => {
  getMovie(route.params.movieId as string);
});

watch(() => route.params.movieId, (newId) => {
  getMovie(newId as string);
});

</script>

<template>
  <main>
    <section class="movie-view">
      <h1 class="visually-hidden">Страница фильма</h1>
      <div class="container">
        <div class="movie-view__wrapper">
          <MovieCard class="movie-card--view" :movie=movie />
          <div class="movie-view__about">
            <h2 class="movie-view__title">О фильме</h2>
            <div class="movie-view__info">
              <div class="movie-view__row">
                <div class="movie-view__content">
                  <span class="movie-view__label">Язык оригинала</span>
                  <span class="movie-view__dots"></span>
                </div>
                <span class="movie-view__value">{{ movie?.language }}</span>
              </div>
              <div class="movie-view__row">
                <div class="movie-view__content">
                  <span class="movie-view__label">Бюджет</span>
                  <span class="movie-view__dots"></span>
                </div>
                <span class="movie-view__value"> {{ movie?.budget ? `$ ${movie.budget}` : '' }}</span>
              </div>
              <div class="movie-view__row">
                <div class="movie-view__content">
                  <span class="movie-view__label">Выручка</span>
                  <span class="movie-view__dots"></span>
                </div>
                <span class="movie-view__value">{{ movie?.revenue ? `$ ${movie.revenue}` : '' }}</span>
              </div>
              <div class="movie-view__row">
                <div class="movie-view__content">
                  <span class="movie-view__label">Режиссёр</span>
                  <span class="movie-view__dots"></span>
                </div>
                <span class="movie-view__value">{{ movie?.director }}</span>
              </div>
              <div class="movie-view__row">
                <div class="movie-view__content">
                  <span class="movie-view__label">Продакшен</span>
                  <span class="movie-view__dots"></span>
                </div>
                <span class="movie-view__value">{{ movie?.production }}</span>
              </div>
              <div class="movie-view__row">
                <div class="movie-view__content">
                  <span class="movie-view__label">Награды</span>
                  <span class="movie-view__dots"></span>
                </div>
                <span class="movie-view__value">{{ movie?.awardsSummary }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
