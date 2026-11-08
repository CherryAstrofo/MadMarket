<script setup lang="ts">
import InformationCard from '@/components/ui/info-card/InformationCard.vue'

interface CardItem {
  title: string
  content: string
  buttonText: string
  buttonBackground: string
  circleBackground: string
  className: string
}

const cards: CardItem[] = [
  {
    title: 'No more chaos.',
    content:
      'Managing multiple vendors, juggling time zones, translating insights across cultures — it adds up fast. At MindMarket, we bring it all under one roof. No misalignment, no friction, just seamless collaboration from start to finish.',
    buttonText: 'Services',
    buttonBackground: '#ff750d',
    circleBackground: '#ffffff',
    className: 'first-card',
  },
  {
    title: 'One brief. One team.',
    content:
      'You brief us once and we take it from there. From methodology design and recruitment to local moderation and reporting, everything is managed by a single point of contact who leads your study from start to finish. You get clear updates, fast turnarounds, and high-quality insights—without compromise.',
    buttonText: 'Methodology',
    buttonBackground: '#f5e211',
    circleBackground: '#ffffff',
    className: 'second-card',
  },
  {
    title: 'Speak their language.',
    content:
      'From gaming to fintech, hospitality to consumer goods, each industry speaks its own language. Our in-market experts don’t just understand people, they understand the context. We bring cultural insight shaped by the sector you’re in, so your message hits home in every market.',
    buttonText: 'Industry Sectors',
    buttonBackground: '#2ba0ff',
    circleBackground: '#ffffff',
    className: 'third-card',
  },
  {
    title: 'Global, for real.',
    content:
      'Whether you’re researching one market or launching in ten, we scale with you. One partner. Global reach. Consistent quality. Our global network spans regions and industries, giving you on-demand access to the right participants in the right places, without starting from scratch.',
    buttonText: 'Our Network',
    buttonBackground: '#ebc1ff',
    circleBackground: '#ffffff',
    className: 'fourth-card',
  },
]
</script>

<template>
  <div class="scrollbar-info-cards">
    <div
      v-for="card in cards"
      :key="card.title"
      class="scrollbar-info-card"
      :class="card.className"
    >
      <InformationCard
        :title="card.title"
        :content="card.content"
        :button-text="card.buttonText"
        :button-background="card.buttonBackground"
        :circle-background="card.circleBackground"
      />
    </div>
  </div>
</template>

<style scoped>
.scrollbar-info-cards {
  display: contents;
}

.scrollbar-info-card {
  position: absolute;
  z-index: 1;

  /*
   * 这里只负责卡片的定位区域，
   * 不再直接修改 InformationCard 的尺寸。
   */
  width: 60rem;

  pointer-events: auto;
}

.first-card {
  bottom: -25rem;
  left: 35rem;
}

.second-card {
  bottom: -66rem;
  left: -10rem;
}

.third-card {
  bottom: -125rem;
  left: 85%;

  transform: translateX(-50%);
}

.fourth-card {
  bottom: -185rem;
  left: 35rem;
}
</style>