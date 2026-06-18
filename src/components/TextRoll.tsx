'use client'
import { gsap, SplitText, useGSAP } from '@/libs/gsap'
import React, { useRef } from 'react'
import { TextRollProps } from '@/types/TextRoll.types'

const TextRoll = ({
    children,
    splitBy = 'chars'
}: TextRollProps) => {
    const WrapperRef = useRef<HTMLDivElement>(null)
    const SplitOriginalRef = useRef<SplitText | null>(null)
    const SplitCloneRef = useRef<SplitText | null>(null)

    useGSAP(() => {
        if (!WrapperRef.current) return

        const originalEl = WrapperRef.current.querySelector('.text-roll-original')
        const cloneEl = WrapperRef.current.querySelector('.text-roll-clone')

        if (originalEl) {
            SplitOriginalRef.current = new SplitText(originalEl, {
                type: splitBy,
                lineThreshold: 0.3
            })
        }

        if (cloneEl) {
            SplitCloneRef.current = new SplitText(cloneEl, {
                type: splitBy,
                lineThreshold: 0.3
            })
        }

        // Set initial positions
        if (SplitOriginalRef.current) {
            const origElements = SplitOriginalRef.current[splitBy as 'chars' | 'words' | 'lines']
            if (origElements) gsap.set(origElements, { yPercent: 0 })
        }
        if (SplitCloneRef.current) {
            const cloneElements = SplitCloneRef.current[splitBy as 'chars' | 'words' | 'lines']
            if (cloneElements) gsap.set(cloneElements, { yPercent: 100 })
        }

        return () => {
            if (SplitOriginalRef.current) SplitOriginalRef.current.revert()
            if (SplitCloneRef.current) SplitCloneRef.current.revert()
        }
    }, { scope: WrapperRef, dependencies: [splitBy] })

    const { contextSafe } = useGSAP({ scope: WrapperRef })

    const MouseEnterHandler = contextSafe(() => {
        if (!SplitOriginalRef.current || !SplitCloneRef.current) return
        const origElements = SplitOriginalRef.current[splitBy as 'chars' | 'words' | 'lines']
        const cloneElements = SplitCloneRef.current[splitBy as 'chars' | 'words' | 'lines']
        if (!origElements || !cloneElements) return

        gsap.killTweensOf(origElements)
        gsap.killTweensOf(cloneElements)
        
        gsap.to(origElements, {
            yPercent: -100,
            duration: 0.4,
            stagger: 0.015,
            ease: 'power2.out'
        })
        gsap.to(cloneElements, {
            yPercent: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: 'power2.out'
        })
    })

    const MouseLeaveHandler = contextSafe(() => {
        if (!SplitOriginalRef.current || !SplitCloneRef.current) return
        const origElements = SplitOriginalRef.current[splitBy as 'chars' | 'words' | 'lines']
        const cloneElements = SplitCloneRef.current[splitBy as 'chars' | 'words' | 'lines']
        if (!origElements || !cloneElements) return

        gsap.killTweensOf(origElements)
        gsap.killTweensOf(cloneElements)

        gsap.to(origElements, {
            yPercent: 0,
            duration: 0.4,
            stagger: -0.01,
            ease: 'power2.out'
        })
        gsap.to(cloneElements, {
            yPercent: 100,
            duration: 0.4,
            stagger: -0.01,
            ease: 'power2.out'
        })
    })

    return (
        <div ref={WrapperRef} className='overflow-hidden relative inline-block' onMouseEnter={MouseEnterHandler} onMouseLeave={MouseLeaveHandler}>
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