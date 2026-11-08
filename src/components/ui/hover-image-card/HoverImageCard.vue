<script setup lang="ts">
import { ref } from "vue";

interface Props {
  imageUrl: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
});

const isHovered = ref(false);

function handleMouseEnter() {
  isHovered.value = true;
}

function handleMouseLeave() {
  isHovered.value = false;
}
</script>

<template>
  <div class="card-container" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="image-wrapper" :class="{ 'hovered': isHovered }">
      <img :src="imageUrl" alt="image" class="card-image" />
    </div>

    <div class="card-info">
      <div class="card-title">{{ title }}</div>
      <button class="card-button" :class="{ 'hovered-btn': isHovered }">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
          class="icon icon-tabler icons-tabler-filled icon-tabler-chevron-right">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M9.707 5.293l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1 -1.414 -1.414l5.293 -5.293l-5.293 -5.293a1 1 0 0 1 1.414 -1.414" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  position: relative;
  width: 32%;
  aspect-ratio: 4/5;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.4s ease;
}

.image-wrapper.hovered {
  transform: scale(1.1) rotate(3deg);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card-info {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
}

.card-title {
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  font-size: 1.3rem;
}

.card-button {
  pointer-events: auto;
  background-color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.card-button.hovered-btn {
  transform: scale(1.2);
  background-color: #e0e0e0;
}

.arrow {
  font-size: 20px;
  color: black;
  transition: transform 0.2s ease;
}

.card-button.hovered-btn .arrow {
  transform: translateX(2px);
  /* 鼠标 hover 时箭头微动 */
}
</style>