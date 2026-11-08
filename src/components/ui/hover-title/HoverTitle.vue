<template>
    <div class="title-box">
        <div class="title">{{ title }}</div>
        <!-- 图片独立出来，不受父容器限制 -->
        <img v-if="imageSrc" :src="imageSrc" alt="preview" class="preview-image"
            :class="imageDirection === 'left' ? 'image-left' : 'image-right'" />
        <div class="right-content">
            <div class="arrow-wrapper">
                <!-- 默认状态的箭头（无背景） -->
                <svg class="arrow-icon default-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
                <!-- hover 状态的圆形背景容器 -->
                <div class="arrow-container">
                    <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface TitleBoxProps {
    title: string
    imageSrc?: string
    imageDirection?: 'left' | 'right'
}

withDefaults(defineProps<TitleBoxProps>(), {
    title: '标题',
    imageSrc: '',
    imageDirection: 'right'
})
</script>

<style scoped>
.title-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px;
    border-radius: 8px;
    background-color: transparent;
    transition: background-color 0.3s ease;
    cursor: pointer;
    max-width: 800px;
    overflow: visible;
}

/* 使用伪元素创建底部直线边框 */
.title-box::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: rgb(40, 40, 40);
}

/* hover 时背景变白，遮住下划线 */
.title-box:hover {
    background-color: #ffffff;
}

/* hover 时伪元素边框也被背景遮挡 */
.title-box:hover::after {
    background-color: transparent;
}

.title {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1a1a1a;
    z-index: 1;
    letter-spacing: -0.5px;
}

/* 右侧内容区域 */
.right-content {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 3;
}

/* 图片独立出来，绝对定位，浮于上层 */
.preview-image {
    position: absolute;
    right: 6rem;
    top: 50%;
    width: 150px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    opacity: 0;
    filter: blur(8px);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 2;
    pointer-events: none;
}

/* 默认向左旋转的图片 */
.image-left {
    transform: translateY(-50%) rotate(15deg) scale(0.5);
}

/* hover 时向左旋转的图片 */
.title-box:hover .image-left {
    transform: translateY(-50%) rotate(-10deg) scale(1);
    opacity: 1;
    filter: blur(0);
}

/* 默认向右旋转的图片 */
.image-right {
    transform: translateY(-50%) rotate(-15deg) scale(0.5);
}

/* hover 时向右旋转的图片 */
.title-box:hover .image-right {
    transform: translateY(-50%) rotate(10deg) scale(1);
    opacity: 1;
    filter: blur(0);
}

/* 箭头包装器 - 用于定位两个箭头重叠 */
.arrow-wrapper {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 默认箭头 - 始终显示，无背景 */
.default-arrow {
    position: absolute;
    width: 15px;
    height: 15px;
    color: #1a1a1a;
}

/* 箭头容器 - 默认缩小成一个点，hover 时放大成圆形 */
.arrow-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #F5F1E4;
    transform: scale(0);
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* hover 时容器放大成完整圆形 */
.title-box:hover .arrow-container {
    transform: scale(1);
}

.arrow-icon {
    width: 15px;
    height: 15px;
    color: #1a1a1a;
}
</style>