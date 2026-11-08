<template>
  <div class="dropdown-tag" ref="dropdownRef">
    <!-- 触发器按钮 - 始终显示 -->
    <button 
      class="dropdown-trigger" 
      :class="{ 'active': isOpen }"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <svg class="arrow-icon" :class="{ 'rotated': isOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>

    <!-- 下拉框内容 -->
    <Teleport to="body">
      <Transition name="dropdown">
        <div 
          v-if="isOpen" 
          ref="dropdownContentRef"
          class="dropdown-content"
          :style="dropdownStyle"
        >
          <!-- 窄屏模式：显示 OptionContainer - 不使用统一背景 -->
          <OptionContainer 
            v-if="isNarrowScreen" 
            @close="handleCloseFromChild"
            @mouseenter="handleContentMouseEnter"
            @mouseleave="handleContentMouseLeave"
          />
          
          <!-- 宽屏模式：显示 ImageContainer -->
          <div 
            v-else 
            class="image-options"
            @mouseenter="handleContentMouseEnter"
            @mouseleave="handleContentMouseLeave"
          >
            <ImageContainer></ImageContainer>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ImageContainer from './ImageContainer.vue'
import OptionContainer from './OptionContainer.vue'

// 状态
const isOpen = ref(false)
const isNarrowScreen = ref(false)
const dropdownRef = ref(null)
const dropdownContentRef = ref(null)
const dropdownPosition = ref({ top: 0, left: 0, width: 0 })

// 计算下拉框样式
const dropdownStyle = computed(() => ({
  top: dropdownPosition.value.top + 'px',
  left: dropdownPosition.value.left + 'px',
  width: dropdownPosition.value.width + 'px'
}))

// 定时器
let hoverTimer = null
let closeTimer = null
let resizeObserver = null

// 更新下拉框位置（与左侧导航栏对齐）
const updateDropdownPosition = () => {
  const navRect = document.querySelector('.nav-rect-medium')
  if (!navRect) return
  
  const rect = navRect.getBoundingClientRect()
  
  dropdownPosition.value = {
    top: rect.bottom + 8,
    left: rect.left,
    width: rect.width
  }
}

// 关闭下拉框
const closeDropdown = () => {
  closeTimer = setTimeout(() => {
    isOpen.value = false
  }, 150)
}

// 取消关闭
const cancelClose = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

// 处理来自子组件的关闭事件
const handleCloseFromChild = () => {
  isOpen.value = false
  cancelClose()
}

// 处理鼠标进入下拉框内容
const handleContentMouseEnter = () => {
  if (!isNarrowScreen.value) {
    cancelClose()
  }
}

// 处理鼠标离开下拉框内容
const handleContentMouseLeave = () => {
  if (!isNarrowScreen.value) {
    closeDropdown()
  }
}

// 处理点击事件
const handleClick = (event) => {
  event.stopPropagation()
  
  if (!isOpen.value) {
    updateDropdownPosition()
    isOpen.value = true
  } else {
    isOpen.value = false
    cancelClose()
  }
}

// 处理鼠标进入触发器（仅宽屏模式启用 hover 打开）
const handleMouseEnter = () => {
  if (!isNarrowScreen.value) {
    if (hoverTimer) clearTimeout(hoverTimer)
    if (closeTimer) clearTimeout(closeTimer)
    updateDropdownPosition()
    isOpen.value = true
  }
}

// 处理鼠标离开触发器
const handleMouseLeave = () => {
  if (!isNarrowScreen.value) {
    closeDropdown()
  }
}

// 检测屏幕宽度
const checkScreenWidth = () => {
  const width = window.innerWidth
  isNarrowScreen.value = width < 1100
  
  // 切换模式时关闭下拉框
  if (isOpen.value) {
    isOpen.value = false
    cancelClose()
  }
}

// 点击外部关闭下拉框
const handleClickOutside = (event) => {
  const isTriggerClick = dropdownRef.value && dropdownRef.value.contains(event.target)
  const isContentClick = dropdownContentRef.value && dropdownContentRef.value.contains(event.target)
  
  if (!isTriggerClick && !isContentClick) {
    isOpen.value = false
    cancelClose()
  }
}

// 滚动时更新位置
const handleScroll = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

// 窗口大小变化
const handleResize = () => {
  checkScreenWidth()
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

onMounted(() => {
  checkScreenWidth()
  updateDropdownPosition()
  
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleScroll, true)
  document.addEventListener('click', handleClickOutside)
  
  resizeObserver = new ResizeObserver(() => {
    if (isOpen.value) {
      updateDropdownPosition()
    }
  })
  
  const navRect = document.querySelector('.nav-rect-medium')
  if (navRect) {
    resizeObserver.observe(navRect)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleScroll, true)
  document.removeEventListener('click', handleClickOutside)
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
  if (closeTimer) {
    clearTimeout(closeTimer)
  }
})
</script>

<style scoped>
.dropdown-tag {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* 触发器按钮样式 */
.dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8ED462;
  border: none;
  color: #000000;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  padding: 0;
  flex-shrink: 0;
}

.dropdown-trigger:hover {
  background: #f0ebd9d0;
  transform: scale(1.05);
}

.dropdown-trigger:active {
  transform: scale(0.98);
}

.dropdown-trigger.active {
  background: #f0ebd9d0;
}

.arrow-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
  stroke: #000000;
  stroke-width: 2;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

/* 下拉框内容 - 移除背景，让子组件各自有独立背景 */
.dropdown-content {
  position: fixed;
  z-index: 1000;
  /* 移除背景、边框、模糊效果，让子组件独立控制 */
}

/* 下拉框动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 宽屏模式：图片选项样式 */
.image-options {
  display: flex;
  justify-content: center; 
  align-items: center;     
  gap: 16%;               
  padding: 16px;           
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.98);
  flex-wrap: nowrap;       
  overflow-x: auto; 
}

/* 响应式调整 */
@media (max-width: 768px) {
  .dropdown-trigger {
    width: 32px;
    height: 32px;
  }
  
  .arrow-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .dropdown-trigger {
    width: 28px;
    height: 28px;
  }
  
  .arrow-icon {
    width: 14px;
    height: 14px;
  }
}
</style>