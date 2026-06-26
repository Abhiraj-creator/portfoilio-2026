'use client'
import { gsap, SplitText, useGSAP } from '@/libs/gsap'
import React, { useRef } from 'react'
import { TextRollProps } from '@/types/TextRoll.types'

const TextRoll = ({ duration='.4',children, splitBy = 'chars' }: TextRollProps) => {
    const WrapperRef = useRef<HTMLDivElement>(null)
    const SplitOriginalRef = useRef<SplitText | null>(null)
    const SplitCloneRef = useRef<SplitText | null>(null)

    const getElements = (ref: React.RefObject<SplitText | null>) =>
        ref.current?.[splitBy as 'chars' | 'words' | 'lines']

    useGSAP(() => {
        if (!WrapperRef.current) return

        const originalEl = WrapperRef.current.querySelector('.text-roll-original')
        const cloneEl = WrapperRef.current.querySelector('.text-roll-clone')
        const opts = { type: splitBy, lineThreshold: 0.3 }

        if (originalEl) SplitOriginalRef.current = new SplitText(originalEl, opts)
        if (cloneEl) SplitCloneRef.current = new SplitText(cloneEl, opts)

        const origElements = getElements(SplitOriginalRef)
        const cloneElements = getElements(SplitCloneRef)

        if (origElements) gsap.set(origElements, { yPercent: 0 })
        if (cloneElements) gsap.set(cloneElements, { yPercent: 100 })

        return () => {
            SplitOriginalRef.current?.revert()
            SplitCloneRef.current?.revert()
        }
    }, { scope: WrapperRef, dependencies: [splitBy] })

    const { contextSafe } = 
    useGSAP({ scope: WrapperRef })

    const handleHover = contextSafe((entering: boolean) => {
        const origElements = getElements(SplitOriginalRef)
        const cloneElements = getElements(SplitCloneRef)
        if (!origElements || !cloneElements) return

        gsap.killTweensOf([origElements, cloneElements])

        const staggerVal = entering ? 0.015 : -0.01
        gsap.to(origElements, {
            yPercent: entering ? -100 : 0,
            duration,
            stagger: staggerVal,
            ease: 'power2.out'
        })
        gsap.to(cloneElements, {
            yPercent: entering ? 0 : 100,
            duration,
            stagger: staggerVal,
            ease: 'power2.out'
        })
    })

    return (
        <div 
            ref={WrapperRef} 
            className='overflow-hidden relative inline-block' 
            onMouseEnter={() => handleHover(true)} 
            onMouseLeave={() => handleHover(false)}
        >
            <div className="text-roll-original">
                {children}
            </div>
            <div className="text-roll-clone absolute top-0 left-0 w-full h-full pointer-events-none">
                {children}
            </div>
        </div>
    )
}

export default TextRoll
