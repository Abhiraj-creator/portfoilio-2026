'use client'
import TextReveal from '@/components/TextReveal'
import { TextRevealHandler } from '@/types/TextReveal.types'
import React,{ useRef } from 'react'

const Page = () => {
  return (
   <>
    <div className='h-[200vh]  bg-black text-5xl text-white'>
       <TextReveal splitBy='chars' stagger='.25' trigger='manual'>
      <p>Hello, world!</p>
    </TextReveal>
    </div>
   </>
  )
}

export default Page