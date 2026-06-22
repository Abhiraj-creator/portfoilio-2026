'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP } from '@/libs/gsap'

interface MarqueeProps {
  className?: string
  gap?: string
}

const Marquee = ({ 
  className = '', 
  gap = '2.5rem' 
}: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Alternating dark text and light grunge text array as requested
  const items = [
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
    { type: 'dark', text: 'MY WORK' },
    { type: 'grunge', text: 'MY WORK' },
  ]

  // Repeat the core items 4 times to span wide screens
  const repeatedItems = [...items, ...items, ...items, ...items]

  useGSAP(() => {
    if (!trackRef.current) return

    let currentX = 0
    let targetSpeed = 0.08 // Match infinite carousel base speed (opposite direction for parallax)
    let currentSpeed = 0.08

    let lastScrollY = window.scrollY

    const tick = () => {
      const currentScrollY = window.scrollY
      const dy = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      if (dy > 0) {
        // Scrolling down: move text from right to left (negative speed) for parallax
        targetSpeed = -0.08 - (dy * 0.015)
      } else if (dy < 0) {
        // Scrolling up: move text from left to right (positive speed) for parallax
        targetSpeed = 0.08 - (dy * 0.015)
      } else {
        // No scrolling: ease back to default direction and base speed
        targetSpeed = 0.08
      }

      // Clamp max velocity-based speed to prevent dizzying speeds
      targetSpeed = gsap.utils.clamp(-1.2, 1.2, targetSpeed)

      // Interpolate current speed toward target speed for physics momentum / easing
      currentSpeed = gsap.utils.interpolate(currentSpeed, targetSpeed, 0.06)

      // Advance marquee position
      currentX += currentSpeed

      // Seamless wrap at 50% width
      if (currentX <= -50) {
        currentX += 50
      } else if (currentX >= 0) {
        currentX -= 50
      }

      // Apply transformation
      gsap.set(trackRef.current, { xPercent: currentX })
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
    }
  }, { scope: containerRef })

  return (
    <div 
      ref={containerRef} 
      className={`w-full overflow-hidden relative select-none ${className}`}
    >
      <div 
        ref={trackRef} 
        className="flex shrink-0 will-change-transform"
      >
        {/* Block 1 */}
        <div className="flex items-center shrink-0" style={{ gap }}>
          {repeatedItems.map((item, index) => (
            <React.Fragment key={`block1-${index}`}>
              {item.type === 'dark' ? (
                <span className="font-bebas text-2xl md:text-4xl uppercase tracking-widest text-[#1C1B1A]">
                  {item.text}
                </span>
              ) : (
                <span className="font-bebas text-2xl md:text-4xl uppercase tracking-widest grunge-text">
                  {item.text}
                </span>
              )}
              <span className="font-mona-sans text-[#A84B2B] text-base md:text-lg shrink-0 select-none">
                ✕
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Separator Gap between the two blocks */}
        <div className="shrink-0" style={{ width: gap }} />

        {/* Block 2 (identical copy for seamless wrapping) */}
        <div className="flex items-center shrink-0" style={{ gap }}>
          {repeatedItems.map((item, index) => (
            <React.Fragment key={`block2-${index}`}>
              {item.type === 'dark' ? (
                <span className="font-bebas text-2xl md:text-4xl uppercase tracking-widest text-[#1C1B1A]">
                  {item.text}
                </span>
              ) : (
                <span className="font-bebas text-2xl md:text-4xl uppercase tracking-widest grunge-text">
                  {item.text}
                </span>
              )}
              <span className="font-mona-sans text-[#A84B2B] text-base md:text-lg shrink-0 select-none">
                ✕
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Separator Gap at the end to make it perfectly symmetric */}
        <div className="shrink-0" style={{ width: gap }} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .grunge-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(28, 27, 26, 0.35);
          background: linear-gradient(rgba(28, 27, 26, 0.15), rgba(28, 27, 26, 0.15)), 
                      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-clip: text;
          -webkit-background-clip: text;
          opacity: 0.8;
          text-shadow: 0 0 0.5px rgba(28, 27, 26, 0.05);
        }
      `}} />
    </div>
  )
}

export default Marquee
