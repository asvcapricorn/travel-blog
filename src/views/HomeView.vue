<script setup lang="ts">
import { onMounted } from 'vue';
import api from '@/services/api'
import StoryCard from './StoryCard.vue';
import { handleAxiosError } from '@/utils'
import type { IStory } from '../types/story';


interface IResponseStories {
  stories: IStory[]
}

const getStories = async (): Promise<IResponseStories> => {
  try {
    const resp = await api.get("/posts");
    const stories = await resp.data;

    return {
      stories: stories
    }
  } catch (err) {
    handleAxiosError(err);
    return {
      stories: []
    }
  }
};

onMounted(getStories);
</script>

<template>
  <main>
    <ul class="stories">
      <li class="stories__item" v-for="story in getStories()" :key="story.id">
        <StoryCard :story="story" />
      </li>
    </ul>
  </main>
</template>
