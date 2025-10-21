<script setup lang="ts">
import type { IPostListItem } from '../types/post'
import CommonIcon from '@/components/common/CommonIcon.vue'

defineProps<{
  post: IPostListItem | null
}>();

</script>

<template>
  <div class="post-card">
    <div class="post-card__img-container">
      <img class="post-card__image" :src="post?.photo" height="288" width="370" alt="Фото истории" v-if="post?.photo" />
      <CommonIcon class="post-card__image" iconName="IconPhotoDefault" v-else />
    </div>
    <div class="post-card__content">
      <div class="post-card__content-top">
        <h2 class="post-card__title">{{ post?.title }}</h2>
        <p class="post-card__excerpt">{{ post?.excerpt }}</p>
      </div>
      <div class="post-card__content-bottom">
        <span class="post-card__place">{{ post?.place }}</span>
        <RouterLink class="post-card__link" :to="`/post/${post?.id}`">Подробнее</RouterLink>
      </div>
    </div>
  </div>
</template>
