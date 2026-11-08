// composables/useCirclePathAnimation.ts
import {
  nextTick,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

import gsap from 'gsap'
import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ------------------- Types -------------------

interface VisualProgressSample {
  progress: number
  length: number
}

interface UseCirclePathAnimationOptions {
  /**
   * 路径动画开始滚动位置。
   *
   * 例如 0.8：
   * scrollY 到达 0.8 × innerHeight 时开始。
   */
  pathScrollStartRatio?: number

  /**
   * 路径动画持续的滚动距离。
   */
  pathScrollLengthRatio?: number

  /**
   * 头部圆形相对于当前路径位置的内缩比例。
   */
  headCircleInsetRatio?: number

  /**
   * 路径末端相对于当前路径位置的内缩比例。
   */
  trailEndInsetRatio?: number

  /**
   * 路径生成时使用的固定缩放参考。
   *
   * 必须与父组件 ScrollBar 最终 scale 保持一致。
   *
   * 父组件最终 scale 为 1.2 时，
   * 这里也应该设置为 1.2。
   */
  geometryReferenceScale?: number

  /**
   * 贝塞尔曲线路径形状缩放。
   *
   * 只影响曲线控制点之间的距离，
   * 不影响起始圆形大小。
   *
   * 1 表示保持原始路径形状。
   */
  pathShapeScale?: number

  /**
   * 路径整体水平偏移。
   *
   * 正数向右，负数向左。
   */
  pathOffsetX?: number

  /**
   * 路径整体垂直偏移。
   *
   * 正数向下，负数向上。
   */
  pathOffsetY?: number
}

// ------------------- Path Generator -------------------

function createPathD(
  startX: number,
  startY: number,
  shapeScale: number,
): string {
  const scaleValue = (
    value: number,
  ) => value * shapeScale

  return `
    M ${startX} ${startY}

    C ${startX - scaleValue(800)}
      ${startY + scaleValue(100)},
      ${startX - scaleValue(600)}
      ${startY + scaleValue(800)},
      ${startX - scaleValue(400)}
      ${startY + scaleValue(1000)}

    C ${startX - scaleValue(200)}
      ${startY + scaleValue(1200)},
      ${startX + scaleValue(700)}
      ${startY + scaleValue(1600)},
      ${startX + scaleValue(300)}
      ${startY + scaleValue(2200)}

    C ${startX - scaleValue(100)}
      ${startY + scaleValue(2800)},
      ${startX - scaleValue(1000)}
      ${startY + scaleValue(2800)},
      ${startX - scaleValue(800)}
      ${startY + scaleValue(2200)}

    C ${startX - scaleValue(600)}
      ${startY + scaleValue(1600)},
      ${startX + scaleValue(150)}
      ${startY + scaleValue(2000)},
      ${startX + scaleValue(400)}
      ${startY + scaleValue(2200)}

    C ${startX + scaleValue(650)}
      ${startY + scaleValue(2400)},
      ${startX + scaleValue(400)}
      ${startY + scaleValue(3000)},
      ${startX + scaleValue(100)}
      ${startY + scaleValue(3200)}

    C ${startX - scaleValue(200)}
      ${startY + scaleValue(3400)},
      ${startX - scaleValue(300)}
      ${startY + scaleValue(3400)},
      ${startX - scaleValue(400)}
      ${startY + scaleValue(3800)}

    C ${startX - scaleValue(500)}
      ${startY + scaleValue(4200)},
      ${startX - scaleValue(300)}
      ${startY + scaleValue(4400)},
      ${startX - scaleValue(100)}
      ${startY + scaleValue(4600)}
  `
}

// ------------------- Visual Progress Map -------------------

function createVisualProgressMap(
  path: SVGPathElement,
  sampleCount = 1400,
) {
  const totalLength =
    path.getTotalLength()

  const weightedSamples: Array<{
    length: number
    weight: number
  }> = [
    {
      length: 0,
      weight: 0,
    },
  ]

  let accumulatedWeight = 0

  let previousPoint =
    path.getPointAtLength(0)

  for (
    let index = 1;
    index <= sampleCount;
    index += 1
  ) {
    const length =
      totalLength *
      index /
      sampleCount

    const point =
      path.getPointAtLength(length)

    const deltaX =
      point.x -
      previousPoint.x

    const deltaY =
      point.y -
      previousPoint.y

    const segmentLength =
      Math.hypot(
        deltaX,
        deltaY,
      )

    const downWeight =
      Math.max(
        deltaY,
        0,
      )

    const sideWeight =
      Math.abs(deltaX) *
      0.1

    const upWeight =
      deltaY < 0
        ? Math.abs(deltaY) *
          0.02
        : 0

    const minimumWeight =
      segmentLength *
      0.015

    const currentWeight =
      Math.max(
        downWeight +
          sideWeight +
          upWeight,
        minimumWeight,
      )

    accumulatedWeight +=
      currentWeight

    weightedSamples.push({
      length,
      weight:
        accumulatedWeight,
    })

    previousPoint = point
  }

  const samples:
    VisualProgressSample[] =
      weightedSamples.map(
        (sample) => ({
          length:
            sample.length,

          progress:
            accumulatedWeight === 0
              ? 0
              : sample.weight /
                accumulatedWeight,
        }),
      )

  return {
    totalLength,
    samples,
  }
}

function getLengthByVisualProgress(
  samples:
    VisualProgressSample[],
  progress: number,
): number {
  const targetProgress =
    gsap.utils.clamp(
      0,
      1,
      progress,
    )

  let left = 0
  let right =
    samples.length - 1

  while (left < right) {
    const middle =
      Math.floor(
        (left + right) / 2,
      )

    if (
      samples[middle].progress <
      targetProgress
    ) {
      left =
        middle + 1
    } else {
      right =
        middle
    }
  }

  const current =
    samples[left]

  const previous =
    samples[
      Math.max(
        0,
        left - 1,
      )
    ]

  const progressRange =
    current.progress -
      previous.progress ||
    1

  const interpolationRatio =
    (
      targetProgress -
      previous.progress
    ) /
    progressRange

  return gsap.utils.interpolate(
    previous.length,
    current.length,
    interpolationRatio,
  )
}

// ------------------- Utility -------------------

function roundLayoutValue(
  value: number,
): number {
  return (
    Math.round(
      value * 10,
    ) / 10
  )
}

function getWindowScrollY():
  number {
  return (
    window.scrollY ||
    document.documentElement
      .scrollTop ||
    0
  )
}

// ------------------- Composable -------------------

export function useCirclePathAnimation(
  options:
    UseCirclePathAnimationOptions = {},
) {
  const {
    pathScrollStartRatio = 0.8,
    pathScrollLengthRatio = 5.4,
    headCircleInsetRatio = 0.35,
    trailEndInsetRatio = 0.08,

    /*
     * 必须与父组件最终 scale 一致。
     */
    geometryReferenceScale = 1.2,

    /*
     * 维持原路径形状。
     */
    pathShapeScale = 1,

    pathOffsetX = 0,
    pathOffsetY = 0,
  } = options

  // ------------------- DOM Refs -------------------

  const containerRef =
    ref<HTMLElement | null>(
      null,
    )

  const measureCircleRef =
    ref<HTMLElement | null>(
      null,
    )

  const trailPathRef =
    ref<SVGPathElement | null>(
      null,
    )

  const headCircleRef =
    ref<SVGCircleElement | null>(
      null,
    )

  // ------------------- SVG State -------------------

  const svgWidth =
    ref(0)

  const svgHeight =
    ref(0)

  const pathD =
    ref('')

  const trailStrokeWidth =
    ref(0)

  const headCircleX =
    ref(0)

  const headCircleY =
    ref(0)

  // ------------------- Internal State -------------------

  let pathScrollTrigger:
    ScrollTrigger | null = null

  let resizeObserver:
    ResizeObserver | null = null

  let resizeRafId:
    number | null = null

  let rebuildVersion = 0

  let previousLayoutSignature =
    ''

  // ------------------- Layout -------------------

  function getLayoutSignature():
    string {
    const container =
      containerRef.value

    const measureCircle =
      measureCircleRef.value

    if (
      !container ||
      !measureCircle
    ) {
      return ''
    }

    return [
      roundLayoutValue(
        container.clientWidth,
      ),

      roundLayoutValue(
        container.clientHeight,
      ),

      roundLayoutValue(
        measureCircle.offsetLeft,
      ),

      roundLayoutValue(
        measureCircle.offsetTop,
      ),

      roundLayoutValue(
        measureCircle.offsetWidth,
      ),

      roundLayoutValue(
        measureCircle.offsetHeight,
      ),

      window.innerWidth,
      window.innerHeight,
    ].join(':')
  }

  // ------------------- Cleanup -------------------

  function destroyPathScrollTrigger() {
    if (!pathScrollTrigger) {
      return
    }

    pathScrollTrigger.kill()

    pathScrollTrigger =
      null
  }

  function cancelScheduledResize() {
    if (
      resizeRafId === null
    ) {
      return
    }

    cancelAnimationFrame(
      resizeRafId,
    )

    resizeRafId =
      null
  }

  function cleanupAnimation() {
    rebuildVersion += 1

    cancelScheduledResize()
    destroyPathScrollTrigger()
  }

  // ------------------- Progress -------------------

  function getCurrentScrollProgress():
    number {
    const animationStart =
      window.innerHeight *
      pathScrollStartRatio

    const animationLength =
      window.innerHeight *
      pathScrollLengthRatio

    if (
      animationLength <= 0
    ) {
      return 0
    }

    return gsap.utils.clamp(
      0,
      1,
      (
        getWindowScrollY() -
        animationStart
      ) /
        animationLength,
    )
  }

  // ------------------- Render -------------------

  function renderPathProgress(
    progress: number,
    trailPath:
      SVGPathElement,
    headCircle:
      SVGCircleElement,
    pathLength: number,
    circleRadius: number,
    samples:
      VisualProgressSample[],
  ) {
    const normalizedProgress =
      gsap.utils.clamp(
        0,
        1,
        progress,
      )

    const currentLength =
      getLengthByVisualProgress(
        samples,
        normalizedProgress,
      )

    const visibleTrailLength =
      Math.max(
        0,
        currentLength -
          circleRadius *
            trailEndInsetRatio,
      )

    const headCircleLength =
      Math.max(
        0,
        currentLength -
          circleRadius *
            headCircleInsetRatio,
      )

    const headPoint =
      trailPath
        .getPointAtLength(
          headCircleLength,
        )

    headCircle.setAttribute(
      'cx',
      String(headPoint.x),
    )

    headCircle.setAttribute(
      'cy',
      String(headPoint.y),
    )

    trailPath.style
      .strokeDashoffset =
      String(
        pathLength -
          visibleTrailLength,
      )
  }

  // ------------------- Animation Setup -------------------

  async function createCirclePathAnimation() {
    const currentVersion =
      ++rebuildVersion

    destroyPathScrollTrigger()

    await nextTick()

    if (
      currentVersion !==
      rebuildVersion
    ) {
      return
    }

    const container =
      containerRef.value

    const measureCircle =
      measureCircleRef.value

    if (
      !container ||
      !measureCircle
    ) {
      return
    }

    /*
     * 使用不包含 transform 的布局数据。
     */
    const containerWidth =
      container.clientWidth

    const containerHeight =
      container.clientHeight

    const circleWidth =
      measureCircle.offsetWidth

    const circleHeight =
      measureCircle.offsetHeight

    const localCircleCenterX =
      measureCircle.offsetLeft +
      circleWidth / 2

    const localCircleCenterY =
      measureCircle.offsetTop +
      circleHeight / 2

    const localCircleRadius =
      Math.min(
        circleWidth,
        circleHeight,
      ) / 2

    if (
      containerWidth <= 0 ||
      containerHeight <= 0 ||
      localCircleRadius <= 0
    ) {
      return
    }

    /*
     * 核心修复：
     *
     * 不根据当前实际 scale 计算，
     * 而是始终模拟父层处于最终 scale
     * 时的 getBoundingClientRect 结果。
     */
    const referenceScale =
      Math.max(
        0.01,
        geometryReferenceScale,
      )

    const designSvgWidth =
      containerWidth *
      referenceScale

    const designSvgHeight =
      containerHeight *
      referenceScale

    const designCircleCenterX =
      localCircleCenterX *
        referenceScale +
      pathOffsetX

    const designCircleCenterY =
      localCircleCenterY *
        referenceScale +
      pathOffsetY

    const designCircleRadius =
      localCircleRadius *
      referenceScale

    const designStrokeWidth =
      circleWidth *
      referenceScale

    svgWidth.value =
      designSvgWidth

    svgHeight.value =
      designSvgHeight

    trailStrokeWidth.value =
      designStrokeWidth

    headCircleX.value =
      designCircleCenterX

    headCircleY.value =
      designCircleCenterY

    pathD.value =
      createPathD(
        designCircleCenterX,
        designCircleCenterY,
        pathShapeScale,
      )

    previousLayoutSignature =
      getLayoutSignature()

    await nextTick()

    if (
      currentVersion !==
      rebuildVersion
    ) {
      return
    }

    const trailPath =
      trailPathRef.value

    const headCircle =
      headCircleRef.value

    if (
      !trailPath ||
      !headCircle
    ) {
      return
    }

    const {
      totalLength:
        pathLength,
      samples,
    } =
      createVisualProgressMap(
        trailPath,
      )

    trailPath.style
      .strokeDasharray =
      `${pathLength} ${pathLength}`

    trailPath.style
      .strokeDashoffset =
      String(pathLength)

    headCircle.setAttribute(
      'cx',
      String(
        designCircleCenterX,
      ),
    )

    headCircle.setAttribute(
      'cy',
      String(
        designCircleCenterY,
      ),
    )

    headCircle.setAttribute(
      'r',
      String(
        designCircleRadius,
      ),
    )

    pathScrollTrigger =
      ScrollTrigger.create({
        scroller: window,

        start: () =>
          window.innerHeight *
          pathScrollStartRatio,

        end: () =>
          window.innerHeight *
          (
            pathScrollStartRatio +
            pathScrollLengthRatio
          ),

        invalidateOnRefresh:
          true,

        onUpdate: (self) => {
          renderPathProgress(
            self.progress,
            trailPath,
            headCircle,
            pathLength,
            designCircleRadius,
            samples,
          )
        },

        onRefresh: (self) => {
          renderPathProgress(
            self.progress,
            trailPath,
            headCircle,
            pathLength,
            designCircleRadius,
            samples,
          )
        },
      })

    /*
     * 处理页面从任意滚动位置加载。
     */
    renderPathProgress(
      getCurrentScrollProgress(),
      trailPath,
      headCircle,
      pathLength,
      designCircleRadius,
      samples,
    )
  }

  // ------------------- Resize -------------------

  function scheduleAnimationRebuild() {
    cancelScheduledResize()

    resizeRafId =
      requestAnimationFrame(
        () => {
          resizeRafId =
            null

          const currentSignature =
            getLayoutSignature()

          if (
            !currentSignature ||
            currentSignature ===
              previousLayoutSignature
          ) {
            return
          }

          void createCirclePathAnimation()
        },
      )
  }

  function handleWindowResize() {
    scheduleAnimationRebuild()
  }

  function handleOrientationChange() {
    scheduleAnimationRebuild()
  }

  // ------------------- Lifecycle -------------------

  onMounted(async () => {
    await nextTick()

    await createCirclePathAnimation()

    const container =
      containerRef.value

    const measureCircle =
      measureCircleRef.value

    resizeObserver =
      new ResizeObserver(
        () => {
          scheduleAnimationRebuild()
        },
      )

    if (container) {
      resizeObserver.observe(
        container,
      )
    }

    if (measureCircle) {
      resizeObserver.observe(
        measureCircle,
      )
    }

    window.addEventListener(
      'resize',
      handleWindowResize,
      {
        passive: true,
      },
    )

    window.addEventListener(
      'orientationchange',
      handleOrientationChange,
      {
        passive: true,
      },
    )
  })

  onUnmounted(() => {
    cleanupAnimation()

    if (resizeObserver) {
      resizeObserver.disconnect()

      resizeObserver =
        null
    }

    window.removeEventListener(
      'resize',
      handleWindowResize,
    )

    window.removeEventListener(
      'orientationchange',
      handleOrientationChange,
    )
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(
      () => {
        cleanupAnimation()

        if (resizeObserver) {
          resizeObserver.disconnect()

          resizeObserver =
            null
        }

        window.removeEventListener(
          'resize',
          handleWindowResize,
        )

        window.removeEventListener(
          'orientationchange',
          handleOrientationChange,
        )
      },
    )
  }

  return {
    containerRef,
    measureCircleRef,
    trailPathRef,
    headCircleRef,

    svgWidth,
    svgHeight,
    pathD,
    trailStrokeWidth,
    headCircleX,
    headCircleY,
  }
}