<template>
    <div class="network-container">
        <div class="nav-container">
            <NavigationBar />
        </div>
        <NetworkHero />
        <MapSection />
        <CountrySection />
        <NavigationCard />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import NetworkHero from './networkComponents/NetworkHero.vue';
import NavigationBar from './navComponents/NavigationBar.vue';
import { useLenis } from '@/composables/useLenis'
import MapSection from './networkComponents/MapSection.vue';
import CountrySection from './networkComponents/CountrySection.vue';
import NavigationCard from './networkComponents/NavigationCard.vue';
import Footer from './Footer.vue';

const { init, refresh } = useLenis()

onMounted(async () => {

    init()

    if (document.fonts?.ready) {
        await document.fonts.ready
    }

    refresh()

})
</script>

<style scoped>
.network-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #F4ACFF;
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
</style>