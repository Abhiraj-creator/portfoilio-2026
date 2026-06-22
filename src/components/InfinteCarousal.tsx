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
        <div className={` overflow-hidden`} style={{ padding: `${carousalHeight * .4}px 0 24px` }}>
            <div className={`flex items-center w-max`} ref={TrackRef} style={{ gap: `${cardGap}px`, height: `${carousalHeight}px`, flexShrink: 0 }}>
                {Doubled.map((item, index) => {
                    return <CarousalCard key={`${item.id}-${index}`} project={item} onHoverStart={() => { TweenRef.current?.pause() }} onHoverEnd={() => { TweenRef.current?.play() }} />
                })}
            </div>

        </div>
    )
}

export default InfinteCarousal