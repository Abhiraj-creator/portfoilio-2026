'use client'
import Heropage from '@/components/Heropage'
import InfinteCarousal from '@/components/InfinteCarousal'
import React from 'react'

const Page = () => {
  return (
    <main className="min-h-screen bg-[#EAE6DF]">
      <Heropage />
        <InfinteCarousal />
    </main>
  )
}

export default Page