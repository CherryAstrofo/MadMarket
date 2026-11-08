<template>
  <button
    class="quote-button"
    type="button"
    aria-label="Get a quote"
    @pointercancel="resetCharacter"
    @blur="resetCharacter"
  >
    <span class="quote-text">
      Get a quote
    </span>

    <span
      class="character-wrapper"
      aria-hidden="true"
    >
      <!-- 固定不动的蓝色圆形容器 -->
      <span class="character">
        <span class="face">
          <!-- 跟随鼠标移动的头发 -->
          <span
            class="hair"
            :style="hairStyle"
          >
            <span class="hair-circle hair-circle-left"></span>
            <span class="hair-circle hair-circle-right"></span>
          </span>

          <!-- 单个半圆弧眼睛 -->
          <span
            class="eye"
            :style="eyeStyle"
          ></span>

          <!-- 跟随鼠标移动的嘴巴 -->
          <span
            class="mouth"
            :style="mouthStyle"
          >
            <span class="mouth-inner">
              <span class="teeth"></span>
              <span class="tongue"></span>
            </span>
          </span>
        </span>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
} from 'vue'

/*
 * 当前平滑后的鼠标位置。
 * x、y 的范围都是 -1 到 1。
 */
const pointer = reactive({
  x: 0,
  y: 0,
})

/*
 * 鼠标目标位置。
 */
const targetPointer = reactive({
  x: 0,
  y: 0,
})

let animationFrame = 0

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(Math.max(value, min), max)
}

/*
 * 使用 requestAnimationFrame 平滑追踪鼠标。
 */
function animateCharacter() {
  const easing = 0.12

  pointer.x +=
    (targetPointer.x - pointer.x) * easing

  pointer.y +=
    (targetPointer.y - pointer.y) * easing

  const distanceX = Math.abs(
    targetPointer.x - pointer.x,
  )

  const distanceY = Math.abs(
    targetPointer.y - pointer.y,
  )

  if (distanceX > 0.001 || distanceY > 0.001) {
    animationFrame =
      requestAnimationFrame(animateCharacter)

    return
  }

  pointer.x = targetPointer.x
  pointer.y = targetPointer.y

  animationFrame = 0
}

function startAnimation() {
  if (animationFrame !== 0) return

  animationFrame =
    requestAnimationFrame(animateCharacter)
}

/*
 * 监听整个浏览器窗口，而不是只监听按钮。
 */
function handleWindowPointerMove(
  event: PointerEvent,
) {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  if (!viewportWidth || !viewportHeight) return

  targetPointer.x = clamp(
    (event.clientX / viewportWidth - 0.5) * 2,
    -1,
    1,
  )

  targetPointer.y = clamp(
    (event.clientY / viewportHeight - 0.5) * 2,
    -1,
    1,
  )

  startAnimation()
}

function resetCharacter() {
  targetPointer.x = 0
  targetPointer.y = 0

  startAnimation()
}

function handleVisibilityChange() {
  if (document.hidden) {
    resetCharacter()
  }
}

/*
 * 只有头发移动。
 * 移动幅度较小，避免超出圆形脸部太多。
 */
const hairStyle = computed(() => ({
  transform: `
    translate3d(
      ${pointer.x * 3}px,
      ${pointer.y * 2.5}px,
      0
    )
  `,
}))

/*
 * 单眼弧线移动幅度稍大。
 */
const eyeStyle = computed(() => ({
  transform: `
    translate3d(
      ${pointer.x * 4}px,
      ${pointer.y * 3.5}px,
      0
    )
    rotate(${pointer.x * 5}deg)
  `,
}))

/*
 * 嘴巴跟随鼠标移动。
 * hover 放大由 CSS 单独处理，不写在这里，
 * 避免 transform 相互覆盖。
 */
const mouthStyle = computed(() => ({
  '--mouth-x': `${pointer.x * 3.5}px`,
  '--mouth-y': `${pointer.y * 3}px`,
  '--mouth-rotate': `${pointer.x * 4}deg`,
}))

onMounted(() => {
  window.addEventListener(
    'pointermove',
    handleWindowPointerMove,
    {
      passive: true,
    },
  )

  window.addEventListener(
    'blur',
    resetCharacter,
  )

  document.addEventListener(
    'visibilitychange',
    handleVisibilityChange,
  )
})

onBeforeUnmount(() => {
  window.removeEventListener(
    'pointermove',
    handleWindowPointerMove,
  )

  window.removeEventListener(
    'blur',
    resetCharacter,
  )

  document.removeEventListener(
    'visibilitychange',
    handleVisibilityChange,
  )

  if (animationFrame !== 0) {
    cancelAnimationFrame(animationFrame)
    animationFrame = 0
  }
})
</script>

<style scoped>
.quote-button {
  --quote-background: #ffffff;
  --quote-hover-background: #ffe500;
  --quote-text-color: #000000;

  --face-color: #2798ef;
  --hair-color: #252c30;
  --mouth-color: #263036;
  --tongue-color: #ff7168;

  height: var(--nav-control-height, 64px);
  width: auto;
  aspect-ratio: 286 / 100;
  flex-shrink: 0;

  position: relative;
  isolation: isolate;
  overflow: hidden;

  padding: 0 10px 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  appearance: none;
  box-sizing: border-box;

  border: none;
  border-radius: var(--nav-border-radius, 10px);

  background: var(--quote-background);
  color: var(--quote-text-color);
  cursor: pointer;

  transition:
    transform 180ms ease,
    box-shadow 280ms ease;
}

/* 黄色背景从下沿放大 */

