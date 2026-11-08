<script setup lang="ts">
import { ref } from 'vue';
import InteractiveButton from '../ui/interactive-button/InteractiveButton.vue';
import RiveAnimation from '../ui/rive-animation/RiveAnimation.vue';

import gamerAnimationUrl from '@/assets/lottie/gamer.riv?url';
import scientistAnimationUrl from '@/assets/lottie/scientist.riv?url';

const isHovered = ref(false);

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};
</script>

<template>
    <div class="navigation-card">
        <div class="title">Explore the Sectors<br>We Specialize In.</div>

        <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <InteractiveButton text="Industry Sectors" buttonBackground="#2BA0FF" circleBackground="#ffffff"
                to="/industry" />
        </div>

        <RiveAnimation :src="gamerAnimationUrl" class="gamer-animation" :class="{ 'gamer-visible': isHovered }" />
        <RiveAnimation :src="scientistAnimationUrl" class="scientist-animation"
            :class="{ 'scientist-visible': isHovered }" />
    </div>
</template>

<style scoped>
.navigation-card {
    width: 100%;
    height: 80vh;
    border-radius: 4rem;
    background-color: #F5F1E4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.title {
    font-size: 3.2rem;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
    letter-spacing: -1px;
    z-index: 2;
}

.gamer-animation {
    width: 40rem;
    height: auto;
    position: absolute;
    transform: translateY(100%);
    bottom: -16rem;
    left: 0;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.gamer-visible {
    transform: translateY(0);
}

.scientist-animation {
    width: 42rem;
    height: auto;
    position: absolute;
    transform: translateX(100%);
    /* 改为正值，初始位置在右侧外部 */
    top: 0;
    right: -4.5rem;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.scientist-visible {
    transform: translateX(0);
    /* hover时回到正常位置 */
}
</style>