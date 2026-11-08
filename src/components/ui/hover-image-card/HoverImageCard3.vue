<template>
    <div class="card-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div class="text-container">
            <slot />
            <div class="read-more">
                <span class="read-text">Read</span>
                <ChevronRightIcon class="arrow-icon left-arrow" />
                <ChevronRightIcon class="arrow-icon right-arrow" />
            </div>
        </div>
        <div class="image-container">
            <img :src="imageSrc" :alt="imageAlt" class="hover-image" :class="{ 'is-hovered': isHovered }" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/24/solid';

defineProps<{
    imageSrc: string;
    imageAlt: string;
}>();

const isHovered = ref(false);

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};
</script>

<style scoped>
.card-wrapper {
    width: 400px;
    /* 从450px缩小到380px */
    height: 180px;
    /* 从280px缩小到240px */
    background: none;
    display: flex;
    flex-direction: row;
    cursor: pointer;
}

.text-container {
    background-color: #ffffff;
    border-radius: 1rem;
    /* 从1rem缩小 */
    width: 50%;
    padding: 1.25rem;
    /* 从1.5rem缩小 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 2;
}

/* 为插槽内容添加字体样式 */
.text-container :deep(p) {
    font-size: 1rem;
    /* 从0.95rem缩小 */
    font-weight: 600;
    line-height: 1.4;
    /* 从1.5缩小 */
    color: #4a4a4a;
    margin: 0;
}

.text-container :deep(h3) {
    font-size: 1.15rem;
    /* 从1.35rem缩小 */
    font-weight: 600;
    line-height: 1.3;
    color: #2c2c2c;
    margin: 0 0 0.65rem 0;
}

.text-container :deep(h4) {
    font-size: 1rem;
    /* 从1.15rem缩小 */
    font-weight: 600;
    line-height: 1.3;
    color: #333;
    margin: 0 0 0.45rem 0;
}

.text-container :deep(span) {
    font-size: 0.8rem;
    /* 从0.9rem缩小 */
    font-weight: 400;
    line-height: 1.4;
    color: #666;
}

/* Read more 区域 */
.read-more {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin-top: 0.85rem;
    /* 从1rem缩小 */
    position: relative;
    height: 20px;
    /* 从24px缩小 */
}

.read-text {
    font-size: 0.8rem;
    /* 从0.9rem缩小 */
    font-weight: 600;
    color: #2c2c2c;
    transition: transform 0.4s ease;
}

.arrow-icon {
    width: 16px;
    /* 从20px缩小 */
    height: 16px;
    /* 从20px缩小 */
    transition: all 0.4s ease;
    position: absolute;
}

.right-arrow {
    left: 42px;
    /* 从48px缩小 */
    opacity: 1;
    transform: translateX(0);
}

.left-arrow {
    left: 0;
    opacity: 0;
    transform: scale(0);
}

/* 悬停时 Read more 效果 */
.card-wrapper:hover .read-text {
    transform: translateX(20px);
    /* 从24px缩小 */
}

.card-wrapper:hover .right-arrow {
    opacity: 0;
    transform: scale(0);
}

.card-wrapper:hover .left-arrow {
    opacity: 1;
    transform: scale(1);
}

.image-container {
    border-radius: 1rem;
    /* 从1rem缩小 */
    width: 40%;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.hover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 图片悬停效果 */
.hover-image.is-hovered {
    transform: rotate(8deg) scale(1.15);
}

/* 响应式调整 */
@media (max-width: 768px) {
    .card-wrapper {
        width: 100%;
        height: 200px;
        /* 从240px缩小 */
    }

    .text-container :deep(p) {
        font-size: 0.75rem;
    }

    .text-container :deep(h3) {
        font-size: 1rem;
    }
}
</style>