<script setup lang="ts">
import { onMounted } from 'vue'
import NavigationBar from './navComponents/NavigationBar.vue'
import Hero from './industryComponents/Hero.vue'
import Introduction from './industryComponents/Introduction.vue'
import { useLenis } from '@/composables/useLenis'
import BannerPicture from './industryComponents/BannerPicture.vue'
import NavigationCard from './industryComponents/NavigationCard.vue'
import Footer from './Footer.vue'

const { init, refresh } = useLenis()

onMounted(async () => {

    init()

    if (document.fonts?.ready) {
        await document.fonts.ready
    }

    refresh()

})
</script>

<template>
    <div class="services-container">
        <div class="nav-container">
            <NavigationBar />
        </div>

        <Hero />
        <Introduction />
        <BannerPicture />
        <NavigationCard />
        <Footer />
    </div>
</template>

<style scoped>
.services-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #2093FF;
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