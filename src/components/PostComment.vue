<script setup lang="ts">
import type { IComment } from '@/types/comment';

const props = defineProps<{
  comment: IComment | null
}>();

const dateTimeString = props.comment?.created_at;
const date = dateTimeString ? new Date(dateTimeString).toLocaleDateString() : '';

</script>

<template>
  <div class="comment">
    <span class="comment__author">{{ comment?.author_name }}</span>
    <span class="comment__date">{{ date }}</span>
    <p class="comment__content">{{ comment?.comment }}</p>
  </div>
</template>
