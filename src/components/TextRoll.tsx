import { gsap, SplitText, useGSAP } from '@/libs/gsap'
import React, { useRef } from 'react'
import { TextRollProps } from '@/types/TextRoll.types'

const TextRoll = ({
    children,
    splitBy = 'chars'
}: TextRollProps) => {
    const WrapperRef = useRef<HTMLDivElement>(null)
    const SplitRef = useRef<SplitText | null>(null)

    useGSAP(() => {
        if (!WrapperRef.current) return

        SplitRef.current = new SplitText(WrapperRef.current, {
            type: splitBy,
            lineThreshold: 0.3
        })

        return () => {
            if (SplitRef.current) {
                SplitRef.current.revert()
            }
        }
    }, { scope: WrapperRef, dependencies: [splitBy] })

    const { contextSafe } = useGSAP({ scope: WrapperRef })

    const MouseEnterHandler = contextSafe(() => {
        if (!SplitRef.current) return
        const elements = SplitRef.current[splitBy as 'chars' | 'words' | 'lines']
        if (!elements) return

        gsap.killTweensOf(elements)
        gsap.set(elements, { y: '110%', opacity: 0 })
        gsap.to(elements, {
            y: '0%',
            opacity: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power3.out'
        })
    })

    const MouseLeaveHandler = contextSafe(() => {
        if (!SplitRef.current) return
        const elements = SplitRef.current[splitBy as 'chars' | 'words' | 'lines']
        if (!elements) return

        gsap.killTweensOf(elements)
        gsap.to(elements, {
            y: '0%',
            opacity: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power3.out'
        })
    })

    return (
        <div ref={WrapperRef} className='overflow-hidden' onMouseEnter={MouseEnterHandler} onMouseLeave={MouseLeaveHandler}>
            {children}
        </div>
    )
}

export default TextRoll