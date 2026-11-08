<template>
  <header class="navigation-bar">
    <!-- 左侧圆角矩形 -->
    <div class="nav-rect nav-rect-medium">
      <div class="logo-area" @click="$router.push('/')">
        <img src="https://www.datocms-assets.com/166003/1761505611-favicon.svg?auto=format&h=96&w=96"
          alt="MadMarket Logo" class="logo-image" />
        <span class="logo-text">MadMarket</span>
      </div>
      <div class="nav-buttons" v-if="!isNarrowScreen">
        <router-link to="/services" class="nav-btn">Services</router-link>
        <router-link to="/method" class="nav-btn">Methodology</router-link>
        <router-link to="/industry" class="nav-btn">Industry Sectors</router-link>
        <router-link to="/network" class="nav-btn">Network</router-link>
      </div>
      <DropdownTag></DropdownTag>
    </div>

    <!-- 右侧长圆角矩形（会随宽度变化而省略） -->
    <div class="quote-nav">
      <QuoteButton @click="router.push('/signup')" />
    </div>
  </header>
</template>

<script setup>
import QuoteButton from './QuoteButton.vue';
import DropdownTag from './DropdownTag.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isNarrowScreen = ref(false)

const checkScreenWidth = () => {
  isNarrowScreen.value = window.innerWidth < 900
}

onMounted(() => {
  checkScreenWidth()
  window.addEventListener('resize', checkScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenWidth)
})
</script>

<style scoped>
/* 基础重置和字体设置 */
.navigation-bar {
  --primary-color: #000000;
  --bg: #fff6ca;
  --text-light: #000000;
  --border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  background: transparent;
  gap: 1.5rem;
}

/* 圆角矩形公共样式 */
.nav-rect {
  backdrop-filter: blur(12px);
  background: rgb(255, 255, 255);
  border-radius: var(--border-radius);
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

/* 左侧中等长度矩形 */
.nav-rect-medium {
  flex: 1;
  gap: 2rem;
  justify-content: space-between;
  min-width: 0;
  /* 允许收缩 */
}

/* 右侧长矩形 - 默认显示 */
.quote-nav {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

/* Logo 区域 */
.logo-area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: #000000;
  flex-shrink: 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.logo-area:hover {
  opacity: 0.8;
}

/* Logo 图片样式 */
.logo-image {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(157, 22, 22, 0.1));
}

.logo-text {
  color: #000000;
  letter-spacing: -0.3px;
  white-space: nowrap;
}

/* 导航按钮容器 */
.nav-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.3s ease;
}

/* 导航按钮样式 - 修改为 router-link */
.nav-btn {
  position: relative;
  background: transparent;
  border: none;
  color: #000000;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 1rem;
  border-radius: 32px;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
  overflow: hidden;
  transition: transform 0.2s ease, opacity 0.3s ease, padding 0.3s ease;
  flex-shrink: 0;
  text-decoration: none;
  /* 移除下划线 */
  display: inline-block;
}

/* 伪元素负责背景动画 */
.nav-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 32px;
  background: #f0ebd9d0;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease-out, height 0.3s ease-out;
  z-index: -1;
}

.nav-btn:hover::before {
  width: 100%;
  height: 100%;
}

.nav-btn:hover {
  transform: scale(1.05);
}

.nav-btn:active::before {
  width: 90%;
  height: 90%;
  transition: width 0.05s ease-in, height 0.05s ease-in;
}

.nav-btn:active {
  transform: scale(0.98);
}

/* 激活状态的导航按钮 */
.nav-btn.router-link-active {
  background: #f0ebd9d0;
}

/* 精确匹配时移除激活样式 */
.nav-btn.router-link-exact-active {
  background: #f0ebd9d0;
  font-weight: 600;
}

/* ========== 响应式断点 ========== */

/* 第一级：宽度小于 1100px - 右侧导航栏省略（隐藏） */
@media (max-width: 1100px) {
  .quote-nav {
    display: none;
  }

  .navigation-bar {
    gap: 0;
  }
}

/* 第二级：宽度小于 800px - 左侧导航栏按钮开始省略 */
@media (max-width: 800px) {

  /* 隐藏第4个按钮（Network） */
  .nav-btn:nth-child(4) {
    display: none;
  }
}

/* 第三级：宽度小于 680px - 继续省略 */
@media (max-width: 680px) {

  /* 隐藏第3个按钮（Industry Sectors） */
  .nav-btn:nth-child(3) {
    display: none;
  }

  .nav-btn {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
}

/* 第四级：宽度小于 550px - 继续省略 */
@media (max-width: 550px) {

  /* 隐藏第2个按钮（Methodology） */
  .nav-btn:nth-child(2) {
    display: none;
  }

  .nav-btn {
    padding: 0.5rem 0.7rem;
    font-size: 0.85rem;
  }
}

/* 第五级：宽度小于 420px - 只保留 Logo，隐藏所有文字按钮和文字 */
@media (max-width: 420px) {

  /* 隐藏所有导航按钮 */
  .nav-buttons {
    display: none;
  }

  /* 可选：隐藏 Logo 文字，只保留图标 */
  .logo-text {
    display: none;
  }

  .nav-rect-medium {
    justify-content: center;
  }
}

/* 平滑滚动和盒模型 */
* {
  box-sizing: border-box;
}
</style>