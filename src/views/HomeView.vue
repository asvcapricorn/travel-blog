<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import api from '@/services/api'
import StoryCard from '@/components/StoryCard.vue';
import { handleAxiosError } from '@/utils'
import type { IStory } from '@/types/story';


const stories = ref<IStory[] | []>([]);

const mockDataList: IStory[] | [] = [
  {
    "id": 1,
    "title": "Заголовок поста",
    "excerpt": "Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи из постаВыдержкаи из постаВыдержкаи из постаВыдержкаи из постаВыдержкаи из постаВыдержкаи из постаВыдержкаи из постаВыдержкаи из постаВыдержкаи из постаВыдержкаи из постаВыдержкаи из поста",
    "photo": "/src/mock-img.jpg",
    "place": "Заголовок поста"
  },
  {
    "id": 2,
    "title": "Заголовок поста",
    "excerpt": "Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи из постаВыдержкаи из постаВыдержкаи из поста",
    "place": "Заголовок поста"
  },
  {
    "id": 3,
    "title": "Заголовок поста Заголовок поста Заголовок поста",
    "excerpt": "Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи из поста Выдержкаи Выдержкаи из поста Выдержкаи из поста",
    "photo": "/src/mock-img.jpg",
    "place": "Заголовок поста"
  },
  {
    "id": 4,
    "title": "Заголовок поста",
    "excerpt": "Выдержка и из поста Выдержкаи из постаВыдержкаи из поста Выдержкаи из поста Выдержкаи из поста",
    "photo": "/src/mock-img.jpg",
    "place": "Заголовок поста"
  }
]

const getStories = async (): Promise<void> => {
  try {
    // const resp = await api.get("/posts");
    // const data = await resp.data;
    // stories.value = data
    stories.value = mockDataList;
  } catch (err) {
    handleAxiosError(err);
    stories.value = []
  }
};

onMounted(getStories);
</script>

<template>
  <main>
    <div class="container">
      <section class="stories">
        <ul class="stories__list">
          <li class="stories__item" v-for="story in stories" :key="story.id">
            <StoryCard :story="story" />
          </li>
        </ul>
        <button class="btn btn--primary stories__btn" type="button">Добавить мое путешествие</button>
      </section>
    </div>
  </main>
</template>
