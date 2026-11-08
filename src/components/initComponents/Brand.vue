<template>
    <div class="brand-wrapper" ref="brandWrapper">
        <div class="card-wrapper">
            <!-- 左侧：brand1 -->
            <div class="left-section">
                <HoverImageCard2 :imageUrl="brandImage1" :tags="['Worldwide', 'Case Studies']"
                    description="How a Global Asset Manager Tested Its Rebrand with CIOs, Consultants and Fund Selectors Across Seven Markets"
                    width="100%" height="100%" />
            </div>

            <!-- 右侧：分为上下两部分 -->
            <div class="right-section">
                <!-- 右上：brand2 -->
                <div class="right-top">
                    <HoverImageCard2 :imageUrl="brandImage2" :tags="['North America', 'Europe', 'Case Studies']"
                        description="Brewing the Perfect Blend: A 500-Person Coffee Taste Test Across London and New York"
                        width="100%" height="100%" />
                </div>

                <!-- 右下：brand3 和 brand4 并排 -->
                <div class="right-bottom">
                    <div class="bottom-item">
                        <HoverImageCard2 :imageUrl="brandImage3" :tags="['Worldwide', 'Methodology', 'Educational']"
                            description="How to Run Live Venues: Methods That Capture What Surveys Miss" width="100%"
                            height="100%" />
                    </div>
                    <div class="bottom-item">
                        <HoverImageCard2 :imageUrl="brandImage4" :tags="['Worldwide', 'Educational', 'Methodology']"
                            description="How to Choose the Right Qualitative Research Methodology" width="100%"
                            height="100%" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 标题部分 -->
        <div class="title-container">
            <div class="title-line">Brands that choose</div>
            <div class="title-line">MadMarket</div>
        </div>

        <div class="marquee-container" ref="marqueeContainer">
            <Marquee :items="brandList1" :direction="direction1" :speed="30" />
            <Marquee :items="brandList2" :direction="direction2" :speed="30" />
            <Marquee :items="brandList3" :direction="direction3" :speed="30" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HoverImageCard2 from '../ui/hover-image-card/HoverImageCard2.vue';
import Marquee from '../ui/marquee/Marquee.vue';
import brandImage1 from '@/img/photo/brand1.jpg';
import brandImage2 from '@/img/photo/brand2.jpg';
import brandImage3 from '@/img/photo/brand3.jpg';
import brandImage4 from '@/img/photo/brand4.jpg';

import appleIcon from '@/img/logo/apple.png';
import discordIcon from '@/img/logo/discord.svg';
import paypalIcon from '@/img/logo/paypal.png';
import walmartIcon from '@/img/logo/walmart.png';
import moetChandonIcon from '@/img/logo/moet-chandon.png';
import coinbaseIcon from '@/img/logo/coinbase.png';
import airbnbIcon from '@/img/logo/airbnb.png';

import googleIcon from '@/img/logo/google.png';
import youTubeIcon from '@/img/logo/youtube.png';
import uberIcon from '@/img/logo/uber.png';
import metaIcon from '@/img/logo/meta.png';
import citizensBankIcon from '@/img/logo/citizens-bank.svg';

import amazonIcon from '@/img/logo/amazon.svg';
import whatsAppIcon from '@/img/logo/whatsapp.png';
import nielsenIQIcon from '@/img/logo/nielseniq.png';
import HPIcon from '@/img/logo/hp.png';
import answerLabIcon from '@/img/logo/answerlab.png';
import starbucksIcon from '@/img/logo/starbucks.png';

gsap.registerPlugin(ScrollTrigger);

// 响应式方向状态
const direction1 = ref('left');
const direction2 = ref('right');
const direction3 = ref('left');

const brandWrapper = ref(null);
const marqueeContainer = ref(null);

const brandList1 = [
    { name: 'Apple', icon: appleIcon },
    { name: 'Discord', icon: discordIcon },
    { name: 'Paypal', icon: paypalIcon },
    { name: 'Walmart', icon: walmartIcon },
    { name: 'Moët & Chandon', icon: moetChandonIcon },
    { name: 'Coinbase', icon: coinbaseIcon },
    { name: 'Airbnb', icon: airbnbIcon },
];

const brandList2 = [
    { name: 'Google', icon: googleIcon },
    { name: 'YouTube', icon: youTubeIcon },
    { name: 'Uber', icon: uberIcon },
    { name: 'Meta', icon: metaIcon },
    { name: 'Citizens Bank', icon: citizensBankIcon },
];

const brandList3 = [
    { name: 'Amazon', icon: amazonIcon },
    { name: 'WhatsApp', icon: whatsAppIcon },
    { name: 'Nielsen IQ', icon: nielsenIQIcon },
    { name: 'HP', icon: HPIcon },
    { name: 'AnswerLab', icon: answerLabIcon },
    { name: 'Starbucks', icon: starbucksIcon },
];

// 根据滚动方向更新三个跑马灯方向
const updateMarqueeDirections = (direction) => {
    // direction: 1 表示向下滚动, -1 表示向上滚动
    if (direction === 1) {
        // 向下滚动
        direction1.value = 'left';
        direction2.value = 'right';
        direction3.value = 'left';
    } else {
        // 向上滚动
        direction1.value = 'right';
        direction2.value = 'left';
        direction3.value = 'right';
    }
    // 子组件会自动监听direction变化并原地换向
};

// 创建ScrollTrigger
let scrollTriggerInstance = null;

onMounted(() => {
    const triggerElement = marqueeContainer.value || brandWrapper.value;

    if (!triggerElement) return;

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top bottom', // 当元素顶部进入视口底部
        end: 'bottom top',   // 当元素底部离开视口顶部
        onUpdate: (self) => {
            const direction = self.direction;
            updateMarqueeDirections(direction);
        },
    });
});

onBeforeUnmount(() => {
    if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
    }
});
</script>

<style scoped>
.brand-wrapper {
    width: 100%;
    min-height: 120vh;
    border-radius: 4rem;
    background-color: #E0DBCE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-bottom: 18rem;
}

.card-wrapper {
    margin-top: 10rem;
    display: flex;
    max-width: 1400px;
    width: 100%;
    height: 900px;
    gap: 20px;
}

/* 左侧部分 - 占据一半宽度 */
.left-section {
    flex: 1;
    min-width: 0;
    height: 100%;
}

/* 右侧部分 - 占据一半宽度 */
.right-section {
    flex: 1;
    min-width: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

/* 右上部分 */
.right-top {
    flex: 1;
    min-height: 0;
}

/* 右下部分 */
.right-bottom {
    flex: 1;
    min-height: 0;
    display: flex;
    gap: 20px;
}

/* 右下两个卡片 */
.bottom-item {
    flex: 1;
    min-width: 0;
}

/* 标题容器 */
.title-container {
    margin-top: 10rem;
    text-align: center;
    line-height: 1.2;
}

.title-line {
    font-size: 3.5rem;
    font-weight: 600;
    color: #333;
    letter-spacing: -0.05em;
}

.marquee-container {
    margin-top: 3rem;
    width: 100%;
    margin-bottom: -2rem;
}
</style>