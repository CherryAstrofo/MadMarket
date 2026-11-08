<template>
  <div class="banner-wrapper" ref="bannerRef">

    <!-- 背景图片 -->
    <div class="background-move">
      <img ref="backgroundImgRef" :src="backgroundImage" alt="Banner Image" class="banner-background">
    </div>


    <!-- 第二层缎带 -->
    <svg class="ribbon-svg ribbon-layer-2" viewBox="0 0 1600 600" preserveAspectRatio="none">

      <defs>

        <path id="ribbonPath1" d="
          M -100 350
          C 400 100,
            900 110,
            1000 115

          M 1000 115
          C 1150 120,
            1200 150,
            1250 200
          " />


        <path id="ribbonPath3" d="
          M 380 270
          C 500 240,
            800 200,
            1000 250

          M 1000 250
          C 1200 300,
            1400 380,
            1600 350
          " />

      </defs>


      <use href="#ribbonPath1" class="ribbon-line" />


      <text class="ribbon-text" dy="8">
        <textPath href="#ribbonPath1" startOffset="5%">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Connecting you
        </textPath>
      </text>



      <use href="#ribbonPath3" class="ribbon-line" />


      <text class="ribbon-text" dy="8">
        <textPath href="#ribbonPath3" startOffset="70%">
          &nbsp;&nbsp;&nbsp;
          to your audience
        </textPath>
      </text>


    </svg>



    <!-- 人物图片 -->
    <div class="figure-move">

      <img ref="figureImgRef" :src="figureImage" alt="Banner Figure" class="banner-figure">

    </div>



    <!-- 最上层缎带 -->
    <svg class="ribbon-svg ribbon-layer-4" viewBox="0 0 1600 600" preserveAspectRatio="none">

      <defs>

        <path id="ribbonPath2" d="
          M 1250 200

          C 1300 250,
            1250 300,
            1200 330

          M 1200 330

          C 1150 360,
            1100 370,
            1000 390

          M 1000 390

          C 900 410,
            600 420,
            500 400

          M 500 400

          C 450 390,
            350 370,
            320 320

          M 320 320

          C 330 300,
            350 280,
            380 270
          " />

      </defs>


      <use href="#ribbonPath2" class="ribbon-line" />

    </svg>


  </div>
</template>



<script setup lang="ts">

import {
  ref,
  onMounted,
  onUnmounted
} from 'vue'


import gsap from 'gsap'

import {
  ScrollTrigger
} from 'gsap/ScrollTrigger'


import backgroundImage
  from '@/img/photo/banner-background.png'


import figureImage
  from '@/img/photo/banner-figure.png'



gsap.registerPlugin(
  ScrollTrigger
)



const bannerRef =
  ref<HTMLElement | null>(null)



// 注意：现在 ref 指向 img
const backgroundImgRef =
  ref<HTMLImageElement | null>(null)



const figureImgRef =
  ref<HTMLImageElement | null>(null)



let ctx: gsap.Context



onMounted(() => {


  ctx =
    gsap.context(() => {


      /*
        背景视差
  
        移动图片本身
        不移动容器
      */
      gsap.to(
        backgroundImgRef.value,
        {

          y: -200,

          ease: 'none',

          scrollTrigger: {

            trigger:
              bannerRef.value,


            start:
              'top bottom',


            end:
              'bottom top',


            scrub: true

          }

        }
      )



      /*
        人物视差
  
        同理
      */
      gsap.to(
        figureImgRef.value,
        {

          y: -200,

          ease: 'none',

          scrollTrigger: {

            trigger:
              bannerRef.value,


            start:
              'top bottom',


            end:
              'bottom top',


            scrub: true

          }

        }
      )



    }, bannerRef)



})



onUnmounted(() => {

  ctx?.revert()

})


</script>



<style scoped>
.banner-wrapper {

  width: 100%;

  height: 100vh;

  overflow: hidden;

  border-radius: 4rem;

  position: relative;

}




/*
  图片移动层

  不允许GSAP修改transform
*/
.background-move,
.figure-move {

  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

}



.background-move {

  z-index: 1;

}



.figure-move {

  z-index: 3;

}



/*
 SVG固定
*/
.ribbon-svg {

  position: absolute;

  inset: 0;

  width: 100%;

  height: 100%;

  pointer-events: none;

}



.ribbon-layer-2 {

  z-index: 2;

}



.ribbon-layer-4 {

  z-index: 4;

}





/*
 图片稍微放大

 给移动预留空间
*/
.banner-background,
.banner-figure {


  width: 100%;

  height: 120%;

  object-fit: cover;

  display: block;


}




.ribbon-line {

  fill: none;

  stroke: #f5e211;

  stroke-width: 55;

  stroke-linecap: round;

}



.ribbon-text {

  fill: #ff705d;

  font-size:
    clamp(1.2rem, 2.4vw, 2.4rem);

  font-weight: 600;

  letter-spacing: 1px;

}
</style>