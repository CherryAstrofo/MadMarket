<template>
    <div class="wave-text" :style="{ '--font-size': fontSize + 'px' }">
        <span class="text">{{ text }}</span>
        <div class="wave-mask">
            <div class="wave-track" :style="{ animationDuration: speed + 's' }">
                <svg class="wave-svg" :width="svgWidth" :height="waveHeight" :viewBox="`0 0 ${svgWidth} ${waveHeight}`">
                    <path :d="wavePath" :stroke="color" :stroke-width="strokeWidth" fill="none" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    text: {
        type: String,
        default: "Wave"
    },
    fontSize: {
        type: Number,
        default: 50
    },
    color: {
        type: String,
        default: "#ff3366"
    },
    speed: {
        type: Number,
        default: 3
    },
    amplitude: {
        type: Number,
        default: 0.12
    },
    thickness: {
        type: Number,
        default: 0.08
    },
    wavelength: {
        type: Number,
        default: 0.8
    }
})

const svgWidth = computed(() => props.fontSize * 20)

const waveHeight = computed(() => props.fontSize * 0.5)

const strokeWidth = computed(() => props.fontSize * props.thickness)

const wavePath = computed(() => {
    const amp = props.fontSize * props.amplitude
    const length = props.fontSize * props.wavelength
    const center = waveHeight.value / 2
    let d = `M0 ${center}`

    for (let x = 0; x <= svgWidth.value; x += 5) {
        const y = center + Math.sin((x / length) * Math.PI * 2) * amp
        d += ` L${x} ${y}`
    }

    return d
})
</script>

<style scoped>
.wave-text {
    position: relative;
    display: inline-block;
    font-size: var(--font-size);
    line-height: 1;
    overflow: visible;
}

.text {
    position: relative;
    z-index: 1;
}

.wave-mask {
    position: absolute;
    left: 0;
    bottom: -0.18em;
    width: 100%;
    overflow: hidden;
    z-index: 2;
}

.wave-track {
    width: max-content;
    animation: waveMove linear infinite;
}

.wave-svg {
    display: block;
    overflow: visible;
}

@keyframes waveMove {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-20%);
    }
}
</style>