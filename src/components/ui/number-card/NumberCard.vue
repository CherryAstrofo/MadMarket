<template>
    <div class="card-container" :style="{
        backgroundColor: primaryColor,
        color: secondaryColor
    }">
        <!-- 左上角数字 -->
        <div class="number-display">{{ numberText }}</div>

        <!-- 右上角图标容器 -->
        <div class="icon-container" :style="{ backgroundColor: secondaryColor }">
            <component :is="iconComponent" class="icon" :style="{ color: primaryColor }" />
        </div>

        <!-- 底部介绍文字 -->
        <div class="description-text">
            <div v-for="(line, index) in descriptionLines" :key="index" class="description-line">
                {{ line }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardComponent',
    props: {
        // 数字内容
        numberText: {
            type: [String, Number],
            required: true
        },
        // 介绍文字（可以传入数组或字符串）
        description: {
            type: [String, Array],
            required: true,
            default: ''
        },
        // 图标组件（可以是字符串或组件对象）
        icon: {
            type: [String, Object, Function],
            required: true
        },
        // 卡片背景颜色和图标颜色（共用）
        primaryColor: {
            type: String,
            default: '#4A90D9'
        },
        // 文本颜色和圆形容器背景颜色（共用）
        secondaryColor: {
            type: String,
            default: '#FFFFFF'
        }
    },
    computed: {
        // 处理描述文字为数组
        descriptionLines() {
            if (Array.isArray(this.description)) {
                return this.description.slice(0, 2); // 最多取前两行
            }
            return this.description.split('\n').slice(0, 2);
        },
        // 动态解析图标组件
        iconComponent() {
            // 如果传入的是字符串，假设是图标名称，需要根据你的图标库处理
            // 这里直接返回传入的组件
            return this.icon;
        }
    }
}
</script>

<style scoped>
.card-container {
    position: relative;
    border-radius: 3rem;
    padding: 20px;
    width: 28rem;
    height: 32rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* 改为 flex-start，让内容从顶部开始排列 */
}

.number-display {
    position: absolute;
    top: 80px;
    left: 40px;
    font-size: 10rem;
    font-weight: 600;
    line-height: 1;
}

.icon-container {
    position: absolute;
    top: 32px;
    right: 32px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon {
    width: 40px;
    height: 40px;
}

.description-text {
    position: absolute;
    bottom: 32px;
    /* 固定在底部，距离底部 32px */
    left: 32px;
    /* 与卡片内边距对齐 */
    font-size: 20px;
    line-height: 1.5;
    font-weight: 500;
    max-width: calc(100% - 40px);
    /* 防止文字溢出，减去左右内边距 */
}

.description-line {
    opacity: 0.9;
}

/* 响应式调整 */
@media (max-width: 480px) {
    .card-container {
        width: 160px;
        height: 100px;
        padding: 16px;
    }

    .number-display {
        font-size: 28px;
        top: 16px;
        left: 16px;
    }

    .icon-container {
        width: 40px;
        height: 40px;
        top: 12px;
        right: 12px;
    }

    .icon {
        width: 20px;
        height: 20px;
    }

    .description-text {
        font-size: 12px;
        bottom: 16px;
        /* 移动端调整为 16px */
        left: 16px;
        max-width: calc(100% - 32px);
    }
}
</style>