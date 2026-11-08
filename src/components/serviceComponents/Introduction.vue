<template>
    <div class="container">
        <RiveAnimation :src="shrugAnimationUrl" class="shrug-animation" />
        <RiveAnimation :src="climberAnimationUrl" class="climber-animation" />

        <div class="introduction-wrapper">
            <div class="description">At MadMarket, we specialise in global qualitative research that helps brands make
                smarter, faster decisions. Whether you're refining a product, exploring new markets, or launching a
                campaign, our custom research services deliver the clarity you need — without the complexity.</div>
            <div class="card-wrapper">
                <div class="card">
                    <RiveAnimation :src="researchAnimationUrl" class="rive" />
                    <h3>Qualitative Research</h3>
                    <p>This is what we do best. Our qualitative research uncovers the “why” behind human behaviour
                        through interviews, focus groups, and in-market conversations led by cultural experts. We go
                        deep, not wide, to surface insights that drive real impact across multiple markets.</p>
                </div>
                <div class="card">
                    <RiveAnimation :src="behaviorAnimationUrl" class="rive" />
                    <h3>Behavioural Analysis</h3>
                    <p>Behavioural analysis complements our qualitative work by focusing on what people actually do, not
                        just what they say. Using observational methods and real-time data, we help you understand
                        habits, patterns, and decision-making at a granular level, so you can respond with confidence.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import climberAnimationUrl from '@/assets/lottie/climber.riv?url'
import shrugAnimationUrl from '@/assets/lottie/shrug.riv?url'
import researchAnimationUrl from '@/assets/lottie/research.riv?url'
import behaviorAnimationUrl from '@/assets/lottie/behavior.riv?url'

import RiveAnimation from '../ui/rive-animation/RiveAnimation.vue'
</script>

<style scoped>
.container {
    width: 100%;
    height: 90vh;
    margin-top: -4rem;
    position: relative;
    /* 添加 position: relative */
}

.introduction-wrapper {
    width: 100%;
    height: 90vh;
    border-radius: 4rem;
    background-color: #F5F1E4;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
}

.description {
    max-width: 500px;
    margin-top: -12rem;
    font-size: 1.3rem;
    margin-right: 20rem;
    line-height: 1.6rem;
    color: #282828;
    font-weight: 600;
}

.shrug-animation {
    position: absolute;
    top: -25rem;
    left: -5rem;
    width: 45rem;
    height: auto;
    transform: scaleX(-1);
    z-index: 1;
}

.climber-animation {
    position: absolute;
    top: -54rem;
    right: -10rem;
    width: 50rem;
    height: auto;
    z-index: 1;
    transform: scaleX(-1);
}

.card-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    gap: 4rem;
    padding: 2rem;
    z-index: 20;
}

.card {
    flex: 1;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 3rem;
}

.card h3 {
    margin: 0 0 1rem 0;
    font-size: 2rem;
    color: #282828;
    font-weight: 600;
}

.card p {
    margin: 0;
    font-size: 1.3rem;
    line-height: 1.2;
    color: #282828;
    max-width: 70%;
    font-weight: 600;
}

.rive {
    width: 8rem;
    height: auto;
    margin-bottom: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .card-wrapper {
        flex-direction: column;
        width: 90%;
        gap: 1rem;
    }

    .card {
        padding: 1.5rem;
    }
}
</style>