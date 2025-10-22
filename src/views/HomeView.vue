<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia'
import api from '@/services/api'
import PostCard from '@/components/PostCard.vue';
import { handleAxiosError } from '@/utils'
import type { IPostListItem } from '@/types/post';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { isAuthorized } = storeToRefs(userStore)

const posts = ref<IPostListItem[] | []>([]);

const getStories = async (): Promise<void> => {
  try {
    const resp = await api.get("/posts");
    const data = await resp.data;
    posts.value = data;
  } catch (err) {
    handleAxiosError(err);
    posts.value = []
  }
};

onMounted(getStories);
</script>

<template>
  <main>
    <div class="container">
      <section class="posts">
        <ul class="posts__list">
          <li class="posts__item" v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </li>
        </ul>
        <button class="btn btn--primary posts__btn" type="button" v-if="isAuthorized">Добавить мое
          путешествие</button>
      </section>
    </div>
  </main>
</template>
