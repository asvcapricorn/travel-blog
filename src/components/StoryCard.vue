<script setup lang="ts">
import type { IStory } from '../types/story'

defineProps<{
  story: IStory | null
}>();

</script>

<template>
  <div class="story">
    <img class="story__image" :src="story?.photo" height="288" width="370" alt="Фото истории" v-if="story.photo" />
    <!-- <svg class="story__icon-default" width="16" height="16" aria-hidden="true" v-else>
      <use xlink:href="@/assets/images/sprite.svg#icon-story"></use>
    </svg> -->
    <div class="story__content">
      <h2 class="story__title">{{ story?.title }}</h2>
      <p class="story__excerpt">{{ story?.excerpt }}</p>
      <span class="story__place">{{ story?.title }}</span>
      <RouterLink class="story__link" :to="`/story/${story?.id}`">Подробнее</RouterLink>
    </div>
  </div>
</template>
