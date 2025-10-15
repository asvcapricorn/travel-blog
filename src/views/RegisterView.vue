<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import { GENRE_MAP } from '@/constants/genres';
import type { GenreKey } from '@/constants/genres';
import type { IMovie } from '../types/movie';
import MoviesList from '@/components/MoviesList.vue';
import { handleAxiosError } from '@/utils'

const route = useRoute();
const movies = ref<IMovie[]>([]);

const currentPage = ref(1);
const hasMore = ref(true);
const LIMIT = 10;

const getMovies = async (page: number = 1): Promise<void> => {
  if (!hasMore.value) return;
  try {
    const query = new URLSearchParams({
      count: String(15),
      page: String(page),
      genre: route.params.genre as string
    })
    const resp = await api.get(`/movie?${query}`);
    const newMovies = await resp.data;

    if (newMovies.length < LIMIT) {
      hasMore.value = false;
    }

    if (page === 1) {
      movies.value = newMovies;
    } else {
      movies.value.push(...newMovies);
    }

    currentPage.value = page;

  } catch (err) {
    handleAxiosError(err)
  }
};

const loadMore = () => {
  if (hasMore.value) {
    getMovies(currentPage.value + 1);
  }
};

const translatedGenre = computed(() => {
  if (route.params.genre) {
    const lowerTranslatedGenre = GENRE_MAP[route.params.genre as GenreKey]?.translation || route.params.genre as string;
    const upperFirstChar = lowerTranslatedGenre.charAt(0).toUpperCase();
    const restOfString = lowerTranslatedGenre.slice(1);
    return upperFirstChar + restOfString;
  }
  return '';
});

onMounted(() => {
  getMovies(1);
});

</script>

<template>
  <main>
    <section class="movies-by-genre">
      <div class="container">
        <div class="movies-by-genre__wrapper">
          <h1 class="visually-hidden">Фильмы по жанрам</h1>
          <RouterLink class="movies-by-genre__title" to="/genres">
            <svg class="movies-by-genre__title-icon" width="40" height="40" aria-hidden="true">
              <use xlink:href="@/assets/images/sprite.svg#icon-chevron"></use>
            </svg>
            <span class="movies-by-genre__title-text">{{ translatedGenre }}</span>
          </RouterLink>
          <MoviesList class="movies-by-genre__list" :movies="movies" :cardTop="false" />
          <button v-if="hasMore" class="movies-by-genre__btn btn btn--primary" type="button" @click="loadMore">
            Показать ещё
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
