<template>
    <div class="container">
        <RiveAnimation :src="gamerAnimationUrl" class="gamer-animation" />
        <RiveAnimation :src="scientistAnimationUrl" class="scientist-animation" />

        <div class="introduction-wrapper">
            <div class="description">At MadMarket, we help you uncover the insights that matter most — no matter your
                industry. With deep experience across a wide range of sectors, we understand the unique challenges and
                nuances each market brings. Whether you’re short on time, resources, or local context, we act as your
                research partner offering practical, cost-effective solutions tailored to your goals.</div>

            <!-- 标题列表 -->
            <div class="title-list">
                <div class="title-column" v-for="column in 2" :key="column">
                    <HoverTitle v-for="index in 6" :key="(column - 1) * 6 + index"
                        :title="getTitleItem((column - 1) * 6 + (index - 1)).title"
                        :image-src="getTitleItem((column - 1) * 6 + (index - 1)).imageSrc"
                        :image-direction="getTitleItem((column - 1) * 6 + (index - 1)).imageDirection" />
                </div>
            </div>

            <div class="notes-box">
                <div class="img-wrapper">
                    <img :src="note" alt="Research notes" class="note-image" />
                </div>
                <p class="note-text">Whether you're launching a new product, evaluating your brand positioning, or
                    exploring emerging market trends, our tailored research packages provide the deep, actionable
                    insights you need to make strategic, data-driven decisions. With MindMarket, you'll have the
                    confidence to navigate the complexities of your market and achieve your business goals.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import gamerAnimationUrl from '@/assets/lottie/gamer.riv?url';
import scientistAnimationUrl from '@/assets/lottie/scientist.riv?url';

import RiveAnimation from '../ui/rive-animation/RiveAnimation.vue'
import HoverTitle from '../ui/hover-title/HoverTitle.vue'

import title1 from '@/img/photo/title1.jpg';
import title2 from '@/img/photo/title2.jpg';
import title3 from '@/img/photo/title3.jpg';
import title4 from '@/img/photo/title4.jpg';
import title5 from '@/img/photo/title5.jpg';
import title6 from '@/img/photo/title6.jpg';
import title7 from '@/img/photo/title7.jpg';
import title8 from '@/img/photo/title8.jpg';
import title9 from '@/img/photo/title9.jpg';
import title10 from '@/img/photo/title10.jpg';
import title11 from '@/img/photo/title11.jpg';
import title12 from '@/img/photo/title12.jpg';
import note from '@/img/photo/note.jpg';

// 定义类型
interface TitleItem {
    title: string
    imageSrc: string
    imageDirection: 'left' | 'right'
}

// 定义12个标题项的数据（已替换为图片中的文字）
const titleItems: TitleItem[] = [
    {
        title: 'Automotive',
        imageSrc: title1,
        imageDirection: 'right'
    },
    {
        title: 'Sports',
        imageSrc: title2,
        imageDirection: 'left'
    },
    {
        title: 'FMCG',
        imageSrc: title3,
        imageDirection: 'right'
    },
    {
        title: 'Financial Services',
        imageSrc: title4,
        imageDirection: 'left'
    },
    {
        title: 'Crypto',
        imageSrc: title5,
        imageDirection: 'right'
    },
    {
        title: 'Consulting',
        imageSrc: title6,
        imageDirection: 'left'
    },
    {
        title: 'Technology',
        imageSrc: title7,
        imageDirection: 'right'
    },
    {
        title: 'Gaming',
        imageSrc: title8,
        imageDirection: 'left'
    },
    {
        title: 'Food & Beverage',
        imageSrc: title9,
        imageDirection: 'right'
    },
    {
        title: 'Beauty & Cosmetics',
        imageSrc: title10,
        imageDirection: 'left'
    },
    {
        title: 'Hospitality',
        imageSrc: title11,
        imageDirection: 'right'
    },
    {
        title: 'Pharmaceutical',
        imageSrc: title12,
        imageDirection: 'left'
    }
]

// 安全获取标题项的方法
const getTitleItem = (index: number): TitleItem => {
    return titleItems[index] || {
        title: '默认标题',
        imageSrc: '',
        imageDirection: 'right'
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    min-height: 135vh;
    margin-top: -4rem;
    position: relative;
}

.introduction-wrapper {
    width: 100%;
    min-height: 135vh;
    border-radius: 4rem;
    background-color: #F5F1E4;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.description {
    max-width: 500px;
    margin-top: -15rem;
    font-size: 1.3rem;
    margin-right: 20rem;
    line-height: 1.6rem;
    color: #282828;
    font-weight: 600;
    position: absolute;
    top: 0;
    right: 0;
}

.title-list {
    display: flex;
    gap: 4rem;
    width: 100%;
    max-width: 1400px;
    margin-top: -5rem;
    justify-content: center;
}

.title-column {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.gamer-animation {
    position: absolute;
    top: -24rem;
    left: -5rem;
    width: 40rem;
    height: auto;
    z-index: 1;
}

.scientist-animation {
    position: absolute;
    top: -50rem;
    right: -5rem;
    width: 45rem;
    height: auto;
    z-index: 1;
}

.notes-box {
    width: 100%;
    margin-top: 12rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20rem;
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
    font-size: 1rem;
    max-width: 500px;
    font-weight: 500;
}
</style>