<script setup lang="ts">
import {
  ref,
} from 'vue'

import NavigationBar
  from './navComponents/NavigationBar.vue'

import Start
  from './initComponents/Start.vue'

import Information
  from './initComponents/Information.vue'

import ScrollBar
  from './initComponents/ScrollBar.vue'

import Hero
  from './initComponents/Hero.vue'

import Banner
  from './initComponents/Banner.vue'

import Number
  from './initComponents/Number.vue'

import Brand
  from './initComponents/Brand.vue'

import Footer
  from './Footer.vue'

import {
  useInitialPageAnimations,
} from '@/composables/useInitialPageAnimations'

// ------------------- DOM Refs -------------------

const startContainer =
  ref<HTMLElement | null>(
    null,
  )

const infoCard =
  ref<HTMLElement | null>(
    null,
  )

/*
 * 只负责纵向移动。
 */
const scrollBarMover =
  ref<HTMLElement | null>(
    null,
  )

/*
 * 只负责放大缩小。
 */
const scrollBarScaler =
  ref<HTMLElement | null>(
    null,
  )

// ------------------- Page Animation -------------------

useInitialPageAnimations({
  startContainer,
  infoCard,
  scrollBarMover,
  scrollBarScaler,
})
</script>

<template>
  <div class="hero-section">
    <!-- 导航栏 -->
    <div class="nav-container">
      <NavigationBar />
    </div>

    <!-- 第一层：Start -->
    <div ref="startContainer" class="start-layer">
      <Start />
    </div>

    <!-- 第二层：Information -->
    <div ref="infoCard" class="info-layer">
      <Information />
    </div>

    <!-- 第三层：ScrollBar -->
    <div class="scrollbar-layer">
      <!-- 只负责跟随 Information 向上移动 -->
      <div ref="scrollBarMover" class="scrollbar-mover">
        <!-- 只负责缩放 -->
        <div ref="scrollBarScaler" class="scrollbar-scaler">
          <ScrollBar />
        </div>
      </div>
    </div>

    <!-- 第四层：Hero -->
    <div class="hero-layer">
      <Hero />
    </div>

    <!-- 第五层：Banner -->
    <div class="banner-layer">
      <Banner />
    </div>

    <div class="number-layer">
      <Number />
    </div>

    <div class="brand-layer">
      <Brand />
    </div>

    <div class="footer-layer">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  isolation: isolate;

  width: 100%;
  min-height: 100vh;

  /*
   * clip 只裁剪横向溢出，
   * 不会像 hidden 一样创建新的滚动容器。
   */
  overflow-x: clip;
  overflow-y: visible;

  background-color: #8ed462;
}

/* ------------------- 导航栏 ------------------- */

.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;

  display: flex;
  justify-content: center;

  width: 100%;

  padding: 8px 20px;

  box-sizing: border-box;
}

.nav-container> :deep(.navigation-bar) {
  width: 100%;
  max-width: 1300px;
}

/* ------------------- Start 第一层 ------------------- */

.start-layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100vw;
  height: 100vh;
}

/* ------------------- Information 第二层 ------------------- */

.info-layer {
  position: relative;
  right: 0;
  left: 0;
  z-index: 5;

  width: 100vw;

  /*
   * 为固定定位的 Start
   * 预留第一屏空间。
   */
  margin-top: 100vh;

  margin-right:
    calc(-50vw + 50%);

  margin-left:
    calc(-50vw + 50%);

  box-sizing: border-box;

  transform:
    translate3d(0, 0, 0);

  backface-visibility:
    hidden;
}

/* ------------------- ScrollBar 第三层 ------------------- */

/*
 * 最外层：
 *
 * 只负责固定定位和水平居中，
 * GSAP 不修改它的 transform。
 */
.scrollbar-layer {
  position: fixed;
  top: 43%;
  left: 50%;
  z-index: 10;

  width: max-content;
  height: max-content;

  transform:
    translateX(-50%);

  pointer-events: none;
}

/*
 * 中间层：
 *
 * 只负责纵向 y 移动。
 */
.scrollbar-mover {
  position: relative;

  width: max-content;
  height: max-content;

  will-change: transform;

  backface-visibility:
    hidden;
}

/*
 * 内层：
 *
 * 只负责 scale 缩放。
 */
.scrollbar-scaler {
  position: relative;

  width: max-content;
  height: max-content;

  transform-origin:
    center center;

  will-change: transform;

  backface-visibility:
    hidden;
}

/* ------------------- Hero 第四层 ------------------- */

.hero-layer {
  position: relative;
  z-index: 15;
  display: flow-root;
  width: 100%;
  margin-top: -180vh;
  box-sizing: border-box;
  background: transparent;
  pointer-events: auto;
}

.hero-layer> :deep(*) {
  box-sizing: border-box;
}

/* ------------------- Banner 第五层 ------------------- */

.banner-layer {
  position: relative;
  z-index: 20;
  width: 100%;
  margin-top: 0;
  /* 紧接 Hero，如需间距可调整 */
  box-sizing: border-box;
  pointer-events: auto;
}

/* ------------------- Number 第六层 ------------------- */
.number-layer {
  position: relative;
  z-index: 25;
  width: 100%;
  margin-top: 0;
  /* 紧接 Banner，如需间距可调整 */
  box-sizing: border-box;
  pointer-events: auto;
}

/* ------------------- Brand 第七层 ------------------- */
.brand-layer {
  position: relative;
  z-index: 30;
  width: 100%;
  margin-top: 0;
  /* 紧接 Number，如需间距可调整 */
  box-sizing: border-box;
  pointer-events: auto;
}

.footer-layer {
  position: relative;
  z-index: 35;
  width: 100%;
  margin-top: 0;
  /* 紧接 Brand，如需间距可调整 */
  box-sizing: border-box;
  pointer-events: auto;
}

/* ------------------- 全局基础样式 ------------------- */

:global(html) {
  width: 100%;

  overflow-x: clip;
}

:global(body) {
  width: 100%;
  min-height: 100%;

  margin: 0;
  padding: 0;

  overflow-x: clip;
  overflow-y: auto;
}

:global(#app) {
  width: 100%;
  min-height: 100%;
}

/* ------------------- Lenis 样式 ------------------- */

:global(html.lenis),
:global(html.lenis body) {
  height: auto;
}

:global(.lenis.lenis-smooth) {
  scroll-behavior:
    auto !important;
}

:global(.lenis.lenis-smooth [data-lenis-prevent]) {
  overscroll-behavior:
    contain;
}

:global(.lenis.lenis-stopped) {
  overflow: clip;
}

:global(.lenis.lenis-scrolling iframe) {
  pointer-events: none;
}
</style>