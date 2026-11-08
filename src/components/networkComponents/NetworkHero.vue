<template>
    <div class="hero-wrapper" ref="heroWrapper">
        <div class="left-title">
            <p class="title">Everything,<br>Everwhere,</p>
            <p class="sub-title">Our global network of in-market experts is ready to lead your research — wherever your
                audience is.</p>
        </div>

        <div class="right-title">
            <p class="title">All in<br />One place</p>
        </div>

        <RiveAnimation :src="soccerAnimationUrl" class="soccer-animation" />
        <RiveAnimation :src="unicycleAnimationUrl" class="unicycle-animation" />

        <img :src="cloud1" alt="Cloud 1" class="cloud-1" ref="cloud1Ref">
        <img :src="cloud2" alt="Cloud 2" class="cloud-2" ref="cloud2Ref">
        <img :src="cloud3" alt="Cloud 3" class="cloud-3" ref="cloud3Ref">
        <img :src="cloud4" alt="Cloud 4" class="cloud-4" ref="cloud4Ref">

        <div class="deluxe">
            <img :src="deluxeBackSvg" alt="back deluxe" class="deluxe-back" ref="deluxeBackRef">
            <img :src="deluxeFrontSvg" alt="front deluxe" class="deluxe-front">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import deluxeFrontSvg from '@/img/svg-picture/hero-deluxe-end.svg';
import deluxeBackSvg from '@/img/svg-picture/hero-deluxe-end-pink.svg';

import cloud1 from '@/img/svg-picture/timeline_end_cloud_1.svg';
import cloud2 from '@/img/svg-picture/timeline_end_cloud_2.svg';
import cloud3 from '@/img/svg-picture/timeline_end_cloud_3.svg';
import cloud4 from '@/img/svg-picture/timeline_end_cloud_4.svg';

import soccerAnimationUrl from '@/assets/lottie/soccer.riv?url';
import unicycleAnimationUrl from '@/assets/lottie/unicycle.riv?url';
import RiveAnimation from '../ui/rive-animation/RiveAnimation.vue';

gsap.registerPlugin(ScrollTrigger);

const heroWrapper = ref<HTMLElement>();
const cloud1Ref = ref<HTMLImageElement>();
const cloud2Ref = ref<HTMLImageElement>();
const cloud3Ref = ref<HTMLImageElement>();
const cloud4Ref = ref<HTMLImageElement>();
const deluxeBackRef = ref<HTMLImageElement>();

let scrollTriggers: ScrollTrigger[] = [];

onMounted(() => {
    // 云朵的左移动画 - 保留原有效果
    const clouds = [
        { ref: cloud1Ref.value, distance: -100, duration: 1 },  // 小云朵移动较慢 
        { ref: cloud2Ref.value, distance: -200, duration: 1.5 }, // 大云朵移动较快 
        { ref: cloud3Ref.value, distance: -150, duration: 1.2 }, // 中云朵移动中等 
        { ref: cloud4Ref.value, distance: -180, duration: 1.3 }, // 中大云朵移动较快 
    ];

    clouds.forEach((cloud) => {
        if (cloud.ref) {
            const trigger = gsap.to(cloud.ref, {
                x: cloud.distance,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroWrapper.value,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: cloud.duration, // 不同的scrub值让移动速度不同 
                }
            }).scrollTrigger;

            if (trigger) {
                scrollTriggers.push(trigger);
            }
        }
    });

    // deluxe-back 的视差效果 - 轻微向上移动
    if (deluxeBackRef.value) {
        const trigger = gsap.fromTo(deluxeBackRef.value,
            {
                y: 10  // 初始位置
            },
            {
                yPercent: -15,  // 向上移动自身高度的8%
                ease: 'none',
                scrollTrigger: {
                    trigger: heroWrapper.value,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1,  // 平滑跟随滚动
                }
            }
        ).scrollTrigger;

        if (trigger) {
            scrollTriggers.push(trigger);
        }
    }
});

onBeforeUnmount(() => {
    // 清理所有ScrollTrigger 
    scrollTriggers.forEach(trigger => trigger.kill());
    scrollTriggers = [];
}); 
</script>

<style scoped>
.hero-wrapper {
    background-color: #F4ACFF;
    width: 100%;
    height: 190vh;
    position: relative;
    overflow: hidden;
}

.left-title {
    position: absolute;
    top: 1rem;
    left: 8rem;
    z-index: 1;
}

.right-title {
    position: absolute;
    bottom: 14rem;
    right: 8rem;
    z-index: 1;
    text-align: right;
}

.title {
    font-size: 10rem;
    font-weight: 600;
    letter-spacing: -1px;
    color: rgb(40, 40, 40);
    line-height: 9rem;
}

.sub-title {
    font-size: 1.2rem;
    font-weight: 600;
    max-width: 350px;
    color: rgb(40, 40, 40);
    margin-top: -5rem;
}

.soccer-animation {
    position: absolute;
    width: 65rem;
    height: auto;
    top: 13rem;
    right: -8rem;
    z-index: 3;
}

.unicycle-animation {
    position: absolute;
    width: 60rem;
    height: auto;
    bottom: 0;
    left: -7rem;
    z-index: 3;
}

/* 云朵样式 - 固定位置和大小，模拟随机分布 */
.cloud-1 {
    position: absolute;
    top: 18%;
    left: 18%;
    width: 15rem;
    height: auto;
    z-index: 2;
}

.cloud-2 {
    position: absolute;
    top: 8%;
    left: 65%;
    width: 25rem;
    height: auto;
    z-index: 2;
}

.cloud-3 {
    position: absolute;
    top: 40%;
    left: 15%;
    width: 30rem;
    height: auto;
    z-index: 2;
}

.cloud-4 {
    position: absolute;
    top: 65%;
    left: 45%;
    width: 15rem;
    height: auto;
    z-index: 2;
}

.deluxe {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 300px;
}

.deluxe-back {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.deluxe-front {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 3;
}
</style>