<template>
    <div class="marquee-container">
        <div class="marquee-track" ref="trackRef">
            <div class="marquee-group" ref="groupRef" v-for="n in 3" :key="n">
                <div class="marquee-item" v-for="(item, index) in items" :key="index">
                    <div class="brand-icon-wrapper">
                        <img v-if="item.icon" :src="item.icon" class="brand-icon" />
                    </div>
                    <span>
                        {{ item.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue"
import gsap from "gsap"

const props = defineProps({
    items: {
        type: Array,
        default: () => []
    },
    direction: {
        type: String,
        default: "left"
    },
    speed: {
        type: Number,
        default: 20
    }
})

const trackRef = ref(null)
const groupRef = ref(null)
let animation = null
let moveDistance = 0
let currentX = 0 // 记录当前X位置
let lastDirection = props.direction // 记录上一次的方向

// 计算当前位置对应的动画时长（保持恒定速度）
const calculateDuration = (fromX, toX) => {
    const distance = Math.abs(toX - fromX)
    // 速度 = 距离 / 时间，所以时间 = 距离 / 速度
    // 这里假设speed是移动一个group距离所需的秒数
    const speedPerPixel = props.speed / moveDistance
    return distance * speedPerPixel
}

// 创建循环动画
const createLoopAnimation = () => {
    if (!trackRef.value) return

    // 清除旧动画
    if (animation) {
        animation.kill()
    }

    const currentX = gsap.getProperty(trackRef.value, "x")

    if (props.direction === 'left') {
        // 向左移动：从currentX到-moveDistance
        const duration = calculateDuration(currentX, -moveDistance)
        animation = gsap.to(trackRef.value, {
            x: -moveDistance,
            duration: duration,
            ease: "none",
            onComplete: () => {
                // 重置到起点并继续循环
                gsap.set(trackRef.value, { x: 0 })
                createLoopAnimation()
            }
        })
    } else {
        // 向右移动：从currentX到0
        const duration = calculateDuration(currentX, 0)
        animation = gsap.to(trackRef.value, {
            x: 0,
            duration: duration,
            ease: "none",
            onComplete: () => {
                // 重置到起点并继续循环
                gsap.set(trackRef.value, { x: -moveDistance })
                createLoopAnimation()
            }
        })
    }
}

// 原地换向函数
const reverseDirection = () => {
    if (!trackRef.value) return

    // 获取当前X位置
    currentX = gsap.getProperty(trackRef.value, "x")

    // 杀死当前动画
    if (animation) {
        animation.kill()
        animation = null
    }

    // 根据新方向创建动画，保持恒定速度
    if (props.direction === 'left') {
        // 现在要向左移动（向负方向）
        const targetX = -moveDistance
        const distance = Math.abs(targetX - currentX)
        const duration = calculateDuration(currentX, targetX)

        animation = gsap.to(trackRef.value, {
            x: targetX,
            duration: duration,
            ease: "none",
            onComplete: () => {
                gsap.set(trackRef.value, { x: 0 })
                createLoopAnimation()
            }
        })
    } else {
        // 现在要向右移动（向正方向）
        const targetX = 0
        const duration = calculateDuration(currentX, targetX)

        animation = gsap.to(trackRef.value, {
            x: targetX,
            duration: duration,
            ease: "none",
            onComplete: () => {
                gsap.set(trackRef.value, { x: -moveDistance })
                createLoopAnimation()
            }
        })
    }
}

// 监听direction变化
watch(() => props.direction, (newDirection, oldDirection) => {
    if (newDirection !== oldDirection) {
        nextTick(() => {
            reverseDirection()
        })
    }
})

// 初始化动画
const initAnimation = () => {
    if (!trackRef.value || !groupRef.value) return

    // 计算移动距离（一个group的宽度）
    const group = groupRef.value
    if (group && group.length > 0) {
        moveDistance = group[0].offsetWidth
    }

    // 设置初始位置
    if (props.direction === 'left') {
        gsap.set(trackRef.value, { x: 0 })
    } else {
        gsap.set(trackRef.value, { x: -moveDistance })
    }

    // 创建循环动画
    createLoopAnimation()
}

onMounted(() => {
    nextTick(() => {
        initAnimation()
    })
})

onBeforeUnmount(() => {
    if (animation) {
        animation.kill()
    }
})

// 暴露方法给父组件
defineExpose({
    restartAnimation: initAnimation,
    reverseDirection
})
</script>

<style scoped>
.marquee-container {
    overflow: hidden;
    width: 100%;
}

.marquee-track {
    display: flex;
    width: max-content;
    will-change: transform;
}

.marquee-group {
    display: flex;
    flex-shrink: 0;
}

.marquee-item {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: 999px;
    margin-right: 20px;
    padding: 18px 30px 18px 20px;
    font-size: 1.25rem;
    font-weight: 500;
    background-color: #F5F1E4;
    gap: 8px;
}

.brand-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #ffffff;
    flex-shrink: 0;
    margin-right: 20px;
}

.brand-icon {
    width: 45%;
    height: 45%;
    object-fit: contain;
}
</style>