<template>
  <div class="dropdown-wrapper">
    <!-- 导航选项独立白框 -->
    <div class="nav-options-container">
      <button 
        v-for="item in navItems" 
        :key="item"
        class="dropdown-nav-btn"
        @click="handleNavClick(item)"
      >
        {{ item }}
      </button>
    </div>
    
    <!-- Contact 独立白框 - 与上方有间隙 -->
    <div class="contact-container">
      <button class="contact-btn" @click="handleContactClick">
        <span class="contact-text">Contact</span>
        <div class="contact-icon">
          <img :src="contactIconSrc" alt="Contact" class="contact-image" />
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
// 导航按钮列表（顺序排列）
const navItems = ['Services', 'Methodology', 'Industry Sectors', 'Network', 'About Us', 'Insights']

const contactIconSrc = '/src/img/logo/smile.png'

// 点击导航项
const handleNavClick = (item) => {
  console.log(`Navigate to: ${item}`)
  emit('close')
}

// 点击 Contact
const handleContactClick = () => {
  console.log('Contact clicked')
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<style scoped>
.dropdown-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;  /* 两个白框之间的间隙 */
}

/* 导航选项容器 - 独立白框 */
.nav-options-container {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  padding: 0.5rem 0;
}

/* 导航按钮样式 */
.dropdown-nav-btn {
  background: transparent;
  border: none;
  padding: 1rem 1.5rem;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: #000000;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dropdown-nav-btn:hover {
  background: #f0ebd9;
  padding-left: 2rem;
}

.dropdown-nav-btn:active {
  transform: scale(0.98);
  background: #e0d9c5;
}

/* Contact 独立白框 - 与上方有间隙 */
.contact-container {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Contact 圆角矩形框 */
.contact-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

.contact-btn:active {
  transform: scale(0.98);
}

.contact-text {
  font-size: 1.1rem;
  font-weight: 500;
  color: #000000;
}

/* 右侧圆形图标 */
.contact-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.contact-btn:hover .contact-icon {
  transform: scale(1.2);
}

.contact-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .dropdown-nav-btn {
    padding: 0.8rem 1.2rem;
    font-size: 1rem;
  }
  
  .dropdown-nav-btn:hover {
    padding-left: 1.6rem;
  }
  
  .contact-text {
    font-size: 1rem;
  }
  
  .contact-icon {
    width: 40px;
    height: 40px;
  }
  
  .contact-btn {
    padding: 0.8rem 1.2rem;
  }
}

@media (max-width: 480px) {
  .contact-icon {
    width: 36px;
    height: 36px;
  }
}
</style>