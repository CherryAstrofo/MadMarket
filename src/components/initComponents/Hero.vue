<template>
  <div class="hero-container">
    <div class="header">
      <div class="cloud">
        <img :src="cloud1Svg" alt="Cloud 1" id="cloud1" />
        <img :src="cloud2Svg" alt="Cloud 2" id="cloud2" />
        <img :src="cloud3Svg" alt="Cloud 3" id="cloud3" />
        <img :src="cloud4Svg" alt="Cloud 4" id="cloud4" />
      </div>

      <img :src="backGreenSvg" alt="Back Green" class="green-layer back-green" />

      <div class="rive-animation-layer">
        <div class="rive-item basketball-player">
          <RiveAnimation :src="basketballPlayerAnimationUrl" />
        </div>

        <div class="rive-item unicycle">
          <RiveAnimation :src="unicycleAnimationUrl" />
        </div>

        <div class="rive-item binoculars">
          <RiveAnimation :src="binocularsAnimationUrl" />
        </div>
      </div>

      <img :src="middleGreenSvg" alt="Middle Green" class="green-layer middle-green" />
    </div>

    <section class="front-content">
      <img :src="frontGreenSvg" alt="Front Green" class="front-green" />

      <div class="green-content">
        <div class="content-inner">
          <h2 class="content-title">
            <span>Ready when</span>
            <span>you are!</span>
          </h2>

          <p class="content-description">
            Whether you're launching in one market or ten, we're here to make
            your research simple, smart, and human from day one. Let's talk
            about your next project.
          </p>
          <div class="button-wrapper">
            <InteractiveButton class="quote-button" text="Get a quote" button-background="#ffffff" to="/signup"
              circle-background="#8ed462" @mouseenter="showPopUpAnimation" @mouseleave="hidePopUpAnimation" />
          </div>

          <div class="features">
            <span class="feature-text">Fast, high-quality insights</span>
            <span class="feature-text">One seamless project lead</span>
            <span class="feature-text">Built for multi-market studies</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Pop-up 动画层 -->
    <Transition name="popup-slide">
      <div v-if="showPopUp" class="popup-animation-container">
        <RiveAnimation :src="popUpGirlAnimationUrl" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import backGreenSvg from '@/img/svg-picture/timeline-end-green-back.svg'
import middleGreenSvg from '@/img/svg-picture/timeline-end-green-middle.svg'
import frontGreenSvg from '@/img/svg-picture/timeline-end-green-front.svg'

import cloud1Svg from '@/img/svg-picture/timeline_end_cloud_1.svg'
import cloud2Svg from '@/img/svg-picture/timeline_end_cloud_2.svg'
import cloud3Svg from '@/img/svg-picture/timeline_end_cloud_3.svg'
import cloud4Svg from '@/img/svg-picture/timeline_end_cloud_4.svg'

import RiveAnimation from '../ui/rive-animation/RiveAnimation.vue'

import basketballPlayerAnimationUrl from '@/assets/lottie/basketball_player.riv?url'
import unicycleAnimationUrl from '@/assets/lottie/unicycle.riv?url'
import binocularsAnimationUrl from '@/assets/lottie/binoculars.riv?url'
import popUpGirlAnimationUrl from '@/assets/lottie/pop_up_girl.riv?url'
import InteractiveButton from '../ui/interactive-button/InteractiveButton.vue'

const showPopUp = ref(false)

function showPopUpAnimation() {
  showPopUp.value = true
}

function hidePopUpAnimation() {
  showPopUp.value = false
}
</script>

<style scoped>
.hero-container {
  position: relative;
  z-index: 10;
  width: 100%;
}

.header {
  position: relative;

  width: 100%;
  min-height: 900px;
  overflow: hidden;
}

/* 云朵容器 - 最底层 */
.cloud {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  width: 100%;
  height: 100%;

  pointer-events: none;
  user-select: none;
}

/* 云朵通用样式 */
.cloud img {
  position: absolute;

  display: block;

  width: auto;
  height: auto;
}

/* 云朵1 - 左上区域 */
#cloud1 {
  top: 5%;
  left: 5%;
  width: clamp(150px, 18vw, 300px);
}

/* 云朵2 - 右上区域，稍低位置 */
#cloud2 {
  top: 15%;
  right: 10%;
  width: clamp(180px, 22vw, 350px);
}

/* 云朵3 - 左下区域 */
#cloud3 {
  top: 30%;
  left: 8%;
  width: clamp(200px, 25vw, 400px);
}

/* 云朵4 - 右下区域，较高位置 */
#cloud4 {
  top: 40%;
  right: 5%;
  width: clamp(160px, 20vw, 320px);
}

.green-layer {
  position: absolute;
  left: 50%;

  display: block;

  width: 100%;
  height: auto;

  transform: translateX(-50%);

  pointer-events: none;
  user-select: none;
}

