<script setup lang="ts">
import { onMounted } from 'vue'
import NavigationBar from './navComponents/NavigationBar.vue'
import Hero from './serviceComponents/Hero.vue'
import Introduction from './serviceComponents/Introduction.vue'
import { useLenis } from '@/composables/useLenis'
import Functions from './serviceComponents/Functions.vue'
import NavigationCard from './serviceComponents/NavigationCard.vue'
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
        <Functions />
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
    background-color: #FF5C46;
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