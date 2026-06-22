import { gsap } from "@/libs/gsap";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const STRIP_COUNT: number = Math.round(Math.random()*12);


const CreateStrip = () => {
    const overlay = document.createElement('div')
    overlay.id = 'page-transition-overlay'
    overlay.style.cssText = `
        position:fixed;
        inset:0;
        z-index:9999;
        pointer-events:none;
        display:flex;
    `
    for (let i = 0; i < STRIP_COUNT; i++) {
        const strip = document.createElement('div')
        strip.style.cssText = `
           flex:1;
           height:100%;
            background-color:#010101;
            transform:scaleY(0);
            transform-origin:bottom;
        `
        overlay.appendChild(strip)
    }
    document.body.appendChild(overlay);
    return overlay;
}
const removeOverlay = () => {
    const el = document.querySelector('#page-transition-overlay')
    if (el) {
        el.remove()
    }
}
const useViewTransition = () => {


    const router = useRouter()

    const navigateTo = useCallback((href: string) => {
        const overlay = CreateStrip();

        const strip = Array.from(overlay.children)

        gsap.to(strip, {
            scaleY: 1,
            duration: '.55',
            ease: 'power3.inOut',
            stagger: {
                each: .05,
                from: 'random'
            },
            onComplete: () => {
                router.push(href)

                gsap.to(strip, {
                    scaleY: 0,
                    duration: '.65',
                    delay: '.01',
                    stagger: {
                        each: .05,
                        from: 'random'
                    },
                    transformOrigin: 'top',
                    ease: 'power3.inOut',
                    onComplete: () => {
                        removeOverlay()
                    }
                })
            }

        })
    }, [router])

    return { navigateTo };

}

export default useViewTransition