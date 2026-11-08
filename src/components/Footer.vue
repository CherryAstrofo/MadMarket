<template>
    <div class="footer-wrapper">
        <div class="container">
            <!-- 左侧区域：标语、按钮、大标题和版权 -->
            <div class="left-section">
                <div class="intro-text">
                    Have a project in mind? We'd love to hear what you're working on and show you how we can help.
                    Whether you're exploring a new market or launching your next product, we're ready when you are.
                </div>
                <InteractiveButton class="cta-btn" text="Get quote" buttonBackground="#ffffff"
                    circleBackground="#F5E211" to="/signup" />

                <!-- 中间大标题 -->
                <div class="hero-title">
                    <div>Let's</div>
                    <div class="connect-wrap">
                        <!-- 使用 WaveText 子组件包裹 Connect -->
                        <WaveUnderline text="Connect" :fontSize="160" color="#8fd18c" :thickness="0.12"
                            :amplitude="0.06" :wavelength="0.8" :speed="10" class="wave-underline" />
                    </div>
                </div>

                <div class="copyright-left">
                    Copyright © 2026 MindMarket International
                </div>
            </div>

            <!-- 右侧区域：链接、地址、底部徽标 -->
            <div class="right-section">
                <div class="nav-links">
                    <ul class="col">
                        <li>Services</li>
                        <li>Methodology</li>
                        <li>Industry Sectors</li>
                        <li>Network</li>
                        <li>About Us</li>
                    </ul>
                    <ul class="col">
                        <li>Insights</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                        <li>Cookie Preferences</li>
                    </ul>
                </div>

                <div class="contact-info">
                    <div class="location">
                        <h4>Dubai</h4>
                        <p>Dubai Silicon Oasis, DDP,<br>Building A2, 341041 Dubai, UAE<br>Mon-Fri 10:00 am – 7:00 pm
                            (GST)</p>
                    </div>
                    <div class="location">
                        <h4>London</h4>
                        <p>3rd Floor, 86–90 Paul Street,<br>London EC2A 4NE, UK<br>Mon-Fri 9:00 am – 6:00 pm (GMT)
                        </p>
                    </div>
                    <div class="email-link">
                        curious@madmarket.com
                    </div>
                </div>

                <!-- 最底部（仅保留徽标和LinkedIn，版权已移除） -->
                <div class="bottom-bar-right">
                    <div class="logos-section">
                        <!-- 【修改】替换为真实的图片 esomar 徽标 -->
                        <img :src="esomarLogo" alt="esomar corporate 2026" class="esomar-logo" />

                        <div class="social-link">LinkedIn</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InteractiveButton from './ui/interactive-button/InteractiveButton.vue';
import WaveUnderline from './ui/wave-underline/WaveUnderline.vue';

import esomarLogo from '@/img/logo/sign.png'; 
</script>

<style scoped>
/* 基础容器设置 */
.footer-wrapper {
    width: 100%;
    min-height: 100vh;
    background-color: #FFE500;
    border-radius: 4rem;
    box-sizing: border-box;
    padding: 4rem 5rem 2rem;
    display: flex;
    justify-content: center;
    color: #2C2C2C;
    z-index: 10;
}

.container {
    width: 100%;
    max-width: 1400px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-top: 5rem;
}

/* --- 左侧部分 --- */
.left-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 让顶部文字和底部版权自动拉开距离 */
}

.intro-text {
    font-size: 1.35rem;
    line-height: 1.6;
    max-width: 60%;
    margin-bottom: 2rem;
    font-weight: 500;
    letter-spacing: -0.5px;
}

/* 按钮样式 */
.cta-btn {
    cursor: pointer;
    transition: all 0.2s;
    width: fit-content;
    margin-bottom: 4rem;
}

/* 大标题 */
.hero-title {
    font-size: 10rem;
    line-height: 0.9;
    font-weight: 600;
    letter-spacing: -4px;
}

/* --- 对齐 Connect 和波浪线 --- */
.connect-wrap {
    position: relative;
    display: inline-block;
    margin-top: 0.5rem;
}

.wave-underline {
    display: inline-flex;
    align-items: flex-end;
}

/* 左侧底部的版权信息 */
.copyright-left {
    font-size: 1.15rem;
    color: #1d1d1d;
    padding-top: 2rem;
    /* 与大标题隔开一定距离 */
    font-weight: 500;
}

/* --- 右侧部分 --- */
.right-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 让地址和底部徽标自动撑开到上下两端 */
    padding-top: 1rem;
    margin-left: 10rem;
}

.nav-links {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
}

.nav-links ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.nav-links li {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    cursor: pointer;
    transition: opacity 0.2s;
}

.nav-links li:hover {
    text-decoration: underline;
}

.contact-info {
    margin-bottom: 2rem;
}

.location {
    margin-bottom: 2rem;
}

.location h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
}

.location p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    color: #4a4a4a;
}

.email-link {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 2rem;
}

/* --- 右侧底部栏 (移除了版权) --- */
.bottom-bar-right {
    display: flex;
    padding-top: 2rem;
}

.logos-section {
    display: flex;
    align-items: center;
    gap: 2rem;
}

/* 【修改】真实图片的样式 */
.esomar-logo {
    display: block;
    height: 24px;
    width: auto;
    object-fit: contain;
}

.social-link {
    font-size: 1.25rem;
    margin-left: 10rem;
    font-weight: 600;
    cursor: pointer;
}

/* --- 响应式适配 --- */
@media (max-width: 1024px) {
    .container {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .footer-wrapper {
        padding: 3rem;
        border-radius: 2rem;
    }

    .hero-title {
        font-size: 6rem;
    }

    .intro-text {
        max-width: 100%;
    }

    .right-section {
        margin-left: 0;
        /* 平板及以下移除大间距 */
    }
}

@media (max-width: 600px) {
    .hero-title {
        font-size: 4rem;
    }

    .nav-links {
        grid-template-columns: 1fr 1fr;
    }

    /* 移动端时底部右侧徽标改为居左，与左侧保持一致 */
    .bottom-bar-right {
        justify-content: flex-start;
    }
}
</style>