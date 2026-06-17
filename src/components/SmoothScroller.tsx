'use client'

import {useLenis} from '../hooks/useLenis'
import {SmoothScrollerProps} from '@/types/lenis.types'
const SmoothScroller = ({children,options}:SmoothScrollerProps) => {

    useLenis()
  return (
    <div className='h-full overflow-hidden'>
        {children}
    </div>
  )
}

export default SmoothScroller