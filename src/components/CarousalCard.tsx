import { useRef } from "react"
import { cardHeight, cardScale, cardWidth } from '@/libs/constants'
import { Project } from "@/types/CarousalCard.types";
import TextReveal from "./TextReveal"
import { project } from '@/data/project'
import { gsap } from "@/libs/gsap";
import { MouseEnterHandler, CarousalCardProps } from "@/types/CarousalCard.types";


const CarousalCard = ({ project, onHoverStart, onHoverEnd }: CarousalCardProps) => {
  const CardRef = useRef(null)
  const ImgRef = useRef(null)
  const NumberRef = useRef<MouseEnterHandler>(null)
  const TitleRef = useRef<MouseEnterHandler>(null)

  const HandleMosueEnter = (): void => {
    onHoverStart()

    gsap.to(CardRef.current, {
      height: cardHeight * cardScale,
      width: cardWidth * cardScale,
      duration: .8,
      ease: 'power2.out'
    })

    NumberRef.current?.play()
    TitleRef.current?.play()

  }
  const HandleMosueLeave = (): void => {
    onHoverEnd()

    gsap.to(CardRef.current, {
      height: cardHeight,
      width: cardWidth,
      duration: .2,
      ease: 'power2.out'
    })

    NumberRef.current?.reverse()
    TitleRef.current?.reverse()

  }
  return (
    <div ref={CardRef} className={` shrink-0 cursor-pointer relative `} style={{ width: cardWidth, height: cardHeight }} onMouseEnter={HandleMosueEnter} onMouseLeave={HandleMosueLeave}>
      {/* Title div  */}

      <div className="absolute  pointer-events-none flex bottom-[calc(100%+3rem)]  felx-col gap-4 ">
        <TextReveal splitBy="chars" trigger="manual" ref={NumberRef}>
          <h3 className="text-[1rem] text-[#010101] font-bold">{project.number}</h3>
        </TextReveal>

        <TextReveal splitBy="chars" trigger="manual" ref={TitleRef}>
          <h3 className="text-[1rem] text-[#010101] font-bold">{project.title}</h3>
        </TextReveal>
      </div>

      {/* Image div  */}
      <div className="absolute overflow-hidden flex h-full  w-full " ref={ImgRef}>
        <img src={project.coverImage} alt={project.title} className="object-cover h-full w-full " style={{ transformOrigin: 'center center ', userSelect: 'none' }} />
      </div>
    </div>
  )
}

export default CarousalCard

