<script setup lang="ts">
import RiveAnimation from '@/components/ui/rive-animation/RiveAnimation.vue'

import heroAnimationUrl from '@/assets/lottie/hero_animation.riv?url'
import climberAnimationUrl from '@/assets/lottie/climber.riv?url'
import shrugAnimationUrl from '@/assets/lottie/shrug.riv?url'
import composerAnimationUrl from '@/assets/lottie/composer.riv?url'
import trumpeter1AnimationUrl from '@/assets/lottie/trumpeter_1.riv?url'
import trumpeter2AnimationUrl from '@/assets/lottie/trumpeter_2.riv?url'
import gamerAnimationUrl from '@/assets/lottie/gamer.riv?url'
import scientistAnimationUrl from '@/assets/lottie/scientist.riv?url'
import soccerAnimationUrl from '@/assets/lottie/soccer.riv?url'
</script>

<template>
  <!--
    display: contents 可以让内部绝对定位元素继续以
    ScrollBar 的 scroll-bar-container 作为定位参考。
  -->
  <div class="rive-elements">
    <div class="rive-wrapper">
      <RiveAnimation
        :src="heroAnimationUrl"
        class="rive-animation"
      />
    </div>

    <RiveAnimation
      :src="climberAnimationUrl"
      class="climber-animation"
    />

    <RiveAnimation
      :src="shrugAnimationUrl"
      class="shrug-animation"
    />

    <RiveAnimation
      :src="composerAnimationUrl"
      class="composer-animation"
    />

    <RiveAnimation
      :src="trumpeter1AnimationUrl"
      class="trumpeter-1-animation"
    />

    <RiveAnimation
      :src="trumpeter2AnimationUrl"
      class="trumpeter-2-animation"
    />

    <RiveAnimation
      :src="gamerAnimationUrl"
      class="gamer-animation"
    />

    <RiveAnimation
      :src="scientistAnimationUrl"
      class="scientist-animation"
    />

    <RiveAnimation
      :src="soccerAnimationUrl"
      class="soccer-animation"
    />
  </div>
</template>

<style scoped>
/*
 * 不生成实际布局盒子。
 * 这样内部绝对定位动画仍然相对于父组件的
 * .scroll-bar-container 定位。
 */
.rive-elements {
  display: contents;
}

.rive-wrapper {
  position: relative;
  z-index: 4;

  display: inline-block;
}

.rive-animation {
  position: relative;
  display: block;
}

.climber-animation {
  position: absolute;
  bottom: -50rem;
  left: -23rem;
  z-index: 3;

  width: 48rem;

  pointer-events: none;
}

.shrug-animation {
  position: absolute;
  bottom: -70rem;
  left: 28rem;
  z-index: 3;

  width: 40rem;

  pointer-events: none;
}

.composer-animation {
  position: absolute;
  bottom: -110rem;
  left: 34rem;
  z-index: 3;

  width: 42rem;

  pointer-events: none;
}

.trumpeter-1-animation {
  position: absolute;
  bottom: -90rem;
  left: -5rem;
  z-index: 3;

  width: 24rem;

  pointer-events: none;
}

.trumpeter-2-animation {
  position: absolute;
  bottom: -98rem;
  left: -20rem;
  z-index: 3;

  width: 24rem;

  pointer-events: none;
}

.gamer-animation {
  position: absolute;
  bottom: -123rem;
  left: -10rem;
  z-index: 3;

  width: 27rem;

  pointer-events: none;
}

.scientist-animation {
  position: absolute;
  bottom: -153rem;
  left: 37rem;
  z-index: 3;

  width: 36rem;

  pointer-events: none;
}

.soccer-animation {
  position: absolute;
  bottom: -182rem;
  left: -21rem;
  z-index: 3;

  width: 48rem;

  pointer-events: none;
}
</style>