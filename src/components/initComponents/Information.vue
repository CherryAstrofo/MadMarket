<template>
  <div class="info-card">
    <div class="info-text">
      MindMarket delivers global qualitative market research through
      real people who understand local cultures. We connect you with
      the voices that matter— wherever they are — to help you make
      smarter, faster business decisions with confidence.
    </div>

    <InteractiveButton
      class="quote-button"
      text="Get a quote"
      button-background="#ffffff"
      circle-background="#8ed462"
    />
  </div>
</template>

<script setup>
import InteractiveButton from '../ui/interactive-button/InteractiveButton.vue'
</script>

<style scoped>
.info-card {
  width: 100%;
  min-height: 700vh;
  box-sizing: border-box;
  position: relative;

  background-color: #f5f1e4;
  border-radius: 60px;
}

.info-text {
  position: absolute;
  top: 120px;
  left: 120px;

  max-width: 36%;

  color: #333333;
  font-size: 1.6rem;
  line-height: 1.5;
  font-weight: 500;
}

/* 这里只负责父组件中的位置 */
.quote-button {
  position: absolute;
  top: 350px;
  left: 120px;
}
</style>