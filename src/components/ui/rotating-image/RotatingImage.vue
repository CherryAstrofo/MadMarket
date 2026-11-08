<template>
    <div class="tilt-image-card-wrapper" ref="cardWrapperRef">
        <div class="tilt-image-card" ref="cardRef">
            <img :src="imageSrc" :alt="imageAlt" class="card-image" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// Props 定义
interface TiltImageCardProps {
    /** 图片路径 */
    imageSrc: string;
    /** 图片描述（用于无障碍） */
    imageAlt?: string;
    /** 倾斜方向：left 向左倾斜，right 向右倾斜 */
    direction?: 'left' | 'right';
    /** 初始倾斜角度（度） */
    tiltAngle?: number;
    /** 初始Y轴偏移（像素） */
    initialYOffset?: number;
    /** 触发动画的位置 */
    triggerStart?: string;
}

const props = withDefaults(defineProps<TiltImageCardProps>(), {
    imageAlt: 'Image card',
    direction: 'left',
    tiltAngle: 12,
    initialYOffset: 100,
    triggerStart: 'top 80%',
});

// Refs
const cardWrapperRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);

// 计算倾斜角度
const getTiltAngle = () => {
    return props.direction === 'left' ? -Math.abs(props.tiltAngle) : Math.abs(props.tiltAngle);
};

// GSAP ScrollTrigger 实例
let scrollTrigger: ScrollTrigger | null = null;

// 初始化动画
const initAnimation = () => {
    if (!cardRef.value || !cardWrapperRef.value) return;

    // 清理旧动画
    if (scrollTrigger) {
        scrollTrigger.kill();
    }

    // 设置初始状态
    gsap.set(cardRef.value, {
        y: props.initialYOffset,
        rotation: getTiltAngle(),
        transformOrigin: 'center center',
    });

    // 创建滚动动画
    const animation = gsap.to(cardRef.value, {
        y: 0,
        rotation: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: cardWrapperRef.value,
            start: props.triggerStart,
            end: 'top 20%',
            scrub: 1,
        },
    });

    scrollTrigger = animation.scrollTrigger as ScrollTrigger;
};

// 监听属性变化
watch(
    () => [props.direction, props.tiltAngle, props.initialYOffset, props.triggerStart],
    () => {
        initAnimation();
    },
    { deep: true }
);

onMounted(() => {
    initAnimation();
});

onUnmounted(() => {
    if (scrollTrigger) {
        scrollTrigger.kill();
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style scoped>
.tilt-image-card-wrapper {
    position: relative;
    width: 650px;
    height: 425px;
}

.tilt-image-card {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    overflow: hidden;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

/* 响应式调整 */
@media (max-width: 1200px) {
    .tilt-image-card-wrapper {
        width: 200px;
        height: 280px;
    }
}

@media (max-width: 768px) {
    .tilt-image-card-wrapper {
        width: 100%;
        max-width: 280px;
        height: auto;
        margin: 0 auto;
    }

    .tilt-image-card {
        aspect-ratio: 3/4;
    }
}
</style>