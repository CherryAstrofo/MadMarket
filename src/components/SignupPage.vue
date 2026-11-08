<template>
    <div class="wrapper">
        <div class="nav-container">
            <NavigationBar />
        </div>
        <div class="signup-box">
            <div class="title">
                <div>Let's Start A</div>
                <div>
                    <WaveUnderline text="Conversation" :fontSize="80" color="#8fd18c" :thickness="0.12"
                        :amplitude="0.06" :wavelength="0.8" :speed="10" />
                </div>
            </div>
            <div class="connnection">
                <div>Want to talk sooner?</div>
                <div>📅 Book an instant 15-minute call</div>
                <div>📧 Email us directly → <span>curious@madmarket.com</span></div>
                <div>🔥 Current availability: 2 project slots for August delivery</div>
            </div>

            <div class="format-container">
                <div class="format-item">
                    <label class="format-label" for="fullName">Full Name<span class="required">*</span></label>
                    <input id="fullName" v-model="form.fullName" class="format-input" type="text"
                        placeholder="Enter your full name" />
                </div>

                <div class="format-item">
                    <label class="format-label" for="workEmail">Work Email<span class="required">*</span></label>
                    <input id="workEmail" v-model="form.workEmail" class="format-input" type="email"
                        placeholder="Enter your work email" />
                </div>

                <!-- Company 与 How did you hear about us? 并排 -->
                <div class="format-row">
                    <div class="format-item">
                        <label class="format-label" for="company">Company<span class="required">*</span></label>
                        <input id="company" v-model="form.company" class="format-input" type="text"
                            placeholder="Enter your company" />
                    </div>

                    <div class="format-item">
                        <label class="format-label" for="inquiryOptionId">
                            How did you hear about us?<span class="required">*</span>
                        </label>
                        <div class="select-wrapper">
                            <select id="inquiryOptionId" v-model="form.inquiryOptionId" class="format-input">
                                <option :value="null" disabled>Select an option</option>
                                <option v-for="opt in inquiryOptions" :key="opt.id" :value="opt.id">
                                    {{ opt.name }}
                                </option>
                            </select>
                            <span class="select-arrow" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Challenges -->
                <div class="format-item">
                    <label class="format-label" for="challenges">
                        What's the main challenge you're trying to solve?<span class="required">*</span>
                    </label>
                    <textarea id="challenges" v-model="form.challenges" class="format-input" rows="8"
                        placeholder="e.g., We need to understand why our product/service isn't resonating in the German market..."></textarea>
                </div>

                <!-- 底部：左侧文案 + 右侧按钮 -->
                <div class="submit-row">
                    <div class="submit-hint">
                        Join 50+ global brands getting<br />
                        better insights, faster
                    </div>

                    <InteractiveButton class="submit-btn" :text="submitting ? 'Submitting...' : 'Get Your Proposal'"
                        :button-background="'#8ED462'" :circle-background="'#ffffff'" @click="handleSubmit" />
                </div>

                <!-- reCAPTCHA 提示 -->
                <p class="recaptcha-notice">
                    This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Privacy Policy</a>
                    and
                    <a href="https://policies.google.com/terms" target="_blank" rel="noopener">Terms of Service</a>
                    apply.
                </p>
            </div>
        </div>
        <Footer class="footer" />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import WaveUnderline from './ui/wave-underline/WaveUnderline.vue';
import NavigationBar from './navComponents/NavigationBar.vue';
import InteractiveButton from './ui/interactive-button/InteractiveButton.vue';
import { getInquiryOptions, createContactor } from '../api/contactor';
import Footer from './Footer.vue';

interface InquiryOption {
    id: number;
    name: string;
    sortOrder: number;
    enabled: boolean;
}

const form = reactive({
    fullName: '',
    workEmail: '',
    company: '',
    inquiryOptionId: null as number | null,
    challenges: '',
});

const inquiryOptions = ref<InquiryOption[]>([]);
const submitting = ref(false);

onMounted(async () => {
    try {
        const res = await getInquiryOptions();
        inquiryOptions.value = res.data;
    } catch (err) {
        console.error('获取选项失败', err);
    }
});

async function handleSubmit() {
    if (submitting.value) return;
    if (!form.fullName || !form.workEmail || !form.inquiryOptionId) {
        alert('请填写必填项：姓名、工作邮箱、了解渠道');
        return;
    }
    submitting.value = true;
    try {
        const res = await createContactor({
            fullName: form.fullName,
            workEmail: form.workEmail,
            company: form.company,
            inquiryOptionId: form.inquiryOptionId,
            challenges: form.challenges,
        });
        console.log('提交成功', res.data);
        alert('提交成功！');
        form.fullName = '';
        form.workEmail = '';
        form.company = '';
        form.inquiryOptionId = null;
        form.challenges = '';
    } catch (err) {
        console.error('提交失败', err);
        alert('提交失败，请稍后重试');
    } finally {
        submitting.value = false;
    }
}
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: auto;
    background: #F5F1E4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.nav-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 8px 20px;
    box-sizing: border-box;
}

.nav-container> :deep(.navigation-bar) {
    width: 100%;
    max-width: 1300px;
}

.signup-box {
    margin-top: 10rem;
    width: 50%;
    height: auto;
    margin-bottom: 10rem;
}

.title {
    font-size: 80px;
    font-weight: 600;
}

.connnection {
    font-size: 18px;
    font-weight: 500;
    margin-top: 2rem;
    line-height: 2;
}

.connnection span {
    font-weight: 700;
}

.format-container {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.format-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.format-row {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
}

.format-row .format-item {
    flex: 1;
    min-width: 0;
}

.format-label {
    font-size: 18px;
    font-weight: 500;
}

.required {
    color: #e53935;
    margin-left: 2px;
}

.format-input {
    width: 100%;
    padding: 1.2rem 1.2rem;
    font-size: 16px;
    background: #ffffff;
    border: 2.5px solid transparent;
    border-radius: 12px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    font-family: inherit;
    resize: vertical;
}

.format-input::placeholder {
    color: #a0a0a0;
}

.format-input:focus {
    border-color: #000000;
    border-width: 2.5px;
}

/* ===== 下拉框自定义箭头 ===== */
.select-wrapper {
    position: relative;
    width: 100%;
}

/* 隐藏原生箭头，并为箭头留出空间 */
.select-wrapper select.format-input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 3.5rem;
    /* 文字与箭头之间的距离 */
    cursor: pointer;
}

/* 自定义箭头，位置与大小都可以在这里调 */
.select-arrow {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    /* 箭头距离右边缘的距离，调大更靠里 */
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    /* 不拦截点击 */
    color: #333;
}

.select-arrow svg {
    width: 18px;
    height: 18px;
}

/* ===== 底部提交行 ===== */
.submit-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin-top: 1.5rem;
}

.submit-hint {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    color: #1a1a1a;
}

.submit-btn {
    flex-shrink: 0;
}

/* ===== reCAPTCHA 提示 ===== */
.recaptcha-notice {
    margin-top: 2rem;
    font-size: 14px;
    color: #8a8a8a;
    line-height: 1.6;
}

.recaptcha-notice a {
    color: #8a8a8a;
    text-decoration: underline;
}

.recaptcha-notice a:hover {
    color: #555;
}
</style>