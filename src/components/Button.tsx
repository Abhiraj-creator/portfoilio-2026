import React from 'react'
import TextRoll from './TextRoll'
import TextReveal from './TextReveal'

const Button = ({text , onClick , className}: any) => {
  return (
    <TextReveal duration='2.5'> 
    <TextRoll duration='.3'> 
        <button onClick={onClick} className={`  px-4 py-1 border-1 cursor-pointer font-semibold  tracking-wider   ${className}`}>{text}</button>
    </TextRoll>
    </TextReveal>
  )
}

export default Button