.quote-button::before {
  content: "";

  position: absolute;
  left: 50%;
  bottom: 0;
  z-index: 0;

  width: 100%;
  height: 100%;

  border-radius: inherit;
  background: var(--quote-hover-background);
  transform-origin: center bottom;

  transform:
    translate3d(-50%, 88%, 0)
    scale(0.12);

  transition:
    transform 520ms
    cubic-bezier(0.22, 1, 0.36, 1);

  pointer-events: none;
}

.quote-button:hover::before,
.quote-button:focus-visible::before {
  transform:
    translate3d(-50%, 0, 0)
    scale(1.04);
}

.quote-button:active {
  transform: scale(0.98);
}

.quote-button:focus-visible {
  outline: 2px solid rgba(0, 0, 0, 0.75);
  outline-offset: 3px;
}

.quote-text,
.character-wrapper {
  position: relative;
  z-index: 1;
}

.quote-text {
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.45px;
  white-space: nowrap;
}

/* 外部角色容器固定不动 */

.character-wrapper {
  width: 42px;
  height: 42px;
  flex: 0 0 42px;

  display: grid;
  place-items: center;

  overflow: visible;
}

/*
 * 整个角色的位置固定。
 * 不再绑定任何鼠标 transform。
 */
.character {
  width: 38px;
  height: 38px;

  display: block;
  position: relative;

  transform: none;
}

/*
 * 蓝色圆形是最底层，
 * 永远固定不动。
 *
 * overflow: hidden 用来裁切头发、眼睛和嘴巴，
 * 让所有元素始终嵌在圆形内部。
 */
.face {
  width: 38px;
  height: 38px;

  display: block;
  position: relative;
  overflow: hidden;

  border-radius: 50%;
  background: var(--face-color);
}

/* =========================
   头发
   ========================= */

/*
 * 头发容器本身跟随鼠标。
 */
.hair {
  width: 46px;
  height: 24px;
  position: absolute;
  top: -23px;
  left: -4px;
  z-index: 3;
  display: block;
  will-change: transform;
}

/*
 * 两个黑色圆形交叠形成头发。
 * 因为 face 使用 overflow: hidden，
 * 所以最终只显示圆形底部的一部分。
 */
.hair-circle {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: var(--hair-color);
}

.hair-circle-left {
  width: 31px;
  height: 31px;
  top: 0;
  left: 0;
}

.hair-circle-right {
  width: 32px;
  height: 32px;

  top: 0;
  right: 0;
}

/* =========================
   单个眼睛
   ========================= */

/*
 * 眼睛是一个简单向下弯曲的半圆弧。
 * 不使用眼白和瞳孔。
 */
.eye {
  width: 10px;
  height: 6px;

  position: absolute;
  top: 13px;
  left: 10px;
  z-index: 5;

  display: block;

  border-top: 2px solid var(--hair-color);
  border-radius: 50% 50% 0 0;

  transform-origin: center;
  will-change: transform;
}

/*
 * 使用伪元素增加弧线右侧的小延伸，
 * 让眼睛更接近参考图中的表情。
 */
.eye::after {
  content: "";

  width: 2px;
  height: 2px;

  position: absolute;
  top: -1px;
  right: -1px;

  border-radius: 50%;
  background: var(--hair-color);
}

/* =========================
   嘴巴
   ========================= */

.mouth {
  --mouth-x: 0px;
  --mouth-y: 0px;
  --mouth-rotate: 0deg;
  --mouth-scale: 1;

  width: 18px;
  height: 9px;

  position: absolute;
  left: 9px;
  bottom: 9px;
  z-index: 5;

  display: block;

  transform:
    translate3d(
      var(--mouth-x),
      var(--mouth-y),
      0
    )
    rotate(var(--mouth-rotate))
    scale(var(--mouth-scale));

  transform-origin: center;
  will-change: transform;

  transition:
    transform 260ms
    cubic-bezier(0.22, 1, 0.36, 1);
}

/*
 * hover 时只放大嘴巴，
 * 蓝色圆形和其他部分不会放大。
 */
.quote-button:hover .mouth,
.quote-button:focus-visible .mouth {
  --mouth-scale: 1.3;
}

.mouth-inner {
  width: 100%;
  height: 100%;

  display: block;
  position: relative;
  overflow: hidden;

  border-radius:
    50% 50% 48% 48%
    / 42% 42% 62% 62%;

  background: var(--mouth-color);
}

/*
 * 牙齿是一个较大的白色圆形，
 * 只显示圆形下方的一小段。
 */
.teeth {
  width: 19px;
  height: 10px;

  position: absolute;
  top: -8px;
  left: 50%;

  display: block;

  border-radius: 50%;
  background: #ffffff;

  transform: translateX(-50%);
}

/*
 * 舌头同样是一个粉色圆形，
 * 只显示上方的一小部分。
 */
.tongue {
  width: 17px;
  height: 10px;

  position: absolute;
  bottom: -6px;
  left: 50%;

  display: block;

  border-radius: 50%;
  background: var(--tongue-color);

  transform: translateX(-50%);
}

/* 减少动态效果偏好 */

@media (prefers-reduced-motion: reduce) {
  .quote-button,
  .quote-button::before,
  .hair,
  .eye,
  .mouth {
    transition: none;
  }

  .hair,
  .eye {
    transform: none !important;
  }

  .mouth {
    --mouth-x: 0px !important;
    --mouth-y: 0px !important;
    --mouth-rotate: 0deg !important;
  }

  .quote-button:hover::before,
  .quote-button:focus-visible::before {
    transform:
      translate3d(-50%, 0, 0)
      scale(1.04);
  }
}
</style>