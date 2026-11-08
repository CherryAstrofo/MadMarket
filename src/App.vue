<script setup lang="ts">
import { onMounted } from 'vue'
import { useLenis } from '@/composables/useLenis'

const { init, setupRouteReset, destroy } = useLenis()

onMounted(() => {
  init()
  setupRouteReset()
  destroy()
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped></style>
