import {
  nextTick,
  onMounted,
  onUnmounted,
  type Ref,
} from 'vue'

import gsap from 'gsap'

import {
  ScrollTrigger,
} from 'gsap/ScrollTrigger'

import Lenis
  from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

// ------------------- Types -------------------

interface UseInitialPageAnimationsOptions {
  startContainer:
    Ref<HTMLElement | null>

  infoCard:
    Ref<HTMLElement | null>

  /**
   * 负责 ScrollBar 的纵向移动。
   */
  scrollBarMover:
    Ref<HTMLElement | null>

  /**
   * 负责 ScrollBar 的缩放。
   */
  scrollBarScaler:
    Ref<HTMLElement | null>
}

// ------------------- Composable -------------------

export function useInitialPageAnimations({
  startContainer,
  infoCard,
  scrollBarMover,
  scrollBarScaler,
}: UseInitialPageAnimationsOptions) {
  let lenis:
    Lenis | null = null

  let gsapContext:
    gsap.Context | null = null

  let lenisTickerHandler:
    ((time: number) => void) |
    null = null

  let lenisScrollHandler:
    (() => void) |
    null = null

  let refreshRafId:
    number | null = null

  let windowLoadHandler:
    (() => void) |
    null = null

  let windowResizeHandler:
    (() => void) |
    null = null

  let pageShowHandler:
    (() => void) |
    null = null

  // ------------------- Stable Refresh -------------------

  /**
   * 页面级 composable 是唯一负责
   * 全局 ScrollTrigger.refresh() 的地方。
   *
   * 双 requestAnimationFrame 可以等待：
   *
   * 1. Vue DOM 更新；
   * 2. 浏览器布局；
   * 3. SVG、字体和恢复滚动位置。
   */
  function scheduleStableRefresh() {
    if (
      refreshRafId !== null
    ) {
      cancelAnimationFrame(
        refreshRafId,
      )

      refreshRafId =
        null
    }

    refreshRafId =
      requestAnimationFrame(
        () => {
          refreshRafId =
            requestAnimationFrame(
              () => {
                refreshRafId =
                  null

                /*
                 * 先让 Lenis 重新计算页面尺寸，
                 * 再刷新 ScrollTrigger。
                 */
                lenis?.resize()

                ScrollTrigger.refresh()
                ScrollTrigger.update()
              },
            )
        },
      )
  }

  // ------------------- Cleanup -------------------

  function cleanup() {
    if (
      refreshRafId !== null
    ) {
      cancelAnimationFrame(
        refreshRafId,
      )

      refreshRafId =
        null
    }

    if (
      windowLoadHandler
    ) {
      window.removeEventListener(
        'load',
        windowLoadHandler,
      )

      windowLoadHandler =
        null
    }

    if (
      windowResizeHandler
    ) {
      window.removeEventListener(
        'resize',
        windowResizeHandler,
      )

      windowResizeHandler =
        null
    }

    if (
      pageShowHandler
    ) {
      window.removeEventListener(
        'pageshow',
        pageShowHandler,
      )

      pageShowHandler =
        null
    }

    /*
     * 必须先移除 GSAP ticker，
     * 再销毁 Lenis。
     */
    if (
      lenisTickerHandler
    ) {
      gsap.ticker.remove(
        lenisTickerHandler,
      )

      lenisTickerHandler =
        null
    }

    if (
      lenis &&
      lenisScrollHandler
    ) {
      lenis.off(
        'scroll',
        lenisScrollHandler,
      )
    }

    lenisScrollHandler =
      null

    if (lenis) {
      lenis.destroy()

      lenis =
        null
    }

    /*
     * 只清理当前 composable
     * 创建的 GSAP 动画和 ScrollTrigger。
     */
    if (gsapContext) {
      gsapContext.revert()

      gsapContext =
        null
    }
  }

  // ------------------- Lenis -------------------

  function createLenis() {
    /*
     * 使用 as any 是为了兼容不同版本
     * @studio-freight/lenis 的类型定义。
     *
     * 这里沿用你原项目中能够运行的参数。
     */
    const currentLenis =
      new Lenis({
        duration: 1.2,

        easing: (
          progress: number,
        ) =>
          Math.min(
            1,
            1.001 -
              Math.pow(
                2,
                -10 *
                  progress,
              ),
          ),

        direction:
          'vertical',

        gestureDirection:
          'vertical',

        smooth: true,
        smoothTouch: false,

        mouseMultiplier: 1,
        touchMultiplier: 2,

        infinite: false,
      } as any)

    lenis =
      currentLenis

    /*
     * Lenis 产生滚动状态时，
     * 通知 ScrollTrigger 更新。
     *
     * 这里只调用 update，
     * 不调用 refresh。
     */
    lenisScrollHandler =
      () => {
        ScrollTrigger.update()
      }

    currentLenis.on(
      'scroll',
      lenisScrollHandler,
    )

    /*
     * 只使用 GSAP ticker 驱动 Lenis，
     * 不再额外创建 requestAnimationFrame。
     */
    lenisTickerHandler =
      (
        time: number,
      ) => {
        if (
          !lenis ||
          lenis !==
            currentLenis
        ) {
          return
        }

        currentLenis.raf(
          time * 1000,
        )
      }

    gsap.ticker.add(
      lenisTickerHandler,
    )

    /*
     * 避免 GSAP 在卡顿后进行大幅时间补偿，
     * 影响 Lenis 平滑滚动。
     */
    gsap.ticker
      .lagSmoothing(0)
  }

  // ------------------- Start Animations -------------------

  function createStartAnimations() {
    const startElement =
      startContainer.value

    const informationElement =
      infoCard.value

    if (
      !startElement ||
      !informationElement
    ) {
      return
    }

    const innerContainer =
      startElement
        .querySelector<HTMLElement>(
          '.container',
        )

    const content =
      startElement
        .querySelector<HTMLElement>(
          '.content',
        )

    const animationStart =
      'top bottom'

    const animationEnd =
      'top top'

    /*
     * Start 背景颜色动画。
     */
    if (innerContainer) {
      gsap.fromTo(
        innerContainer,
        {
          backgroundColor:
            '#8ed462',
        },
        {
          backgroundColor:
            '#78b453',

          ease: 'none',

          scrollTrigger: {
            trigger:
              informationElement,

            start:
              animationStart,

            end:
              animationEnd,

            scrub: true,

            invalidateOnRefresh:
              true,
          },
        },
      )
    }

    /*
     * Start 内容缩放动画。
     */
    if (content) {
      gsap.fromTo(
        content,
        {
          scale: 1,
        },
        {
          scale: 0.7,

          transformOrigin:
            'center center',

          ease: 'none',

          scrollTrigger: {
            trigger:
              informationElement,

            start:
              animationStart,

            end:
              animationEnd,

            scrub: true,

            invalidateOnRefresh:
              true,
          },
        },
      )
    }
  }

  // ------------------- Information Animation -------------------

  function createInformationAnimation() {
    const informationElement =
      infoCard.value

    if (
      !informationElement
    ) {
      return
    }

    gsap.fromTo(
      informationElement,
      {
        clipPath:
          'inset(0 0 100% 0)',
      },
      {
        clipPath:
          'inset(0 0 0% 0)',

        ease: 'none',

        scrollTrigger: {
          trigger:
            informationElement,

          start:
            'top bottom',

          end:
            'top center',

          scrub: true,

          invalidateOnRefresh:
            true,
        },
      },
    )
  }

  // ------------------- ScrollBar Animations -------------------

  function createScrollBarAnimations() {
    const informationElement =
      infoCard.value

    const moverElement =
      scrollBarMover.value

    const scalerElement =
      scrollBarScaler.value

    if (
      !informationElement ||
      !moverElement ||
      !scalerElement
    ) {
      return
    }

    /*
     * Information 顶部到达视口 20% 时：
     *
     * 1. ScrollBar 完成放大；
     * 2. ScrollBar 开始向上跟随页面。
     */
    const followStartPercent =
      20

    const followStartRatio =
      followStartPercent /
      100

    /*
     * 纵向移动层和缩放层分别初始化。
     *
     * 不再让同一个 DOM 同时承载
     * xPercent、y 和 scale。
     */
    gsap.set(
      moverElement,
      {
        y: 0,
      },
    )

    gsap.set(
      scalerElement,
      {
        scale: 1,

        transformOrigin:
          'center center',
      },
    )

    /*
     * ScrollBar 放大动画。
     *
     * 只作用于 scrollbar-scaler。
     */
    gsap.fromTo(
      scalerElement,
      {
        scale: 1,
      },
      {
        scale: 1.2,

        transformOrigin:
          'center center',

        ease: 'none',

        scrollTrigger: {
          trigger:
            informationElement,

          start:
            'top bottom',

          end:
            `top ${followStartPercent}%`,

          scrub: true,

          invalidateOnRefresh:
            true,
        },
      },
    )

    /*
     * ScrollBar 跟随 Information
     * 向上移动。
     *
     * 只作用于 scrollbar-mover。
     */
    gsap.fromTo(
      moverElement,
      {
        y: 0,
      },
      {
        y: () => {
          /*
           * offsetHeight 不包含 transform，
           * 比 getBoundingClientRect().height
           * 更适合用于动画距离计算。
           */
          const informationHeight =
            informationElement
              .offsetHeight

          return -(
            informationHeight +
            window.innerHeight *
              followStartRatio
          )
        },

        ease: 'none',

        scrollTrigger: {
          trigger:
            informationElement,

          start:
            `top ${followStartPercent}%`,

          end:
            'bottom top',

          scrub: true,

          invalidateOnRefresh:
            true,
        },
      },
    )
  }

  // ------------------- Create All Animations -------------------

  function createAnimations() {
    gsapContext =
      gsap.context(
        () => {
          createStartAnimations()

          createInformationAnimation()

          createScrollBarAnimations()
        },
      )
  }

  // ------------------- Global Events -------------------

  function registerGlobalEvents() {
    /*
     * 图片、Rive、SVG 等资源加载完成后，
     * 页面高度可能发生改变。
     */
    if (
      document.readyState !==
      'complete'
    ) {
      windowLoadHandler =
        () => {
          scheduleStableRefresh()
        }

      window.addEventListener(
        'load',
        windowLoadHandler,
        {
          once: true,
        },
      )
    }

    /*
     * 只在视口尺寸变化时执行全局刷新。
     * 普通组件 ResizeObserver 不执行全局刷新。
     */
    windowResizeHandler =
      () => {
        scheduleStableRefresh()
      }

    window.addEventListener(
      'resize',
      windowResizeHandler,
      {
        passive: true,
      },
    )

    /*
     * 浏览器前进、后退缓存或恢复滚动位置时，
     * 重新同步所有 ScrollTrigger。
     */
    pageShowHandler =
      () => {
        scheduleStableRefresh()
      }

    window.addEventListener(
      'pageshow',
      pageShowHandler,
      {
        passive: true,
      },
    )
  }

  // ------------------- Init -------------------

  async function init() {
    await nextTick()

    if (
      !startContainer.value ||
      !infoCard.value ||
      !scrollBarMover.value ||
      !scrollBarScaler.value
    ) {
      return
    }

    /*
     * 防止 Vue 开发环境、路由重入或热更新
     * 导致重复创建 Lenis 和 ScrollTrigger。
     */
    cleanup()

    createLenis()
    createAnimations()
    registerGlobalEvents()

    /*
     * 等待字体加载完成。
     *
     * 字体加载可能改变 Information、
     * Hero 和卡片的高度。
     */
    if (
      document.fonts?.ready
    ) {
      try {
        await document.fonts.ready
      } catch {
        /*
         * 字体加载失败不阻止页面动画。
         */
      }
    }

    /*
     * 页面级唯一全局刷新。
     */
    scheduleStableRefresh()
  }

  // ------------------- Lifecycle -------------------

  onMounted(() => {
    void init()
  })

  onUnmounted(() => {
    cleanup()
  })

  if (import.meta.hot) {
    import.meta.hot.dispose(
      () => {
        cleanup()
      },
    )
  }

  return {
    init,
    cleanup,
    scheduleStableRefresh,
  }
}