<script setup lang="ts">
import { ref } from "vue";

interface Props {
    imageUrl: string;
    tags: string[];
    description: string;
    width?: string;
    height?: string;
}

const props = withDefaults(defineProps<Props>(), {
    tags: () => [],
    description: "",
    width: "100%",
    height: "auto",
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
    <div class="card-container" :style="{ width: width, height: height }" @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <!-- 图片容器（固定形状，不随 hover 改变） -->
        <div class="image-container">
            <div class="image-wrapper" :class="{ 'hovered': isHovered }">
                <img :src="imageUrl" alt="image" class="card-image" />
            </div>

            <!-- 左上角标签 -->
            <div class="tags-container">
                <div v-for="(tag, index) in tags" :key="index" class="tag-pill">
                    {{ tag }}
                </div>
            </div>
        </div>

        <!-- 图片下方的介绍文字 -->
        <div class="card-description">
            {{ description }}
        </div>
    </div>
</template>

<style scoped>
.card-container {
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    background-color: transparent;
}

/* 固定形状的图片容器 */
.image-container {
    position: relative;
    width: 100%;
    flex: 1;
    border-radius: 20px;
    /* 四角圆角 */
    overflow: hidden;
}

/* 图片包装器（会缩放旋转的部分） */
.image-wrapper {
    width: 100%;
    height: 100%;
    transition: transform 0.4s ease;
    transform-origin: center;
    /* 从中心点缩放旋转 */
}

.image-wrapper.hovered {
    transform: scale(1.1) rotate(3deg);
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* 标签容器 - 固定在图片容器上 */
.tags-container {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    pointer-events: none;
    z-index: 2;
}

/* 药丸形标签 */
.tag-pill {
    background-color: rgba(255, 255, 255, 0.9);
    color: #333;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
    white-space: nowrap;
    pointer-events: auto;
}

/* 图片下方的介绍文字 */
.card-description {
    padding: 12px 4px;
    font-size: 1.2rem;
    color: #333;
    line-height: 1.4;
    background-color: transparent;
    text-align: left;
    font-weight: 600;
}
</style>