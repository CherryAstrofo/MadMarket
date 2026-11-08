<template>
    <div class="hero" ref="heroRef">
        <div class="hero-content" ref="contentRef">
            <div class="subtitle">Industry Sectors</div>
            <div class="title">Speak their</div>
            <div class="title">language</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

let scrollTrigger: ScrollTrigger | null = null
let timeline: gsap.core.Timeline | null = null

onMounted(() => {
    if (!heroRef.value || !contentRef.value) return

    const hero = heroRef.value
    const content = contentRef.value

    // 创建时间轴动画
    timeline = gsap.timeline({
        scrollTrigger: {
            trigger: hero,
            start: 'top top',      // 当hero顶部到达视口顶部时开始
            end: 'bottom top',     // 当hero底部到达视口顶部时结束
            scrub: 0.5,            // 滚动时平滑过渡
            pin: true,             // 固定hero组件，使其不随滚动移动
            anticipatePin: 1,
            // 可选：添加标记便于调试（生产环境建议移除）
            // markers: true,
        }
    })

    // 文字缩放与淡化动画
    timeline
        .to(content, {
            scale: 0.6,            // 文字缩小到60%
            opacity: 0.2,          // 透明度降到20%
            ease: 'power1.inOut',
            duration: 1,
        }, 0)

    // 可选：给文字添加一点向上位移，增强效果
    timeline.to(content, {
        y: -80,                  // 文字向上移动80px
        ease: 'power1.inOut',
        duration: 1,
    }, 0)

    // 存储scrollTrigger引用以便清理
    scrollTrigger = timeline.scrollTrigger as ScrollTrigger
})

onBeforeUnmount(() => {
    // 清理动画和ScrollTrigger，防止内存泄漏
    if (timeline) {
        timeline.kill()
        timeline = null
    }
    if (scrollTrigger) {
        scrollTrigger.kill()
        scrollTrigger = null
    }
})
</script>

<style scoped>
.hero {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-left: 8%;
    padding-top: 10%;
    box-sizing: border-box;
    background-color: #2093FF;
    position: relative;
    z-index: 1;
    /* 确保hero在底层，被后续组件覆盖 */
}

.subtitle {
    font-size: 1.8rem;
    color: #282828;
    margin-bottom: 1rem;
    font-weight: 600;
}

.title {
    font-size: 10rem;
    line-height: 0.85;
    font-weight: 600;
    color: #222;
    letter-spacing: -0.05em;
}

/* 移动端适配 */
@media (max-width: 768px) {
    .title {
        font-size: 5rem;
    }

    .subtitle {
        font-size: 1.4rem;
    }
}
</style>