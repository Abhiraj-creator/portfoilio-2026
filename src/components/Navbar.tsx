'use client'

import React, { useState, useEffect } from "react"
import TextReveal from "./TextReveal"
import TextRoll from "./TextRoll"
import Button from "./Button"
import { RiMenu5Line } from "@remixicon/react"
import TransitionLink from "./TransitionLink"

const Navbar = () => {
    const [time, setTime] = useState("")
    const [showTooltip, setShowTooltip] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const timeStr = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: false 
            })
            const tz = now.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ').pop() || ''
            setTime(`${timeStr} ${tz}`)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div className="h-16 w-full flex items-center justify-between px-6 py-10 uppercase font-bebas cursor-pointer top-0 fixed left-0 z-[30] tracking-wide bg-[#EAE6DF]/70 backdrop-blur-md border-b border-[#1C1B1A]/8">
                <div className="left flex items-center gap-2 relative">
                    <TextRoll>
                        <TextReveal splitBy="words" trigger="mount" stagger=".1">
                            <TransitionLink href="/" className="text-[1.2rem] md:text-[1.5rem] font-black tracking-wider text-[#1C1B1A] hover:opacity-80 transition-opacity">
                                Abhiraj singh bhati
                            </TransitionLink>
                        </TextReveal>
                    </TextRoll>
                    
                    {/* Interactive 2026 Badge with Time Tooltip */}
                    <div 
                        className="relative flex items-center ml-1"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <span className="text-[#A84B2B] font-bold text-xs md:text-sm select-none transition-transform duration-200 hover:scale-105">
                            2026
                        </span>
                        
                        {/* Animated Tooltip Popup */}
                        <div 
                            className={`absolute top-full left-1/2 -translate-x-1/2 mt-2.5 py-1.5 px-3 bg-[#1C1B1A] text-[#F4F1EB] border border-white/10 text-[9px] font-mono tracking-widest rounded shadow-xl whitespace-nowrap normal-case transition-all duration-200 ease-out origin-top z-50 ${
                                showTooltip 
                                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                                    : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                            }`}
                        >
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[5px] border-b-[#1C1B1A]" />
                            <span className="flex items-center gap-1.5">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A84B2B] animate-pulse" />
                                {time || "FETCHING..."}
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Center Action Button (Hidden on very small mobile screens) */}
                <div className="hidden sm:block">
                    <Button text=" Resume"/>
                </div>
                
                {/* Desktop Link Navigation */}
                <div className="hidden md:flex items-center gap-7 text-[1rem] font-light tracking-widest text-[#1C1B1A]">
                    <TextRoll>
                        <TextReveal delay=".2" stagger=".1">
                            <TransitionLink href="/" className="hover:text-[#A84B2B] transition-colors">home</TransitionLink>
                        </TextReveal>
                    </TextRoll>
                    <TextRoll>
                        <TextReveal delay=".4" stagger=".1">
                            <TransitionLink href="/#projects" className="hover:text-[#A84B2B] transition-colors">project</TransitionLink>
                        </TextReveal>
                    </TextRoll>
                    <TextRoll>
                        <TextReveal delay=".6" stagger=".1">
                            <TransitionLink href="/contact" className="hover:text-[#A84B2B] transition-colors">contact</TransitionLink>
                        </TextReveal>
                    </TextRoll>
                </div>

                {/* Mobile Menu Action Toggle */}
                <button 
                    onClick={() => setMenuOpen(true)}
                    className="block md:hidden text-[1.5rem] font-black tracking-widest text-[#1C1B1A] hover:text-[#A84B2B] transition-colors focus:outline-none py-1 px-2 "
                >
                    <RiMenu5Line/>
                </button>
            </div>

            {/* Mobile Menu Overlay Drawer */}
            <div 
                className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#EAE6DF]/98 backdrop-blur-xl px-6 py-12 transition-all duration-500 ease-in-out md:hidden ${
                    menuOpen ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-full'
                }`}
            >
                {/* Drawer Top Header */}
                <div className="flex items-center justify-between border-b border-[#1C1B1A]/10 pb-4">
                    <span className="text-[1.2rem] font-black font-bebas text-[#1C1B1A] tracking-wider">
                        ABHIRAJ S. BHATI
                    </span>
                    <button 
                        onClick={() => setMenuOpen(false)}
                        className="text-[1rem] font-black tracking-widest text-[#A84B2B] hover:text-[#1C1B1A] transition-colors focus:outline-none font-bebas py-1 px-3 border border-[#A84B2B]/20 rounded"
                    >
                        CLOSE
                    </button>
                </div>

                {/* Vertical Navigation Link Stack */}
                <div className="flex flex-col gap-6 my-auto font-bebas text-5xl tracking-wide">
                    <TransitionLink 
                        href="/" 
                        onClick={() => setMenuOpen(false)}
                        className="text-[#1C1B1A] hover:text-[#A84B2B] transition-all duration-200 hover:translate-x-2 text-left"
                    >
                        Home
                    </TransitionLink>
                    <TransitionLink 
                        href="/#projects" 
                        onClick={() => setMenuOpen(false)}
                        className="text-[#1C1B1A] hover:text-[#A84B2B] transition-all duration-200 hover:translate-x-2 text-left"
                    >
                        Projects
                    </TransitionLink>
                    <TransitionLink 
                        href="/contact" 
                        onClick={() => setMenuOpen(false)}
                        className="text-[#1C1B1A] hover:text-[#A84B2B] transition-all duration-200 hover:translate-x-2 text-left"
                    >
                        Contact
                    </TransitionLink>
                </div>

                {/* Drawer Bottom Actions & Meta */}
                <div className="flex flex-col gap-6">
                    <div className="w-full" onClick={() => setMenuOpen(false)}>
                        <Button text="Resume" />
                    </div>
                    
                    <div className="flex justify-between items-center font-mono text-[9px] tracking-widest text-[#827C75] border-t border-[#1C1B1A]/10 pt-4">
                        <span>BASED IN INDIA</span>
                        <span>{time || "00:00:00 UTC"}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
