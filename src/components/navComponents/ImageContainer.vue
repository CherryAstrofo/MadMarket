<script setup lang="ts">
import HoverImageCard from '../ui/hover-image-card/HoverImageCard.vue';

import person1 from '@/img/photo/person1.jpg';
import person2 from '@/img/photo/person2.jpg';
import person3 from '@/img/photo/person3.jpg';

const images = [
  { url: person1, title: 'About Us' },
  { url: person2, title: 'Insights' },
  { url: person3, title: 'Contact' },
];
</script>

<template>
<div class="image-container">
  <HoverImageCard
    v-for="(img, index) in images"
    :key="index"
    :image-url="img.url"
    :title="img.title"
  />
</div>
</template>

<style scoped>
.image-container {
  display: flex;
  gap: 16px;
  align-items: center; /* 纵向居中 */
  justify-content: center;
  flex-wrap: nowrap;   /* 不换行 */
}
</style>