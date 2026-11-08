<template>
  <div ref="wrapperRef" class="rive-wrapper">
    <canvas ref="canvasRef" class="rive-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Rive, Layout, Fit, Alignment } from '@rive-app/canvas'

interface Props {
  src: string
  autoplay?: boolean
  fit?: Fit
  alignment?: Alignment
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  fit: Fit.Contain,
  alignment: Alignment.Center
})

const wrapperRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let riveInstance: Rive | null = null
let resizeObserver: ResizeObserver | null = null

function resizeCanvas() {
  riveInstance?.resizeDrawingSurfaceToCanvas()
}

function initRive() {
  if (!canvasRef.value || !props.src) return

  // 清理旧实例
  cleanupRive()

  riveInstance = new Rive({
    src: props.src,
    canvas: canvasRef.value,
    autoplay: props.autoplay,

    layout: new Layout({
      fit: props.fit,
      alignment: props.alignment
    }),

    onLoadError: (error) => {
      console.error('Rive 文件加载失败：', error)
    }
  })
}

function cleanupRive() {
  resizeObserver?.disconnect()
  riveInstance?.cleanup()
  riveInstance = null
}

// 监听 src 变化，重新加载动画
watch(() => props.src, () => {
  initRive()
})

onMounted(() => {
  initRive()

  if (wrapperRef.value) {
    resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserver.observe(wrapperRef.value)
  }
})

onBeforeUnmount(() => {
  cleanupRive()
  resizeObserver = null
})

// 暴露方法给父组件
defineExpose({
  getRiveInstance: () => riveInstance,
  resizeCanvas
})
</script>

<style scoped>
.rive-wrapper {
  width: min(80vw, 800px);
  aspect-ratio: 1;
  overflow: hidden;
}

.rive-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>