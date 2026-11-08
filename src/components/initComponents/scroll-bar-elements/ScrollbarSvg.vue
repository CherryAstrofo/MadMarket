<script setup lang="ts">
import backgroundSvg from '@/img/svg-picture/hero-background-illustration.svg'

import clockSvg from '@/img/svg-picture/clock.svg'
import clockShapeSvg from '@/img/svg-picture/clock-shape.svg'

import plane1Svg from '@/img/svg-picture/plane-1.svg'
import plane2Svg from '@/img/svg-picture/plane-2.svg'
import planeTraceSvg from '@/img/svg-picture/plane-trace.svg'

import folderShapeSvg from '@/img/svg-picture/folder-shape.svg'
import folderSvg from '@/img/svg-picture/folder.svg'
import sheetSvg from '@/img/svg-picture/sheet.svg'

import composerShapeSvg from '@/img/svg-picture/composer-shape.svg'
import composerShape2Svg from '@/img/svg-picture/composer-shape-2.svg'

import musicNote1Svg from '@/img/svg-picture/music-note-1.svg'
import musicNote2Svg from '@/img/svg-picture/music-note-2.svg'
import musicNote3Svg from '@/img/svg-picture/music-note-3.svg'
import trumperShapeSvg from '@/img/svg-picture/trumper-shape.svg'

import gamerShapeSvg from '@/img/svg-picture/gamer-shape.svg'
import joystickSvg from '@/img/svg-picture/joystick.svg'
import joystickShapeSvg from '@/img/svg-picture/joystick-shape.svg'

import soccerCircleSvg from '@/img/svg-picture/soccer-circle.svg'
import soccerCircle2Svg from '@/img/svg-picture/soccer-circle-2.svg'
import soccerShape1Svg from '@/img/svg-picture/soccer-shape-1.svg'
import soccerShape2Svg from '@/img/svg-picture/soccer-shape-2.svg'
import soccerShape3Svg from '@/img/svg-picture/soccer-shape-3.svg'
import soccerShape4Svg from '@/img/svg-picture/soccer-shape-4.svg'
import soccerTraceSvg from '@/img/svg-picture/soccer-trace.svg'
</script>

<template>
  <div class="svg-elements">
    <!-- 主背景 -->
    <img
      :src="backgroundSvg"
      alt=""
      class="background-svg"
    />

    <!-- Hero 区域时钟装饰 -->
    <div class="clock-decoration">
      <img
        :src="clockShapeSvg"
        alt=""
        class="clock-shape"
      />

      <img
        :src="clockSvg"
        alt="clock"
        class="clock-icon"
      />
    </div>

    <!-- 飞机装饰 -->
    <img
      :src="planeTraceSvg"
      alt=""
      class="plane-trace"
    />

    <img
      :src="plane1Svg"
      alt="plane"
      class="plane-1"
    />

    <img
      :src="plane2Svg"
      alt="plane"
      class="plane-2"
    />

    <!-- 文件夹装饰 -->
    <img
      :src="folderShapeSvg"
      alt=""
      class="folder-shape"
    />

    <img
      :src="folderSvg"
      alt="folder"
      class="folder-icon"
    />

    <img
      :src="sheetSvg"
      alt="sheet"
      class="sheet-icon"
    />

    <!-- Composer 装饰 -->
    <img
      :src="composerShapeSvg"
      alt=""
      class="composer-shape"
    />

    <img
      :src="composerShape2Svg"
      alt=""
      class="composer-shape-2"
    />

    <!-- Trumpeter 装饰 -->
    <img
      :src="trumperShapeSvg"
      alt=""
      class="trumper-shape"
    />

    <img
      :src="musicNote1Svg"
      alt="music note"
      class="music-note-1"
    />

    <img
      :src="musicNote2Svg"
      alt="music note"
      class="music-note-2"
    />

    <img
      :src="musicNote3Svg"
      alt="music note"
      class="music-note-3"
    />

    <!-- Gamer 装饰 -->
    <img
      :src="gamerShapeSvg"
      alt=""
      class="gamer-shape"
    />

    <img
      :src="joystickSvg"
      alt="joystick"
      class="joystick"
    />

    <img
      :src="joystickShapeSvg"
      alt=""
      class="joystick-shape"
    />

    <!-- Soccer 装饰 -->
    <img
      :src="soccerCircleSvg"
      alt=""
      class="soccer-circle"
    />

    <img
      :src="soccerShape1Svg"
      alt=""
      class="soccer-shape-1"
    />

    <img
      :src="soccerShape2Svg"
      alt=""
      class="soccer-shape-2"
    />

    <img
      :src="soccerShape3Svg"
      alt=""
      class="soccer-shape-3"
    />

    <img
      :src="soccerCircle2Svg"
      alt=""
      class="soccer-circle-2"
    />

    <img
      :src="soccerShape4Svg"
      alt=""
      class="soccer-shape-4"
    />

    <img
      :src="soccerTraceSvg"
      alt=""
      class="soccer-trace"
    />
  </div>
