import { useRef } from "react"
import { cardHeight, cardScale, cardWidth } from '@/libs/constants'
import { Project } from "@/types/CarousalCard.types";
import TextReveal from "./TextReveal"
import { project } from '@/data/project'
import { gsap } from "@/libs/gsap";
import { MouseEnterHandler, CarousalCardProps } from "@/types/CarousalCard.types";
import useViewTransition from "@/hooks/useViewTransition";


const CarousalCard = ({ project, onHoverStart, onHoverEnd }: CarousalCardProps) => {
  const CardRef = useRef(null)
  const ImgRef = useRef(null)
  const NumberRef = useRef<MouseEnterHandler>(null)
  const TitleRef = useRef<MouseEnterHandler>(null)

  const HandleMosueEnter = (): void => {
    onHoverStart()

    const delta = (cardWidth * cardScale) - cardWidth

    gsap.to(CardRef.current, {
      height: cardHeight * cardScale,
      width: cardWidth * cardScale,
      marginLeft: '.7rem',
      duration: .5,
      ease: 'power2.out'
    })

    NumberRef.current?.play()
    TitleRef.current?.play()

    gsap.to(ImgRef.current, {
      scale: 1,
      duration: .5,
      ease: 'power2.out'
    })



  }
  const HandleMosueLeave = (): void => {
    onHoverEnd()

    gsap.to(CardRef.current, {
      height: cardHeight,
      width: cardWidth,
      ease: 'power2.out'
    })

    gsap.to(ImgRef.current, {
      scale: 1.6,
      duration: .5,
      ease: 'power2.out'
    })

    NumberRef.current?.reverse()
    TitleRef.current?.reverse()

  }
  const { navigateTo } = useViewTransition()
  const handleCardClick = (): void => {
    navigateTo(`/project/${project.slug}`)
  }
  return (
    <div ref={CardRef} className={` shrink-0 cursor-pointer relative `} style={{ width: cardWidth, height: cardHeight, overflow: 'visible' }} onMouseEnter={HandleMosueEnter} onMouseLeave={HandleMosueLeave} onClick={handleCardClick}>
      {/* Title div  */}

      <div className="absolute  pointer-events-none flex bottom-[calc(100%+3rem)]  felx-col gap-4 ">
        <TextReveal splitBy="chars" trigger="manual" ref={NumberRef} duration=".25">
          <h3 className="text-[.9rem] text-[#010101] font-bold font-jetbrains">{project.number}</h3>
        </TextReveal>

        <TextReveal splitBy="chars" trigger="manual" ref={TitleRef} duration=".25">
          <h3 className="text-[.9rem] text-[#010101] font-bold font-jetbrains">{project.title}</h3>
        </TextReveal>
      </div>

      {/* Image div  */}
      <div className="absolute overflow-hidden  h-full  w-full ">
        <img src={project.coverImage} alt={project.title} ref={ImgRef} className="object-cover h-full w-full scale-[1.6]" style={{ transformOrigin: 'center center ', userSelect: 'none' }} />
      </div>
    </div>
  )
}

export default CarousalCard

