import { project } from '@/data/project'
import { carousalHeight, cardGap, cardHeight, cardWidth } from '@/libs/constants'
import React, { useEffect, useRef } from 'react'
import CarousalCard from './CarousalCard'
import { TweenRefHandler } from '@/types/CarousalCard.types'
import { gsap } from '@/libs/gsap'

const InfinteCarousal = () => {

    const TrackRef = useRef(null)
    const TweenRef = useRef<TweenRefHandler>(null)

    useEffect(() => {
        const SingleRound = project.length * (cardWidth + cardGap)

        TweenRef.current = gsap.to(TrackRef.current, {
            x: -SingleRound,
            repeat: -1,
            ease: 'none',
            duration: 15,
        })

        return () => {
            TweenRef.current?.kill()
        }
    }, [project])

    const Doubled = [...project, ...project]

    return (
        <div className="overflow-hidden" style={{ padding: `${carousalHeight * .4}px 0 24px` }}>
            <div className="mb-14 flex items-center justify-center px-2 md:px-0">
                <h2 className="font-bebas text-[clamp(2.5rem,7vw,5.75rem)] uppercase leading-none tracking-[0.12em] text-[#1C1B1A]">
                    Projects
                </h2>
            </div>
            <div className="flex w-max items-center" ref={TrackRef} style={{ gap: `${cardGap}px`, height: `${carousalHeight}px`, flexShrink: 0 }}>
                {Doubled.map((item, index) => {
                    return <CarousalCard key={`${item.id}-${index}`} project={item} onHoverStart={() => { TweenRef.current?.pause() }} onHoverEnd={() => { TweenRef.current?.play() }} />
                })}
            </div>

        </div>
    )
}

export default InfinteCarousal
