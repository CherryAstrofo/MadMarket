<template>
    <div class="country-wrapper">
        <!-- 第一个 -->
        <div class="country-box">
            <div class="content">
                <div class="title">Translation and Transcripts</div>
                <div class="description">Whether you need stimuli translated or the full transcripts of focus group
                    recordings, MindMarket works with a global network of professional linguists, which allows us to
                    offer quicker turnaround times than most agencies. Our researchers can then use the collected
                    insights for their analysis and reporting.​</div>

                <HoverImageCard3 :image-src="figure1" image-alt="Translation services" class="mt-8">
                    <p class="card-description">Cross-Border UX Research: Unifying Online Grocery Shopping Across Latin
                        America</p>
                </HoverImageCard3>
            </div>

            <RotatingImage :image-src="country1" image-alt="Brazil" direction="left" :tilt-angle="15"
                :initial-y-offset="150" />
        </div>
        <!-- 第二个 -->
        <div class="country-box">
            <div class="content">
                <div class="title">APAC</div>
                <div class="description">Navigate the Asia-Pacific region's remarkable diversity with research that
                    balances respect for tradition with understanding of rapid modernisation. Our insights help you
                    tailor strategies for markets ranging from Australia's sophisticated consumers to India's young,
                    digitally-connected population and Southeast Asia's dynamic economies.​</div>

                <HoverImageCard3 :image-src="figure2" image-alt="Translation services" class="mt-8">
                    <p class="card-description">Uncovering Consumer Behaviours in Emerging Nicotine Markets</p>
                </HoverImageCard3>
            </div>

            <RotatingImage :image-src="country2" image-alt="Sydney" direction="right" :tilt-angle="15"
                :initial-y-offset="150" />
        </div>
        <!-- 第三个 -->
        <div class="country-box">
            <div class="content">
                <div class="title">The Middle East</div>
                <div class="description">Capitalise on the region's unique blend of traditional values and progressive
                    aspirations with research that respects cultural nuances while revealing commercial opportunities.
                    From the UAE's cosmopolitan hubs to Saudi Arabia's evolving consumer landscape, our insights help
                    you navigate complex market dynamics with confidence.​</div>

                <HoverImageCard3 :image-src="figure3" image-alt="Translation services" class="mt-8">
                    <p class="card-description">Understanding Consumer Behaviour in the Middle East: Key Insights for
                        Global Companies</p>
                </HoverImageCard3>
            </div>

            <RotatingImage :image-src="country3" image-alt="Dubai" direction="left" :tilt-angle="15"
                :initial-y-offset="150" />
        </div>
        <!-- 第四个 -->
        <div class="country-box">
            <div class="content">
                <div class="title">Europe</div>
                <div class="description">From uncovering the sustainability preferences of Nordic consumers to mapping
                    the digital adoption journey in Southern Europe, our teams provide nuanced understanding of Europe's
                    diverse markets.​</div>

                <HoverImageCard3 :image-src="figure4" image-alt="Translation services" class="mt-8">
                    <p class="card-description">Pan-European Crypto UX Research: Unlocking Onboarding Insights Across
                        Six Markets</p>
                </HoverImageCard3>
            </div>

            <RotatingImage :image-src="country4" image-alt="Europe" direction="right" :tilt-angle="15"
                :initial-y-offset="150" />
        </div>
        <!-- 第五个 -->
        <div class="country-box">
            <div class="content">
                <div class="title">East Asia</div>
                <div class="description">Decode the sophisticated preferences of consumers in China, Japan, South Korea
                    and beyond with research that balances technological innovation with cultural context. Our insights
                    reveal how to succeed in markets where consumer expectations are exceptionally high and digital
                    transformation leads global trends.​</div>

                <HoverImageCard3 :image-src="figure5" image-alt="Translation services" class="mt-8">
                    <p class="card-description">Understanding East Asian Consumer Behaviour: A Guide for Global Brands
                    </p>
                </HoverImageCard3>
            </div>

            <RotatingImage :image-src="country5" image-alt="Tokyo" direction="left" :tilt-angle="15"
                :initial-y-offset="150" />
        </div>
        <!-- 第六个 -->
        <div class="country-box">
            <div class="content">
                <div class="title">Africa</div>
                <div class="description">Unlock the potential of Africa's fastest-growing economies with research that
                    goes beyond demographics to reveal genuine consumer motivations. We help you identify opportunities
                    across diverse markets from South Africa to Nigeria, Kenya to Morocco, with insights that balance
                    continental trends with local market realities.​</div>

                <HoverImageCard3 :image-src="figure6" image-alt="Translation services" class="mt-8">
                    <p class="card-description">Cross-Border UX Research: Unifying Online Grocery Shopping Across Latin
                        America</p>
                </HoverImageCard3>
            </div>

            <RotatingImage :image-src="country6" image-alt="Africa" direction="right" :tilt-angle="15"
                :initial-y-offset="150" />
        </div>
    </div>
</template>

<script setup lang="ts">
import RotatingImage from '@/components/ui/rotating-image/RotatingImage.vue';
import HoverImageCard3 from '@/components/ui/hover-image-card/HoverImageCard3.vue';

import country1 from '@/img/photo/Brazil.jpg';
import country2 from '@/img/photo/Sidney.jpg';
import country3 from '@/img/photo/Dubai.jpg';
import country4 from '@/img/photo/Europe.jpg';
import country5 from '@/img/photo/Tokyo.jpg';
import country6 from '@/img/photo/Africa.jpg';

import figure1 from '@/img/photo/figure1.jpg';
import figure2 from '@/img/photo/figure2.jpg';
import figure3 from '@/img/photo/figure3.jpg';
import figure4 from '@/img/photo/figure4.jpg';
import figure5 from '@/img/photo/figure5.jpg';
import figure6 from '@/img/photo/figure6.jpg';
</script>

<style scoped>
.country-wrapper {
    position: relative;
    width: 100%;
    min-height: 450vh;
    border-radius: 4rem;
    background-color: #E0DBCE;
    display: flex;
    flex-direction: column;
    justify-content: start;
}

.country-box {
    width: 100%;
    height: 60vh;
    display: flex;
    flex-direction: row;
    padding: 8rem 10rem 0 8rem;
    border-bottom: 0.5px solid #383838;
    gap: 2.7rem;
}

.country-box:last-child {
    border-bottom: none;
}

.content {
    width: 750px;
    height: auto;
    display: flex;
    flex-direction: column;
}

.title {
    font-size: 2.25rem;
    font-weight: 600;
    letter-spacing: -1px;
}

.description {
    margin-top: 3.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    max-width: 400px;
    min-height: 120px;
    /* 根据最长描述调整，确保所有描述都能显示 */
    display: -webkit-box;
    -webkit-line-clamp: 6;
    /* 限制最多显示5行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 卡片相关样式 */
.mt-8 {
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.card-description {
    font-size: 1rem;
    color: #666;
    line-height: 1.4;
    margin: 0;
}
</style>