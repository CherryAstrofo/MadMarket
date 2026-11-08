<template>
    <div class="location-point" :style="{ left: x + '%', top: y + '%' }" @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave">
        <div class="point-dot"></div>
        <div class="point-label" :class="{ 'show': isHovered }">
            <span class="label-text">{{ cityName }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
    x: number // 横坐标位置（百分比 0-100）
    y: number // 纵坐标位置（百分比 0-100）
    cityName: string // 城市名称
}

const props = defineProps<Props>()

const emit = defineEmits<{
    hover: [isHovering: boolean]
}>()

const isHovered = ref(false)

const handleMouseEnter = () => {
    isHovered.value = true
    emit('hover', true)
}

const handleMouseLeave = () => {
    isHovered.value = false
    emit('hover', false)
}
</script>

<style scoped>
.location-point {
    position: absolute;
    z-index: 10;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: z-index 0s step-end;
}

/* 添加透明的扩大 hover 区域 */
.location-point::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    /* 固定的 hover 区域大小 */
    height: 40px;
    border-radius: 50%;
    z-index: 1;
    /* 可选：调试时显示区域 */
    /* background-color: rgba(255, 0, 0, 0.2); */
}

/* Hover 状态下提高整个组件的 z-index */
.location-point:hover {
    z-index: 100;
    transition: z-index 0s step-start;
}

.point-dot {
    width: 20px;
    height: 20px;
    background-color: #2BA0FF;
    border-radius: 50%;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
}

.location-point:hover .point-dot {
    width: 12px;
    height: 12px;
    background-color: #2BA0FF;
    z-index: 4;
}

.point-label {
    position: absolute;
    top: 50%;
    left: -50%;
    transform: translateY(-50%);
    background-color: #ffffff;
    color: #333333;
    padding: 12px 20px 12px 28px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    pointer-events: none;
    text-align: right;
    z-index: 3;
}

.point-label.show {
    opacity: 1;
    visibility: visible;
}

/* 文字动画 */
.label-text {
    display: inline-block;
    opacity: 0;
    transform: translateX(-15px);
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.point-label.show .label-text {
    opacity: 1;
    transform: translateX(0);
}

/* 移除虚化效果和箭头 */
.point-label::before,
.point-label::after {
    display: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .point-label {
        padding: 10px 16px 10px 20px;
        font-size: 12px;
        left: -40%;
    }
}
</style>