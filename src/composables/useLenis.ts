import { onUnmounted, watch, type WatchStopHandle } from 'vue'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRoute } from 'vue-router'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let tickerHandler: ((time: number) => void) | null = null
let scrollHandler: (() => void) | null = null
let routeWatchStop: WatchStopHandle | null = null

export function useLenis() {
    // ✅ 必须在 composable 内部调用
    const route = useRoute()

    function init(): Lenis {
        if (lenis) {
            return lenis
        }

        lenis = new Lenis({
            duration: 1.2,
            easing: (progress: number) =>
                Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            syncTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        scrollHandler = () => {
            ScrollTrigger.update()
        }

        lenis.on('scroll', scrollHandler)

        tickerHandler = (time: number) => {
            if (!lenis) return
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(tickerHandler)
        gsap.ticker.lagSmoothing(0)

        return lenis
    }

    function refresh(): void {
        if (!lenis) return
        lenis.resize()
        ScrollTrigger.refresh()
        ScrollTrigger.update()
    }

    function destroy(): void {
        if (tickerHandler) {
            gsap.ticker.remove(tickerHandler)
            tickerHandler = null
        }

        if (lenis && scrollHandler) {
            lenis.off('scroll', scrollHandler)
            scrollHandler = null
        }

        if (lenis) {
            lenis.destroy()
            lenis = null
        }
    }

    function setupRouteReset(): void {
        if (routeWatchStop) return

        routeWatchStop = watch(
            () => route.fullPath,
            () => {
                requestAnimationFrame(() => {
                    if (lenis) {
                        lenis.scrollTo(0, { immediate: true })
                    } else {
                        window.scrollTo(0, 0)
                    }
                    ScrollTrigger.refresh()
                })
            },
            { flush: 'post' },
        )
    }

    onUnmounted(() => {
        if (routeWatchStop) {
            routeWatchStop()
            routeWatchStop = null
        }
    })

    return {
        init,
        refresh,
        destroy,
        setupRouteReset,
        getLenis: (): Lenis | null => lenis,
    }
}