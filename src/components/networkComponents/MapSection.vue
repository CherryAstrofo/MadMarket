<template>
    <div class="map-wrapper">
        <div class="introduction" ref="introRef">
            <span v-for="(word, index) in words" :key="index" class="word" :ref="el => setWordRef(el, index)">
                {{ word }}
            </span>
        </div>

        <div class="notes-box">
            <div class="img-wrapper">
                <img :src="network" alt="Research notes" class="note-image" />
            </div>
            <p class="note-text">Whether you're launching in Tokyo, São Paulo, or Stockholm, MindMarket is already
                there.</p>
        </div>

        <div ref="mapContainerRef" class="map-container-wrapper">
            <GlobalMap />
        </div>

        <CardGallery />

        <div class="notes-box">
            <div class="subtitle">
                Our Network
            </div>
            <p class="note-text">Whether you're exploring established economies or emerging markets, testing new product
                concepts or refining your customer experience, our global network delivers insights that drive
                meaningful business outcomes:</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import network from '@/img/photo/network.jpg'
import GlobalMap from './GlobalMap.vue'
import CardGallery from './CardGallery.vue'

gsap.registerPlugin(ScrollTrigger)

const introRef = ref(null)
const wordRefs = ref([])
const mapContainerRef = ref(null)

const text = "At MindMarket, we're more than just a market research agency — we're your dedicated partner in uncovering the authentic voices that drive innovation and shape tomorrow's success stories. Our global network spans key markets across Europe, the Middle East, Asia, the Americas, and beyond, providing you with seamless access to consumer insights that empower strategic decision-making and business growth."

const words = text.split(' ')

const setWordRef = (el, index) => {
    if (el) {
        wordRefs.value[index] = el
    }
}

let scrollTrigger
let mapScrollTrigger

onMounted(() => {
    // 初始化所有单词为灰色
    gsap.set(wordRefs.value, { color: '#D1CFC7' })

    // 创建文字动画时间线
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: introRef.value,
            start: 'top 80%',
            end: 'center center',
            scrub: 0.5,
        }
    })

    // 为每个单词添加动画
    wordRefs.value.forEach((wordEl, index) => {
        tl.to(wordEl, {
            color: '#1a1a1a',
            duration: 0.5,
            ease: 'none',
        }, index * 0.1)
    })

    scrollTrigger = tl.scrollTrigger

    // GlobalMap 放大动画
    if (mapContainerRef.value) {
        mapScrollTrigger = gsap.to(mapContainerRef.value, {
            scale: 1.3,
            ease: 'none',
            scrollTrigger: {
                trigger: mapContainerRef.value,
                start: 'top 80%', // 当地图容器顶部到达视口80%位置时开始
                end: 'center center', // 当地图容器中心到达视口中心时结束
                scrub: 0.5, // 平滑滚动
            }
        }).scrollTrigger
    }
})

onBeforeUnmount(() => {
    if (scrollTrigger) {
        scrollTrigger.kill()
    }
    if (mapScrollTrigger) {
        mapScrollTrigger.kill()
    }
})
</script>

<style scoped>
.map-wrapper {
    position: relative;
    width: 100%;
    min-height: 300vh;
    border-radius: 0 0 4rem 4rem;
    display: flex;
    flex-direction: column;
    background-color: #F5F1E4;
}

.introduction {
    justify-self: center;
    font-size: 2.9rem;
    font-weight: 600;
    margin: 5rem 5rem;
    line-height: 1.2;
}

.word {
    display: inline-block;
    margin-right: 0.25em;
    color: #D1CFC7;
    transition: color 0.1s ease;
}

.notes-box {
    width: 100%;
    margin-top: 12rem;
    margin-bottom: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20rem;
}

.subtitle {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.img-wrapper {
    width: 400px;
    height: auto;
}

.note-image {
    width: 100%;
    height: 100%;
    border-radius: 2rem;
}

.note-text {
    font-size: 2rem;
    max-width: 500px;
    font-weight: 600;
}

.note-text:last-child {
    font-size: 1.25rem;
}

.map-container-wrapper {
    margin-top: 10rem;
    display: flex;
    justify-content: center;
    transform-origin: center center;
    will-change: transform;
}
</style>