<template>
    <div class="number-wrapper" ref="wrapperRef">
        <!-- 左侧标题区域 -->
        <div class="title">
            <div>A few numbers</div>
            <div class="line">
                behind the
                <WaveUnderline text="insights" :font-size="70" color="#EBC1FF" :speed="8" :amplitude="0.1"
                    :thickness="0.12" :wavelength="1" />
            </div>
            <div>we deliver</div>
        </div>

        <!-- 小标题 -->
        <div class="subtitle">
            These numbers are more than just milestones. They represent the strength of our connections,
            the consistency of our work, and the real-world impact we help create for you.
        </div>

        <!-- ===== 右侧卡片区域 ===== -->
        <div class="cards-wrapper" ref="cardsWrapperRef">
            <!-- 三张卡片，按顺序叠放 -->
            <div class="single-card-wrapper card-1" ref="card1Ref">
                <NumberCard :number-text="cardData1.number" :description="cardData1.description" :icon="cardData1.icon"
                    :primary-color="cardData1.primaryColor" :secondary-color="cardData1.secondaryColor" />
            </div>
            <div class="single-card-wrapper card-2" ref="card2Ref">
                <NumberCard :number-text="cardData2.number" :description="cardData2.description" :icon="cardData2.icon"
                    :primary-color="cardData2.primaryColor" :secondary-color="cardData2.secondaryColor" />
            </div>
            <div class="single-card-wrapper card-3" ref="card3Ref">
                <NumberCard :number-text="cardData3.number" :description="cardData3.description" :icon="cardData3.icon"
                    :primary-color="cardData3.primaryColor" :secondary-color="cardData3.secondaryColor" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WaveUnderline from '../ui/wave-underline/WaveUnderline.vue';
import NumberCard from '../ui/number-card/NumberCard.vue';
import { GlobeAsiaAustraliaIcon, CheckIcon, HeartIcon } from '@heroicons/vue/24/outline';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 模板引用
const wrapperRef = ref<HTMLElement | null>(null);
const card1Ref = ref<HTMLElement | null>(null);
const card2Ref = ref<HTMLElement | null>(null);
const card3Ref = ref<HTMLElement | null>(null);

// 三张卡片的数据
const cardData1 = {
    number: '60+',
    description: ['Our network spans over 60 countries, giving', 'you local insight with global consistency.'],
    icon: GlobeAsiaAustraliaIcon,
    primaryColor: '#FFFFFF',
    secondaryColor: '#2BA0FF'
};

const cardData2 = {
    number: '400',
    description: ['We\'ve successfully delivered more than 400', 'research projects around the world — and counting.'],
    icon: CheckIcon,
    primaryColor: '#8ED462',
    secondaryColor: '#FFFFFF'
};

const cardData3 = {
    number: '50+',
    description: ['From global brands to growing startups,', 'more than 50 clients have partnered with us.'],
    icon: HeartIcon,
    primaryColor: '#FF705D',
    secondaryColor: '#FFFFFF'
};

let scrollTrigger: ScrollTrigger | null = null;

onMounted(() => {
    // 确保 DOM 元素存在
    if (!wrapperRef.value || !card1Ref.value || !card2Ref.value || !card3Ref.value) return;

    // 设置三张卡片的初始位置和旋转角度
    gsap.set(card1Ref.value, {
        y: window.innerHeight,
        rotation: -8, // 第一张卡片初始向左倾斜 8 度
        transformOrigin: 'center center', // 设置旋转中心
    });

    gsap.set(card2Ref.value, {
        y: window.innerHeight,
        rotation: 6, // 第二张卡片初始向右倾斜 6 度
        transformOrigin: 'center center',
    });

    gsap.set(card3Ref.value, {
        y: window.innerHeight,
        rotation: -10, // 第三张卡片初始向左倾斜 10 度
        transformOrigin: 'center center',
    });

    // 创建主时间线
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: wrapperRef.value,
            start: 'top top',
            end: '+=300%',
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            // markers: true, // 开发时可以取消注释查看触发点
        }
    });

    // 第一张卡片动画：从下方移入并旋转到水平
    mainTimeline.to(card1Ref.value, {
        y: 0,
        rotation: 0, // 旋转到水平位置
        ease: 'power2.out',
        duration: 1,
    }, 0);

    // 第二张卡片动画：从下方移入并旋转到水平
    mainTimeline.to(card2Ref.value, {
        y: '5rem',
        rotation: 0, // 旋转到水平位置
        ease: 'power2.out',
        duration: 1,
    }, 1);

    // 第三张卡片动画：从下方移入并旋转到水平
    mainTimeline.to(card3Ref.value, {
        y: '10rem',
        rotation: 0, // 旋转到水平位置
        ease: 'power2.out',
        duration: 1,
    }, 2);

    scrollTrigger = mainTimeline.scrollTrigger as ScrollTrigger;
});

onUnmounted(() => {
    // 清理 ScrollTrigger 实例
    if (scrollTrigger) {
        scrollTrigger.kill();
    }
    // 清理所有 ScrollTrigger
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style scoped>
.number-wrapper {
    width: 100%;
    height: 120vh;
    overflow: hidden;
    border-radius: 4rem;
    position: relative;
    background-color: #f5f1e4;
}

/* 标题 */
.title {
    position: absolute;
    left: 10vw;
    top: 20vh;
    font-size: 70px;
    line-height: 1.1;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: #000;
    z-index: 10;
}

.line {
    display: flex;
    align-items: baseline;
    gap: 0.25em;
}

/* 小标题 */
.subtitle {
    position: absolute;
    left: 10vw;
    top: calc(20vh + 240px);
    max-width: 450px;
    margin-top: 8rem;
    font-size: 18px;
    line-height: 1.8;
    font-weight: 500;
    color: #555;
    letter-spacing: 0.01em;
    z-index: 10;
}

/* ===== 右侧卡片区域 ===== */
.cards-wrapper {
    position: absolute;
    right: 25vw;
    top: 20vh;
    width: 220px;
    /* 高度根据需要调整 */
    height: 400px;
}

.single-card-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* GSAP 会控制 Y 轴位置 */
}

/* 设置卡片的 z-index，后一张卡片覆盖前一张 */
.card-1 {
    z-index: 1;
}

.card-2 {
    z-index: 2;
}

.card-3 {
    z-index: 3;
}

/* 响应式 */
@media (max-width: 1200px) {
    .title {
        font-size: 56px;
    }

    .subtitle {
        top: calc(20vh + 200px);
        font-size: 16px;
    }

    .cards-wrapper {
        width: 200px;
        right: 20vw;
    }
}

@media (max-width: 768px) {
    .number-wrapper {
        height: auto;
        padding: 40px 20px;
        border-radius: 2rem;
    }

    .title {
        position: relative;
        left: 0;
        top: 0;
        font-size: 40px;
    }

    .subtitle {
        position: relative;
        left: 0;
        top: 0;
        margin-top: 2rem;
        max-width: 100%;
    }

    .cards-wrapper {
        position: relative;
        right: 0;
        top: 0;
        margin-top: 3rem;
        width: 100%;
        max-width: 280px;
        margin-left: auto;
        margin-right: auto;
        height: auto;
    }

    .single-card-wrapper {
        position: relative;
        margin-bottom: 2rem;
    }
}
</style>