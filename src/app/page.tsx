'use client'
import InfinteCarousal from '@/components/InfinteCarousal'
import TextReveal from '@/components/TextReveal'
import { TextRevealHandler } from '@/types/TextReveal.types'
import React,{ useRef } from 'react'

const Page = () => {
  return (
   <>
    <div className='h-screen w-screen   text-5xl flex items-center justify-center '>
       <InfinteCarousal />
    </div>
   </>
  )
}

export default Page