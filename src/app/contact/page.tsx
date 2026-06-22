"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";

export default function Contact() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-fade", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black px-6 md:px-12 py-32 flex flex-col justify-between">
      <div>
        <span className="contact-fade font-mono text-xs tracking-[0.2em] opacity-50 block mb-4">
          GET IN TOUCH
        </span>
        <h1 className="contact-fade font-mono uppercase text-[12vw] md:text-[6vw] leading-[0.9] tracking-tight mb-16">
          Let's build
          <br />
          something.
        </h1>

        <div className="contact-fade flex flex-col md:flex-row gap-12 md:gap-24 font-mono text-sm">
          <a
            href="mailto:hello@abhirajsinghbhati.dev"
            className="text-2xl md:text-3xl underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            hello@abhirajsinghbhati.dev
          </a>

          <div className="flex flex-col gap-2">
            <span className="opacity-50">ELSEWHERE</span>
            <a href="#" className="hover:opacity-60 transition-opacity">GitHub</a>
            <a href="#" className="hover:opacity-60 transition-opacity">LinkedIn</a>
            <a href="#" className="hover:opacity-60 transition-opacity">Twitter / X</a>
          </div>
        </div>
      </div>

      <div className="contact-fade font-mono text-[10px] tracking-widest opacity-40 mt-24">
        BASED IN INDIA — AVAILABLE WORLDWIDE
      </div>
    </main>
  );
}