'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP } from '@/libs/gsap'
import Marquee from './Marquee'
import Image from 'next/image'

const Heropage = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!containerRef.current) return

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // ── Background grid lines ──────────────────────────────────────────────
        tl.fromTo(
            '.grid-line',
            { scaleY: 0, transformOrigin: 'top center' },
            { scaleY: 1, duration: 1.6, ease: 'power4.inOut', stagger: 0.15 },
            0
        )

        // ── Step 1: DEVELOPER slides DOWN from top ─────────────────────────────
        // Parent has overflow-hidden → masking/reveal effect from the top edge
        tl.fromTo(
            '.hero-developer',
            { y: '-100%' },
            { y: '0%', duration: 1.0 },
            0.05
        )

        // ── Step 2: PROBLEM SOLVER slides UP from bottom ───────────────────────
        // Parent has overflow-hidden → masking/reveal effect from the bottom edge
        tl.fromTo(
            '.hero-problem-solver',
            { y: '100%' },
            { y: '0%', duration: 1.0 },
            0.35
        )

        // ── Step 3: UI/UX slides LEFT from the D's position → natural place ────
        // Measure at runtime: how far right UI/UX must shift to sit AT the D
        const uiuxEl = containerRef.current.querySelector<HTMLElement>('.hero-uiux')
        const developerEl = containerRef.current.querySelector<HTMLElement>('.hero-developer')
        let xOffset = 0
        if (uiuxEl && developerEl) {
            const uiuxRect = uiuxEl.getBoundingClientRect()
            const devRect  = developerEl.getBoundingClientRect()
            // Shift UI/UX right so its left edge aligns with the D's left edge
            xOffset = devRect.left - uiuxRect.left
        }
        tl.fromTo(
            '.hero-uiux',
            { x: xOffset, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.1 },
            0.75  // fires last — after DEVELOPER and PROBLEM SOLVER are in place
        )

        // ── Image reveal (clip-path sweep up) ─────────────────────────────────
        tl.fromTo(
            '.hero-image-wrap',
            { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
            { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.4, ease: 'power4.inOut' },
            0.3
        )
        tl.fromTo(
            '.hero-image',
            { scale: 1.3 },
            { scale: 1.1, duration: 2, ease: 'power3.out' },
            0.3
        )

        // ── Description text fades in ─────────────────────────────────────────
        tl.fromTo(
            '.desc-fade',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.1 },
            1.0
        )
    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen w-full flex flex-col justify-between pt-36 pb-12 overflow-hidden bg-[#EAE6DF] text-[#1C1B1A]"
        >
            {/* 5 Vertical baseline grid lines */}
            <div className="absolute inset-0 pointer-events-none flex justify-between px-6 md:px-16 z-0">
                <div className="grid-line w-px h-full bg-[#1C1B1A]/8 origin-top"></div>
                <div className="grid-line w-px h-full bg-[#1C1B1A]/8 origin-top hidden sm:block"></div>
                <div className="grid-line w-px h-full bg-[#1C1B1A]/8 origin-top"></div>
                <div className="grid-line w-px h-full bg-[#1C1B1A]/8 origin-top hidden sm:block"></div>
                <div className="grid-line w-px h-full bg-[#1C1B1A]/8 origin-top"></div>
            </div>

            {/* CSS Background Drafting Grid */}
            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #1C1B1A 1.5px, transparent 1.5px),
            linear-gradient(to bottom, #1C1B1A 1.5px, transparent 1.5px)
          `,
                    backgroundSize: '48px 48px',
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)'
                }}
            />

            {/* SVG Analog noise overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.35]">
                <svg className="w-full h-full">
                    <filter id="analogue-noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.12 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#analogue-noise)" />
                </svg>
            </div>

            {/* Content wrapper — flush left, positioned from top like reference */}
            <div className="relative z-10 flex flex-col grow justify-start pt-8 md:pt-10 w-full pl-6 md:pl-16 ">
                {/* Massive Editorial Headline */}
                <div className="w-full flex flex-col gap-0 pb-10 md:pb-16 pl-0 md:pl-20">

                    {/* Line 1: tiny UX/UI centered vertically with massive DESIGNER */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:gap-5">
                        {/* No overflow-hidden here — UI/UX slides in from outside its bounds */}
                        <div className="hero-uiux shrink-0 flex items-end gap-1">
                            <span
                                className="
            animate-split-reveal
            uppercase
            select-none
            inline-block
            leading-none
            font-anton
        "
                                style={{
                                    fontSize: "clamp(24px, 4vw, 80px)",
                                    color: "#1C1B1A",
                                    transform: "scaleX(1.05)"
                                }}
                            >
                                ai/
                            </span>

                            <span
                                className="
            animate-split-reveal
            uppercase
            select-none
            inline-block
            leading-none
            font-anton
        "
                                style={{
                                    fontSize: "clamp(24px, 4vw, 80px)",
                                    color: "#B7B3AE",
                                    transform: "scaleX(1.05)"
                                }}
                            >
                                web
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <h1
                                className="hero-developer font-bebas uppercase select-none inline-block"
                                style={{ fontSize: 'clamp(40px, 12vw, 210px)', lineHeight: 0.9, letterSpacing: '0.03em', color: '#1C1B1A' }}
                            >
                                Developer
                            </h1>
                        </div>
                    </div>

                    {/* Line 2: massive PORTFOLIO — outlined only, thin 1px stroke */}
                    <div className="overflow-hidden">
                        <h1
                            className="hero-problem-solver font-bebas uppercase selection:text-[#1C1B1A]"
                            style={{
                                fontSize: 'clamp(40px, 12vw, 210px)',
                                lineHeight: 0.9,
                                letterSpacing: '0.03em',
                                    color: 'transparent',
                                    WebkitTextStroke: '2px #9D9A92',
                                display: 'block',
                            }}
                        >
                            Problem solver
                        </h1>
                    </div>
                </div>

                {/* Horizontal divider line exactly as in original */}
                <div className="w-full border-t border-[#1C1B1A]/15 mb-10 md:mb-16 pr-6 md:pr-16" />

                {/* Sub-Hero grid with image & copy — constrained max-width */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 items-start max-w-6xl pr-6 md:pr-16">
                    {/* Image Column */}
                    <div className="col-span-1 md:col-span-5 flex justify-center md:justify-start">
                        {/* Shrink-wrapped relative wrapper to ensure stamp is correctly bound to image boundaries */}
                        <div className="relative w-full max-w-70">
                            {/* Rotating Decorative Stamp */}
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 md:w-36 md:h-36 z-20 spin-animation select-none pointer-events-none">
                                <svg viewBox="0 0 100 100" className="w-full h-full opacity-55">
                                    <path
                                        id="circlePath"
                                        d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                                        fill="transparent"
                                    />
                                    <text className="fill-[#1C1B1A] font-jetbrains text-[4.8px] uppercase tracking-[0.22em] font-semibold">
                                        <textPath href="#circlePath">
                                            • DIVERSE UI/UX • PROBLEM SOLVER • CREATIVE DEVELOPER
                                        </textPath>
                                    </text>
                                </svg>
                            </div>

                            <div className="hero-image-wrap overflow-hidden aspect-4/5 w-full relative border border-[#1C1B1A]/12 p-2 bg-[#F4F1EB] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                                <div className="overflow-hidden w-full h-full relative bg-[#EAE6DF]">
                                    <img
                                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                                        alt="Creative Developer Portfolio"
                                        className="hero-image object-cover w-full h-full scale-[1.1] transition-all duration-700 ease-in-out cursor-crosshair"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copy Column */}
                    <div className="col-span-1 md:col-span-7 flex flex-col justify-center gap-6">
                        <p className="desc-fade font-jetbrains text-base md:text-lg leading-relaxed text-[#1C1B1A] font-light">
                            Hi, my name is Abhiraj, and I am a developer who bridges the gap between design concepts and dynamic code. I build robust digital products that solve actual problems, delivering fluid interactions and immaculately structured code.
                        </p>
                        <p className="desc-fade font-jetbrains text-xs text-[#827C75] tracking-wider uppercase leading-loose border-l border-[#1C1B1A]/20 pl-4">
                            Core Focus: React, Next.js, WebGL & Creative Physics
                            <br />
                             Vibe: Editorial, raw plaster base, minimal tech elements
                        </p>
                    </div>
                </div>
            </div>

            {/* Reusable Marquee ticker at bottom */}
            <Marquee className="border-t border-b border-[#1C1B1A]/12 py-4 mt-16 md:mt-24 select-none" />
            {/* Embedded Component-level CSS Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .spin-animation {
          animation: spin-clockwise 25s linear infinite;
        }
        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hero-image {
          filter: grayscale(80%) sepia(15%) hue-rotate(345deg) contrast(1.1) brightness(0.9);
          transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-image:hover {
          filter: grayscale(0%) sepia(0%) contrast(1) brightness(1);
          transform: scale(1.03);
        }
      `}} />
        </div>
    )
}

export default Heropage