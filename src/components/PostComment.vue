<script setup lang="ts">
import type { IComment } from '@/types/comment';

defineProps<{
  comment: IComment | null
}>();

</script>

<template>
  <div class="comment">
    <span class="comment__author">{{ comment?.author_name }}</span>
    <span class="comment__data">{{ comment?.created_at }}</span>
    <p class="comment__content">{{ comment?.comment }}</p>
  </div>
</template>
