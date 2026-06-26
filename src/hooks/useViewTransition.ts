import { gsap } from "@/libs/gsap";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { markPageTransitionStart, PAGE_TRANSITION_TOTAL_MS, PAGE_ENTER_LEAD_MS } from "@/libs/pageTransition";

const CreateStrip = (id: string = 'page-transition-overlay') => {
    const STRIP_COUNT: number = Math.max(5, Math.round(Math.random()*12));
    const overlay = document.createElement('div')
    overlay.id = id
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

const removeOverlay = (id: string = 'page-transition-overlay') => {
    const el = document.getElementById(id)
    if (el) {
        el.remove()
    }
}

let isInitialLoad = true;
let isTransitioning = false;

const useViewTransition = () => {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (isInitialLoad) {
            isInitialLoad = false;
            const overlayId = 'page-transition-overlay-initial';
            const overlay = CreateStrip(overlayId);
            const strip = Array.from(overlay.children);
            
            gsap.set(strip, { scaleY: 1, transformOrigin: 'bottom' });

            gsap.to(strip, {
                scaleY: 0,
                duration: 0.65,
                delay: 0.1,
                stagger: {
                    each: 0.05,
                    from: 'random'
                },
                transformOrigin: 'top',
                ease: 'power3.inOut',
                onComplete: () => {
                    removeOverlay(overlayId);
                }
            });
        }
    }, [pathname]);

    const navigateTo = useCallback((href: string) => {
        if (href === pathname || isTransitioning) return;

        isTransitioning = true;
        markPageTransitionStart(PAGE_TRANSITION_TOTAL_MS, PAGE_ENTER_LEAD_MS);
        
        const overlayId = 'page-transition-overlay-nav';
        const overlay = CreateStrip(overlayId);
        const strip = Array.from(overlay.children)

        gsap.to(strip, {
            scaleY: 1,
            duration: 0.55,
            ease: 'power3.inOut',
            stagger: {
                each: 0.05,
                from: 'random'
            },
            onComplete: () => {
                router.push(href)

                gsap.to(strip, {
                    scaleY: 0,
                    duration: 0.65,
                    delay: 0.01,
                    stagger: {
                        each: 0.05,
                        from: 'random'
                    },
                    transformOrigin: 'top',
                    ease: 'power3.inOut',
                    onComplete: () => {
                        isTransitioning = false
                        removeOverlay(overlayId)
                    }
                })
            }
        })
    }, [router, pathname])

    return { navigateTo };
}

export default useViewTransition
