<template>
    <div class="gallery-container">
        <div class="header">
            <div class="title">A Unified Network</div>

            <div class="direct-button-group">
                <button class="icon-btn" aria-label="向左浏览" @click="moveLeft">
                    <ChevronLeftIcon class="icon" />
                </button>

                <button class="icon-btn" aria-label="向右浏览" @click="moveRight">
                    <ChevronRightIcon class="icon" />
                </button>
            </div>
        </div>

        <div class="gallery-preview">
            <div class="gallery-track" :style="{
                transform: `translateX(calc(50% - ${currentIndex * 466 + 120}px))`
            }">
                <div v-for="(card, index) in cards" :key="index" class="card">
                    <!-- 卡片标题 -->
                    <h3 class="card-title">{{ card.title }}</h3>
                    <!-- 卡片描述 -->
                    <p class="card-desc">{{ card.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

// 更新卡片数据，后四张为图片所示内容
const cards = [
    {
        title: 'Local Expertise with Global Perspective',
        description: 'Our teams combine deep cultural understanding with international research excellence, ensuring you receive insights that are both locally authentic and globally relevant.'
    },
    {
        title: 'Single Point of Contact',
        description: "No matter how many markets you're exploring, you'll work with one dedicated project manager who orchestrates your entire multi-market research journey."
    },
    {
        title: 'Consistent Methodology',
        description: 'Experience the same rigorous research standards across all markets, delivering comparable insights that inform cohesive international strategies'
    },
    {
        title: 'Time Zone Coverage',
        description: "With offices in London, Dubai, and team members in South America, we're aligned with your working hours, ensuring responsive support whenever you need us"
    },
    {
        title: 'Cross-Market Learning',
        description: 'Identify patterns, trends, and opportunities across regions that might otherwise remain undiscovered, giving your business a competitive advantage'
    }
]

const currentIndex = ref(2)

const moveLeft = () => {
    if (currentIndex.value > 1) {
        currentIndex.value--
    }
}

const moveRight = () => {
    if (currentIndex.value < cards.length - 1) {
        currentIndex.value++
    }
}
</script>

<style scoped>
.gallery-container {
    margin-top: 20rem;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
}

.header {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.title {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #1e293b;
    line-height: 1.2;
    margin: 0;
    padding: 0;
}

.direct-button-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
}

.icon-btn {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: none;
    background-color: #F5E211;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    padding: 0;
    isolation: isolate;
    flex-shrink: 0;
}

.icon-btn::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%) scale(0);
    z-index: -1;
    pointer-events: none;
}

.icon-btn:hover::before {
    animation: whiteCircleIn 0.5s cubic-bezier(0.25, 0.8, 0.35, 1) forwards;
}

.icon-btn:not(:hover)::before {
    animation: whiteCircleOut 0.45s cubic-bezier(0.25, 0.8, 0.35, 1) forwards;
}

@keyframes whiteCircleIn {
    0% {
        transform: translate(-50%, -50%) scale(0);
    }

    70% {
        transform: translate(-50%, -50%) scale(1.12);
    }

    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}

@keyframes whiteCircleOut {
    0% {
        transform: translate(-50%, -50%) scale(1);
    }

    30% {
        transform: translate(-50%, -50%) scale(1.12);
    }

    100% {
        transform: translate(-50%, -50%) scale(0);
    }
}

.icon {
    width: 1rem;
    height: 1rem;
    stroke-width: 3;
    position: relative;
    z-index: 1;
}

.gallery-preview {
    width: 200%;
    overflow: visible;
    position: relative;
}

.gallery-track {
    width: max-content;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: transform;
}

/* 卡片样式：顶部标题，底部描述，更贴合图片视觉 */
.card {
    width: 450px;
    height: 500px;
    flex: 0 0 450px;
    background: white;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 标题在顶，描述在底 */
    padding: 2.5rem;
    box-sizing: border-box;
    color: #3a3a3a;
    transition: all 0.3s ease;
}

/* 卡片标题样式：加粗，并合理设定宽度以支持换行 */
.card-title {
    font-size: 2.25rem;
    font-weight: 600;
    color: #1e293b;
    line-height: 1.1;
    margin: 0;
    letter-spacing: -0.02em;
    max-width: 90%;
    /* 限制标题宽度使其自然换行，如 Consistent Methodology */
}

/* 卡片描述样式 */
.card-desc {
    font-size: 1.15rem;
    color: #2a2a2a;
    font-weight: 500;
    line-height: 1.4;
    margin: 0;
}

.card:hover {
    background-color: #fafafa;
    color: #64748b;
}

@media (max-width: 480px) {
    .title {
        font-size: 1.5rem;
    }

    .icon-btn {
        width: 2.5rem;
        height: 2.5rem;
    }

    .icon-btn::before {
        width: 2.5rem;
        height: 2.5rem;
    }

    .icon {
        width: 1.2rem;
        height: 1.2rem;
    }

    .gallery-container {
        padding: 1.5rem 1rem;
        margin-top: 2rem;
    }

    .card {
        width: 300px;
        height: 350px;
        flex: 0 0 300px;
        padding: 1.5rem;
    }

    .card-title {
        font-size: 1.4rem;
    }

    .card-desc {
        font-size: 0.9rem;
    }
}
</style>