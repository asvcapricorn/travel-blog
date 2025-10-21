<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import type { IPost } from '../types/post'
import { handleAxiosError } from '@/utils'
import PostComment from '@/components/PostComment.vue';
import CommonIcon from '@/components/common/CommonIcon.vue'

const route = useRoute();
console.log(route.params.postId);

const post = ref<IPost | null>(null);

const mockData: IPost = {
  "id": 1,
  "title": "Заголовок поста",
  "description": "Тело поста тело поста тело поста тело поста тело поста тело поста тело поста...",
  "country": "Россия",
  "city": "Москва",
  "photo": "/src/mock-img.jpg",
  "comments": [
    {
      "author_name": "Фамилия Имя Отчество",
      "comment": "Комментарии к посту комментарии к посту комментарии к посту комментарии к посту комментарии к посту  ",
      "created_at": "2024-07-22T10:16:16.000000Z"
    }
  ],
  "userInfo": {
    "full_name": "Author Full Name",
    "city": "Сочи",
    "bio": "Информация об авторе поста"
  }
};

const getPost = async (postId: string): Promise<void> => {
  try {
    // const resp = await api.get(`/movie/${postId}`);
    // post.value = await resp.data;
    post.value = mockData;
  } catch (err) {
    handleAxiosError(err)
  }
};


onMounted(() => {
  getPost(route.params.postId as string);
});

</script>

<template>
  <main>
    <section class="post">
      <div class="container">
        <div class="post__wrapper">
          <img class="post__image" :src="post?.photo" height="450" width="1172" alt="Фото истории" v-if="post?.photo" />
          <div class="post__content">
            <h2 class="post__title">{{ post?.title }}</h2>
            <p class="post__description">{{ post?.description }}</p>
            <ul class="post__comments">
              <li class="posts__comments-item" v-for="comment in post?.comments" :key="comment.created_at">
                <PostComment :comment="comment" />
              </li>
            </ul>
          </div>
          <div class="post__buttons">
            <button class="btn btn--secondary" type="button">
              <CommonIcon class="post-card__image" iconName="IconBack" />
              <span class="btn__text">Назад</span>
            </button>
            <button class="btn btn--primary" type="button">Ваше впечатление об этом месте</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
