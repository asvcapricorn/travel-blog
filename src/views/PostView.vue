<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import type { IPost } from '../types/post'
import { handleAxiosError } from '@/utils'
import PostComment from '@/components/PostComment.vue';
import CommonIcon from '@/components/common/CommonIcon.vue';

const route = useRoute();
const post = ref<IPost | null>(null);

const getPost = async (postId: string): Promise<void> => {
  try {
    const resp = await api.get(`/posts/${postId}`);
    post.value = await resp.data;
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
          <img class="post__image" :src="`https://travelblog.skillbox.cc${post?.photo}`" height="450" width="1172"
            alt="Фото истории" v-if="post?.photo" />
          <div class="post__content">
            <h2 class="post__title">{{ post?.title }}</h2>
            <p class="post__description">{{ post?.description }}</p>
            <ul class="post__comments">
              <li class="posts__comments-item" v-for="comment in post?.comments" :key="comment.created_at">
                <PostComment :comment="comment" />
              </li>
            </ul>
            <div class="post__buttons">
              <RouterLink to="/" class="btn btn--secondary btn--with-icon post__back-btn" type="button">
                <CommonIcon iconName="IconBack" fill="var(--color-vivid-orange)" />
                <span class="btn__text">Назад</span>
              </RouterLink>
              <button class="btn btn--primary post__review-btn" type="button">Ваше впечатление об этом месте</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
