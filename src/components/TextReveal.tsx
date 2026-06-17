'use client'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { TextRevealProps ,TextRevealHandler} from '@/types/TextReveal.types'
import { gsap, useGSAP, SplitText, ScrollTrigger } from '@/libs/gsap'
const TextReveal = forwardRef<TextRevealHandler, TextRevealProps>(
  (
    {
      children,
      className = '',
      SCrollStart = 'top 70%',
      trigger = 'mount',
      duration = '.8',
      stagger = '.05',
      splitBy = 'lines',
      delay = '0',
      ease = 'power3.out'
    },
    ref
  ) => {
    const WrapperRef = useRef<HTMLDivElement>(null)
    const SplitRef = useRef<SplitText | null>(null)
    const TlRef= useRef<gsap.core.Timeline | null>(null)

    useImperativeHandle(ref, () => ({
      play:()=> TlRef.current?.play(),
      reverse:()=> TlRef.current?.reverse()
    }))

    useGSAP(() => {
      const split = new SplitText(WrapperRef.current, { type: splitBy, lineThreshold: 0.3 })
      SplitRef.current = split

      const elements = split[splitBy]
      const staggerValue = Number(stagger)
      gsap.set(elements,{
        y: "110%",
      })
      TlRef.current=gsap.timeline({
        defaults: {
          delay,
        },
        paused:true,
      })
      TlRef.current.to(elements,{
        y: "0%",
        duration,
        opacity: 1,
        stagger:{
          each: staggerValue,
        },
        ease
      })
        if(trigger==='mount'){
          TlRef.current.play()
        }
        else if(trigger==='scroll'){
          ScrollTrigger.create({
            trigger: WrapperRef.current,
            start: SCrollStart,
            once:true,
            onEnter: () => TlRef.current?.play()
          })}
        
          return ()=>{
            TlRef.current?.kill()
            SplitRef.current?.revert()
          }

    }, {
      scope: WrapperRef
    })

    return <div ref={WrapperRef} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  }
)
TextReveal.displayName = 'TextReveal'
export default TextReveal