</template>

<style scoped>
.svg-elements {
  display: contents;
}

.svg-elements img {
  user-select: none;
  pointer-events: none;
}

/* 主背景 */
.background-svg {
  position: absolute;
  top: -13%;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;

  object-fit: contain;
}

/*
 * 原来的时钟图片位于 rive-wrapper 内部。
 * 拆分组件后，使用这个容器建立与 Hero 动画相同的中心定位区域。
 */
.clock-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 4;

  width: 100%;
  height: 100%;

  transform: translate(-50%, -50%);
  pointer-events: none;
}

.clock-shape {
  position: absolute;
  bottom: -5rem;
  left: -10rem;
  z-index: 0;

  width: 50%;
}

.clock-icon {
  position: absolute;
  bottom: 5%;
  left: -6rem;
  z-index: 1;

  width: 18%;
}

/* 飞机区域 */
.plane-trace {
  position: absolute;
  bottom: -23rem;
  left: 4rem;
  z-index: 2;

  width: 20rem;
}

.plane-1 {
  position: absolute;
  bottom: -12rem;
  left: 12rem;
  z-index: 3;

  width: 5rem;
}

.plane-2 {
  position: absolute;
  bottom: -30rem;
  left: 26rem;
  z-index: 3;

  width: 7rem;
}

/* 文件夹区域 */
.folder-shape {
  position: absolute;
  bottom: -50rem;
  left: 0;
  z-index: 2;

  width: 23rem;
}

.folder-icon {
  position: absolute;
  bottom: -40rem;
  left: 22rem;
  z-index: 3;

  width: 10rem;
}

.sheet-icon {
  position: absolute;
  bottom: -40rem;
  left: 10rem;
  z-index: 3;

  width: 8rem;
}

/* Composer 区域 */
.composer-shape {
  position: absolute;
  bottom: -115rem;
  left: 30rem;
  z-index: 4;

  width: 34rem;
}

.composer-shape-2 {
  position: absolute;
  bottom: -112rem;
  left: 30rem;
  z-index: 2;

  width: 34rem;
}

/* Trumpeter 区域 */
.trumper-shape {
  position: absolute;
  bottom: -95rem;
  left: 4rem;
  z-index: 2;

  width: 12rem;
}

.music-note-1 {
  position: absolute;
  bottom: -75rem;
  left: -10rem;
  z-index: 3;

  width: 6rem;
}

.music-note-2 {
  position: absolute;
  bottom: -90rem;
  left: 25rem;
  z-index: 3;

  width: 6rem;
}

.music-note-3 {
  position: absolute;
  bottom: -103rem;
  left: 28rem;
  z-index: 3;

  width: 6rem;
}

/* Gamer 区域 */
.gamer-shape {
  position: absolute;
  bottom: -120rem;
  left: -15rem;
  z-index: 2;

  width: 8rem;
}

.joystick {
  position: absolute;
  bottom: -132rem;
  left: 15rem;
  z-index: 3;

  width: 6rem;
}

.joystick-shape {
  position: absolute;
  bottom: -130rem;
  left: 25rem;
  z-index: 2;

  width: 10rem;
}

/* Soccer 区域 */
.soccer-circle {
  position: absolute;
  bottom: -150rem;
  left: 50rem;
  z-index: 2;

  width: 3rem;
}

.soccer-shape-1 {
  position: absolute;
  bottom: -140rem;
  left: 35rem;
  z-index: 2;

  width: 1.5rem;
}

.soccer-shape-2 {
  position: absolute;
  bottom: -145rem;
  left: 22rem;
  z-index: 2;

  width: 8rem;
}

.soccer-shape-3 {
  position: absolute;
  bottom: -160rem;
  left: 25rem;
  z-index: 2;

  width: 6rem;
}

.soccer-circle-2 {
  position: absolute;
  bottom: -160rem;
  left: -2rem;
  z-index: 5;

  width: 1rem;
}

.soccer-shape-4 {
  position: absolute;
  bottom: -183rem;
  left: 2rem;
  z-index: 2;

  width: 10rem;
}

.soccer-trace {
  position: absolute;
  bottom: -175rem;
  left: 8rem;
  z-index: 2;

  width: 16rem;
}
</style>