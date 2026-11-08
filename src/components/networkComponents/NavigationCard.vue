<script setup lang="ts">
import { ref } from 'vue';
import InteractiveButton from '../ui/interactive-button/InteractiveButton.vue';
import RiveAnimation from '../ui/rive-animation/RiveAnimation.vue';

import popUpGirlAnimationUrl from '@/assets/lottie/pop_up_girl.riv?url';

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
        <div class="title">Ready to Launch<br>Global Research?</div>

        <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <InteractiveButton text="Contact Us" buttonBackground="#8ED462" circleBackground="#ffffff" to="/network" />
        </div>

        <RiveAnimation :src="popUpGirlAnimationUrl" class="pop-up-girl-animation"
            :class="{ 'pop-up-girl-visible': isHovered }" />
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

.pop-up-girl-animation {
    width: 40rem;
    height: auto;
    position: absolute;
    transform: translateY(100%);
    bottom: -8rem;
    right: 0;
    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.pop-up-girl-visible {
    transform: translateY(0);
}
</style>