<template>
  <button ref="buttonRef" class="interactive-button" type="button" :style="buttonStyle" @click="handleClick">
    <span ref="textRef" class="button-text">
      {{ props.text }}
    </span>

    <span ref="iconRef" class="icon-circle">
      <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 6 15 12 9 18" />
      </svg>
    </span>
  </button>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { useLenis } from '@/composables/useLenis'

const { init, refresh } = useLenis()
const router = useRouter()

onMounted(async () => {

  init()

  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  refresh()

})

const props = defineProps({
  // 按钮背景颜色
  buttonBackground: {
    type: String,
    default: '#ffffff',
  },

  // 圆形图标背景颜色
  circleBackground: {
    type: String,
    default: '#8ed462',
  },

  // 按钮文字
  text: {
    type: String,
    default: 'Get a quote',
  },

  // 跳转目标路由（新增）
  to: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['click'])

const buttonStyle = computed(() => ({
  '--button-background': props.buttonBackground,
  '--circle-background': props.circleBackground,
}))

const buttonRef = ref(null)
const textRef = ref(null)
const iconRef = ref(null)

/**
 * 点击处理：
 * 1. 若有 to，走路由跳转
 * 2. 始终透传 click 事件给父组件
 */
const handleClick = (event) => {
  emit('click', event)
  if (props.to) {
    router.push(props.to)
  }
}

let activeTimeline = null
let handleMouseEnter = null
let handleMouseLeave = null

onMounted(() => {
  const button = buttonRef.value
  const text = textRef.value
  const icon = iconRef.value

  if (!button || !text || !icon) return

  const gap = 16

  const stopCurrentAnimation = () => {
    activeTimeline?.kill()
    activeTimeline = null

    gsap.killTweensOf([button, text, icon])
  }

  const getMoveDistances = () => {
    const textWidth = text.offsetWidth
    const iconWidth = icon.offsetWidth

    return {
      textMoveX: iconWidth + gap,
      iconMoveX: -(textWidth + gap),
    }
  }

  handleMouseEnter = () => {
    stopCurrentAnimation()

    const { textMoveX, iconMoveX } = getMoveDistances()

    activeTimeline = gsap.timeline({
      defaults: {
        overwrite: 'auto',
      },
    })

    // 按钮放大
    activeTimeline.to(
      button,
      {
        scale: 1.06,
        duration: 0.4,
        ease: 'back.out(1.7)',
      },
      0,
    )

    // 图标在右侧缩小
    activeTimeline.to(
      icon,
      {
        scale: 0,
        duration: 0.3,
        ease: 'power2.in',
      },
      0,
    )

    // 图标移动到左侧
    activeTimeline.set(
      icon,
      {
        x: iconMoveX,
      },
      0.3,
    )

    // 图标在左侧重新出现
    activeTimeline.to(
      icon,
      {
        scale: 1.1,
        duration: 0.25,
        ease: 'power2.out',
      },
      0.3,
    )

    activeTimeline.to(
      icon,
      {
        scale: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      0.55,
    )

    // 文字向右移动，并稍微越过目标位置
    activeTimeline.to(
      text,
      {
        x: textMoveX + 8,
        duration: 0.4,
        ease: 'power2.out',
      },
      0.1,
    )

    // 文字回弹到最终位置
    activeTimeline.to(
      text,
      {
        x: textMoveX,
        duration: 0.35,
        ease: 'elastic.out(1, 0.4)',
      },
      0.5,
    )
  }

  handleMouseLeave = () => {
    stopCurrentAnimation()

    activeTimeline = gsap.timeline({
      defaults: {
        overwrite: 'auto',
      },
    })

    // 按钮恢复大小
    activeTimeline.to(
      button,
      {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
      },
      0,
    )

    // 左侧图标缩小消失
    activeTimeline.to(
      icon,
      {
        scale: 0,
        duration: 0.3,
        ease: 'power2.in',
      },
      0,
    )

    // 图标回到右侧
    activeTimeline.set(
      icon,
      {
        x: 0,
      },
      0.3,
    )

    // 图标在右侧重新出现
    activeTimeline.to(
      icon,
      {
        scale: 1.1,
        duration: 0.25,
        ease: 'power2.out',
      },
      0.3,
    )

    activeTimeline.to(
      icon,
      {
        scale: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      },
      0.55,
    )

    // 文字向左移动并越过初始位置
    activeTimeline.to(
      text,
      {
        x: -8,
        duration: 0.45,
        ease: 'power2.out',
      },
      0.1,
    )

    // 文字向右回弹到初始位置
    activeTimeline.to(
      text,
      {
        x: 0,
        duration: 0.35,
        ease: 'elastic.out(1, 0.45)',
      },
      0.55,
    )
  }

  button.addEventListener('mouseenter', handleMouseEnter)
  button.addEventListener('mouseleave', handleMouseLeave)
})

onBeforeUnmount(() => {
  const button = buttonRef.value

  if (button) {
    button.removeEventListener('mouseenter', handleMouseEnter)
    button.removeEventListener('mouseleave', handleMouseLeave)
  }

  activeTimeline?.kill()

  gsap.killTweensOf([
    buttonRef.value,
    textRef.value,
    iconRef.value,
  ])

  activeTimeline = null
})
</script>

<style scoped>
.interactive-button {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  min-width: 100px;
  padding: 12px 18px;

  background-color: var(--button-background);
  border: none;
  border-radius: 12px;

  cursor: pointer;
  font-family: inherit;
  position: relative;
  outline: none;

  transform-origin: center;
}

.button-text {
  color: #333333;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  user-select: none;
}

.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  flex-shrink: 0;

  background-color: var(--circle-background);
  border-radius: 50%;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: #000000;
}

.interactive-button:active {
  transform: scale(0.98) !important;
}

.interactive-button:focus-visible {
  outline: 3px solid var(--circle-background);
  outline-offset: 3px;
  border-radius: 16px;
}
</style>