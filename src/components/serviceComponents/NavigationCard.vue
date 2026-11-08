<script setup lang="ts">
import { ref } from 'vue';
import InteractiveButton from '../ui/interactive-button/InteractiveButton.vue';
import RiveAnimation from '../ui/rive-animation/RiveAnimation.vue';

import composerAnimationUrl from '@/assets/lottie/composer.riv?url';
import trumpeter1AnimationUrl from '@/assets/lottie/trumpeter_1.riv?url';
import trumpeter2AnimationUrl from '@/assets/lottie/trumpeter_2.riv?url';

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
        <div class="title">Discover the tools we<br>use to get you there.</div>

        <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <InteractiveButton text="Methodology" buttonBackground="#F5E211" circleBackground="#ffffff" to="/method" />
        </div>

        <RiveAnimation :src="composerAnimationUrl" class="composer-animation"
            :class="{ 'composer-visible': isHovered }" />
        <RiveAnimation :src="trumpeter1AnimationUrl" class="trumpeter1-animation"
            :class="{ 'trumpeter-visible': isHovered }" />
        <RiveAnimation :src="trumpeter2AnimationUrl" class="trumpeter2-animation"
            :class="{ 'trumpeter-visible': isHovered }" />
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

.composer-animation {
    width: 45rem;
    height: auto;
    position: absolute;
    transform: scaleX(-1) translateY(100%);
    bottom: -10rem;
    left: -10rem;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.composer-visible {
    transform: scaleX(-1) translateY(0);
}

.trumpeter1-animation {
    width: 28rem;
    height: auto;
    position: absolute;
    transform: scaleX(-1) translateX(-100%);
    top: 0;
    right: 0;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.trumpeter2-animation {
    width: 28rem;
    height: auto;
    position: absolute;
    transform: scaleX(-1) translateX(-120%);
    top: 10rem;
    right: -5rem;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.trumpeter-visible {
    transform: scaleX(-1) translateX(0);
}
</style>