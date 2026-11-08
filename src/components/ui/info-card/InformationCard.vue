<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import InteractiveButton from '../interactive-button/InteractiveButton.vue'

interface Props {
  title: string
  content: string
  buttonText: string
  buttonBackground: string
  circleBackground: string
}

defineProps<Props>()

const cardRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!cardRef.value) return

  observer = new IntersectionObserver(
    entries => {
      const entry = entries[0]

      if (entry && entry.isIntersecting) {
        isVisible.value = true

        // 动画只执行一次，执行后停止监听
        observer?.unobserve(entry.target)
      }
    },
    {
      /*
       * 0.2 表示卡片至少有 20% 进入视口时触发
       */
      threshold: 0.2,

      /*
       * 提前或延迟触发位置：
       * 底部 -80px 表示卡片进入视口更深一些再触发
       */
      rootMargin: '0px 0px -80px 0px',
    },
  )

  observer.observe(cardRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <article
    ref="cardRef"
    class="information-card"
    :class="{ 'is-visible': isVisible }"
    :style="{
      '--card-animation-color': buttonBackground,
    }"
  >
    <!-- 第一层：彩色动画背景 -->
    <div class="card-color-background"></div>

    <!-- 第二层：真正的白色卡片 -->
    <div class="card-main">
      <div class="card-content">
        <h3 class="card-title">
          {{ title }}
        </h3>

        <p class="card-description">
          {{ content }}
        </p>

        <InteractiveButton
          class="quote-button"
          :text="buttonText"
          :button-background="buttonBackground"
          :circle-background="circleBackground"
        />
      </div>
    </div>
  </article>
</template>

<style scoped>
.information-card {
  position: relative;

  width: 30rem;
  min-height: 20rem;

  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  isolation: isolate;

  text-align: left;
  pointer-events: auto;
}

/* =========================
   第一层：彩色背景
   初始状态不显示
   ========================= */
.card-color-background {
  position: absolute;
  inset: 0;
  z-index: 1;

  border-radius: inherit;
  background-color: var(--card-animation-color);

  transform: scale(0);
  transform-origin: center;
  opacity: 0;

  pointer-events: none;
}

/* 卡片进入视口后才播放 */
.information-card.is-visible .card-color-background {
  animation: color-card-expand 0.75s cubic-bezier(0.22, 1, 0.36, 1)
    forwards;
}

/* =========================
   第二层：真实白色卡片
   ========================= */
.card-main {
  position: relative;
  z-index: 2;

  width: 100%;
  min-height: inherit;
  padding: 2rem;

  box-sizing: border-box;
  border-radius: inherit;
  background-color: #fff;

  transform: scale(0);
  transform-origin: center;
  opacity: 0;
}

/* 延迟出现并覆盖彩色背景 */
.information-card.is-visible .card-main {
  animation: main-card-expand 0.7s cubic-bezier(0.22, 1, 0.36, 1)
    0.25s forwards;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  width: 100%;
}

.card-title {
  margin: 0;

  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.25;
  color: #000;
}

.card-description {
  margin: 0;

  font-size: 1rem;
  font-weight: 400;
  line-height: 1.7;
  color: #000;
}

/* 只调整 InformationCard 中的按钮 */
.quote-button {
  position: relative;
  z-index: 10;

  align-self: flex-start;
  flex: none;

  width: fit-content;
  min-width: 0;
  padding: 8px 12px;
  gap: 14px;

  border-radius: 9px;
  pointer-events: auto;
}

:deep(.quote-button .button-text) {
  font-size: 0.9rem;
  line-height: 1;
}

:deep(.quote-button .icon-circle) {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
}

:deep(.quote-button .arrow-icon) {
  width: 16px;
  height: 16px;
}

@keyframes color-card-expand {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes main-card-expand {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-color-background,
  .card-main {
    animation: none !important;
    transform: scale(1);
    opacity: 1;
  }
}
</style>