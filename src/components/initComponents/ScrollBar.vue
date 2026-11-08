<script setup lang="ts">
import {
  useCirclePathAnimation,
} from '@/composables/useCirclePathAnimation'

import ScrollbarRiveAnimation
  from './scroll-bar-elements/ScrollbarRiveAnimation.vue'

import ScrollbarSvg
  from './scroll-bar-elements/ScrollbarSvg.vue'

import ScrollbarInfoCard
  from './scroll-bar-elements/ScrollbarInfoCard.vue'

const {
  containerRef,
  measureCircleRef,
  trailPathRef,
  headCircleRef,

  svgWidth,
  svgHeight,
  pathD,
  trailStrokeWidth,
  headCircleX,
  headCircleY,
} = useCirclePathAnimation({
  pathScrollStartRatio: 1.2,
  pathScrollLengthRatio: 5,
  headCircleInsetRatio: 0.35,
  trailEndInsetRatio: 0.08,
})
</script>

<template>
  <div
    ref="containerRef"
    class="scroll-bar-container"
  >
    <!-- 背景、图标和其他 SVG 装饰 -->
    <ScrollbarSvg />

    <!-- 绿色滚动路径 -->
    <svg
      class="motion-path-svg"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        ref="trailPathRef"
        class="trail-path"
        :d="pathD"
        :stroke-width="trailStrokeWidth"
      />

      <circle
        ref="headCircleRef"
        class="trail-head"
        :cx="headCircleX"
        :cy="headCircleY"
        :r="trailStrokeWidth / 2"
      />
    </svg>

    <!-- 用于测量路径圆形尺寸 -->
    <div
      ref="measureCircleRef"
      class="measure-circle"
      aria-hidden="true"
    />

    <!-- 所有 Rive 动画 -->
    <ScrollbarRiveAnimation />

    <!-- 信息卡片 -->
    <ScrollbarInfoCard />
  </div>
</template>

<style scoped>
.scroll-bar-container {
  position: relative;
  isolation: isolate;

  display: flex;
  align-items: center;
  justify-content: center;

  /*
   * 隔离内部布局计算，但不使用 contain: paint，
   * 否则超出容器的 SVG 路径会被裁剪。
   */
  contain: layout style;

  overflow: visible;
}

/* ------------------- 路径 SVG ------------------- */

.motion-path-svg {
  position: absolute;
  z-index: 0;
  inset: 0;

  width: 100%;
  height: 100%;

  overflow: visible;
  pointer-events: none;
}

.trail-path {
  fill: none;

  stroke: #8ed462;
  stroke-linecap: round;
  stroke-linejoin: round;

  pointer-events: none;
}

.trail-head {
  fill: #8ed462;

  pointer-events: none;
}

/* ------------------- 隐藏测量圆形 ------------------- */

.measure-circle {
  position: absolute;
  top: 50%;
  left: 40%;

  width: 23rem;
  height: 23rem;

  visibility: hidden;

  border-radius: 50%;

  pointer-events: none;
}
</style>