import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { SmoothScrollOptions } from "@/types/lenis.types";
gsap.registerPlugin(ScrollTrigger);

export const useLenis = (options?: SmoothScrollOptions): void => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      ...options
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const update = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
};