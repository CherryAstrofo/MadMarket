<template>
    <div class="banner-wrapper" ref="bannerWrapper">
        <img :src="methodBanner" alt="method-banner" class="banner-picture" ref="bannerPicture">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import methodBanner from '@/img/photo/method-banner.jpg'

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger)

const bannerWrapper = ref<HTMLElement>()
const bannerPicture = ref<HTMLElement>()

let scrollTrigger: gsap.core.Tween | null = null

onMounted(() => {
    if (!bannerWrapper.value || !bannerPicture.value) return

    // 设置图片初始位置（向上偏移，留出移动空间）
    gsap.set(bannerPicture.value, {
        yPercent: -20 // 初始位置在-15%处
    })

    // 创建视差滚动效果 - 图片滚动速度比容器慢
    scrollTrigger = gsap.to(bannerPicture.value, {
        yPercent: 10, // 滚动结束后图片回到0%位置
        ease: 'none',
        scrollTrigger: {
            trigger: bannerWrapper.value,
            start: 'top bottom', // 容器顶部进入视口底部时开始
            end: 'bottom top', // 容器底部离开视口顶部时结束
            scrub: true, // 动画跟随滚动
            invalidateOnRefresh: true
        }
    })
})

onBeforeUnmount(() => {
    if (scrollTrigger) {
        scrollTrigger.kill()
        scrollTrigger = null
    }
})
</script>

<style scoped>
.banner-wrapper {
    width: 100%;
    height: 100vh;
    border-radius: 4rem;
    position: relative;
    overflow: hidden;
}

.banner-picture {
    width: 100%;
    height: 130%;
    object-fit: cover;
    object-position: center;
    /* 不需要设置初始transform，GSAP会处理 */
}
</style>