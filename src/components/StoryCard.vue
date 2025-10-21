<script setup lang="ts">
import type { IStory } from '../types/story'
import CommonIcon from '@/components/common/CommonIcon.vue'

defineProps<{
  story: IStory | null
}>();

</script>

<template>
  <div class="story">
    <div class="story__img-container">
      <img class="story__image" :src="story?.photo" height="288" width="370" alt="Фото истории" v-if="story?.photo" />
      <CommonIcon class="story__image" iconName="IconPhotoDefault" v-else />
    </div>
    <div class="story__content">
      <div class="story__content-top">
        <h2 class="story__title">{{ story?.title }}</h2>
        <p class="story__excerpt">{{ story?.excerpt }}</p>
      </div>
      <div class="story__content-bottom">
        <span class="story__place">{{ story?.place }}</span>
        <RouterLink class="story__link" :to="`/story/${story?.id}`">Подробнее</RouterLink>
      </div>
    </div>
  </div>
</template>