.back-green {
  top: 50%;
  z-index: 1;
}

.middle-green {
  top: 70%;
  z-index: 3;
}

.rive-animation-layer {
  position: absolute;
  top: 23%;
  left: 50%;
  z-index: 2;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 100%;
  gap: 0;

  transform: translateX(-50%);

  pointer-events: none;
}

.rive-item {
  position: relative;

  flex: 0 0 auto;
  aspect-ratio: 1;

  margin-left: clamp(-260px, -13vw, -120px);
  margin-right: clamp(-260px, -13vw, -120px);

  pointer-events: auto;
}

.basketball-player {
  top: -250px;
  right: 3%;

  width: clamp(380px, 46vw, 800px);
  margin-left: 0;
}

.unicycle {
  top: -200px;
  left: 5%;

  width: clamp(420px, 52vw, 900px);
}

.binoculars {
  top: -160px;
  left: 6%;

  width: clamp(450px, 56vw, 1000px);
  margin-right: 0;
}

.rive-item :deep(.rive-wrapper) {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
}

.rive-item :deep(.rive-canvas) {
  display: block;

  width: 100%;
  height: 100%;
}

.front-content {
  position: relative;
  z-index: 4;

  width: 100%;

  margin-top: -350px;
}

.front-green {
  position: relative;
  z-index: 1;

  display: block;

  width: 100%;
  height: auto;

  pointer-events: none;
  user-select: none;
}

.green-content {
  position: relative;
  z-index: 1;

  width: 100%;
  min-height: 130vh;

  margin-top: -1px;

  background-color: #8ed462;
  border-radius: 0 0 4rem 4rem;
}

.content-inner {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  padding: clamp(5rem, 10vw, 10rem) 2rem;
  box-sizing: border-box;

  text-align: center;
}

.content-title {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0;

  font-size: clamp(6rem, 9vw, 12rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.06em;

  color: #242424;
}

.content-title span {
  display: block;
  white-space: nowrap;
}

.content-description {
  max-width: 30%;

  margin: clamp(2rem, 4vw, 4rem) auto 0;

  font-size: clamp(1.2rem, 1.6vw, 1.5rem);
  font-weight: 600;
  line-height: 1.4;
  color: #242424;
  margin-bottom: 2rem;
}

.button-wrapper {
  position: relative;
  display: inline-block;
}

/* Pop-up 动画容器 */
.popup-animation-container {
  position: fixed;
  left: -80px;
  bottom: -150px;
  z-index: 9999;
  pointer-events: none;
}

/* 让 Rive 组件适应容器 */
.popup-animation-container :deep(.rive-wrapper) {
  width: 750px;
  /* 根据需要调整大小 */
}

/* 过渡动画 */
.popup-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.popup-slide-leave-active {
  transition: all 0.3s ease-in;
}

.popup-slide-enter-from {
  transform: translateX(-100%) translateY(100%);
  opacity: 0;
}

.popup-slide-leave-to {
  transform: translateX(-100%) translateY(100%);
  opacity: 0;
}

.features {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(4rem, 10vw, 10rem);
  width: 100%;
  margin-top: clamp(8rem, 16vw, 16rem);
  margin-left: 40px;
}

.feature-text {
  font-size: clamp(1.1rem, 1.6vw, 1.3rem);
  font-weight: 600;
  color: #242424;
  white-space: nowrap;
}

/* 云朵响应式调整 */
@media (max-width: 768px) {
  #cloud1 {
    top: 3%;
    left: 2%;
    width: clamp(100px, 25vw, 180px);
  }

  #cloud2 {
    top: 10%;
    right: 5%;
    width: clamp(120px, 30vw, 220px);
  }

  #cloud3 {
    bottom: 35%;
    left: 3%;
    width: clamp(130px, 32vw, 250px);
  }

  #cloud4 {
    bottom: 45%;
    right: 2%;
    width: clamp(110px, 28vw, 200px);
  }

  .features {
    flex-direction: column;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  #cloud1 {
    top: 2%;
    left: 0;
  }

  #cloud2 {
    top: 8%;
    right: 0;
  }

  #cloud3 {
    bottom: 40%;
    left: 0;
  }

  #cloud4 {
    bottom: 50%;
    right: 0;
  }
}

@media (max-width: 1200px) {
  .header {
    min-height: 1100px;
  }

  .rive-animation-layer {
    top: 27%;
  }

  .rive-item {
    width: 60vw;

    margin-left: -18vw;
    margin-right: -18vw;
  }

  .basketball-player {
    margin-left: 0;
  }

  .binoculars {
    margin-right: 0;
  }

  .front-content {
    margin-top: -385px;
  }

  .content-description {
    max-width: 30%;
  }
}
</style>