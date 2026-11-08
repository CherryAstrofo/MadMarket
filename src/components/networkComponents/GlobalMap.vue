<template>
    <div class="map-container">
        <div class="map-track" :class="{ 'paused': isPaused }">
            <!-- 第一张地图及其标点 -->
            <div class="map-item">
                <img :src="worldmap" alt="World Map" class="world-map" />
                <LocationPoint v-for="city in cities" :key="'first-' + city.id" :x="city.x" :y="city.y"
                    :city-name="city.name" @hover="handleHover" />
            </div>

            <!-- 第二张地图及其标点（用于无缝循环） -->
            <div class="map-item">
                <img :src="worldmap" alt="World Map" class="world-map" aria-hidden="true" />
                <LocationPoint v-for="city in cities" :key="'second-' + city.id" :x="city.x" :y="city.y"
                    :city-name="city.name" @hover="handleHover" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import worldmap from '@/img/svg-picture/worldLow.svg'
import LocationPoint from '../ui/location-point/LocationPoint.vue'

interface City {
    id: number
    name: string
    x: number
    y: number
}

const isPaused = ref(false)

const cities = ref<City[]>([
    { id: 1, name: 'Mexico', x: 21, y: 42 },
    { id: 2, name: 'USA', x: 25, y: 34 },
    { id: 3, name: 'Canada', x: 26, y: 25 },
    { id: 4, name: 'Argentina', x: 33, y: 75 },
    { id: 5, name: 'Brazil', x: 35, y: 64 },
    { id: 6, name: 'England', x: 49, y: 25 },
    { id: 7, name: 'Nigeria', x: 52, y: 55 },      // 西非，经度约8°E
    { id: 8, name: 'Germany', x: 53, y: 28 },      // 中欧，经度约10°E
    { id: 9, name: 'Sweden', x: 56, y: 22 },       // 北欧，经度约15°E
    { id: 10, name: 'South Africa', x: 57, y: 76 }, // 南非，经度约25°E
    { id: 11, name: 'Turkey', x: 60, y: 38 },      // 西亚，经度约35°E
    { id: 12, name: 'Kenya', x: 61, y: 60 },       // 东非，经度约38°E
    { id: 13, name: 'Saudi Arabia', x: 63, y: 45 }, // 中东，经度约45°E
    { id: 14, name: 'United Arab Emirates', x: 65, y: 43 }, // 中东，经度约54°E
    { id: 15, name: 'India', x: 72, y: 48 },       // 南亚，经度约78°E
    { id: 16, name: 'China', x: 77, y: 38 },       // 东亚，经度约104°E
    { id: 17, name: 'Thailand', x: 78, y: 52 },    // 东南亚，经度约100°E
    { id: 18, name: 'Indonesia', x: 82, y: 62 },   // 东南亚，经度约113°E
    { id: 19, name: 'South Korea', x: 83, y: 35 }, // 东亚，经度约128°E
    { id: 20, name: 'Japan', x: 86, y: 35 },       // 东亚，经度约138°E
    { id: 21, name: 'Australia', x: 88, y: 72 },   // 大洋洲，经度约134°E
    { id: 22, name: 'New Zealand', x: 93, y: 82 }, // 大洋洲，经度约174°E
])

const handleHover = (isHovering: boolean) => {
    isPaused.value = isHovering
}
</script>

<style scoped>
.map-container {
    width: 50rem;
    height: 50rem;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    background-color: #E0DBCE;
}

.map-track {
    display: flex;
    width: max-content;
    height: 100%;
    animation: scroll-map 30s linear infinite;
}

.map-track.paused {
    animation-play-state: paused;
}

.map-item {
    position: relative;
    width: 90rem;
    height: 100%;
    flex-shrink: 0;
}

.world-map {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

@keyframes scroll-map {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-90rem);
    }
}
</style>