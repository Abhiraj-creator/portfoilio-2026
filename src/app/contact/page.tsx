"use client";

import { useMemo, useLayoutEffect } from "react";
import gsap from "gsap";
import { consumePageTransitionEnterDelay } from "@/libs/pageTransition";
import Button from "@/components/Button";
import TextRoll from "@/components/TextRoll";

export default function Contact() {
  const enterDelay = useMemo(() => consumePageTransitionEnterDelay(100), []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-fade", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        delay: enterDelay,
      });
    });

    return () => ctx.revert();
  }, [enterDelay]);
  
const username='ankur'
console.log(username)

  return (
    <main className="min-h-[100svh] overflow-hidden bg-[#EAE6DF] text-[#3C3D3C] px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 lg:pt-28 pb-4 sm:pb-6">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-7xl flex-col justify-between gap-5 sm:gap-6">
        <div className="space-y-6 sm:space-y-8">
          <h1 className="contact-fade font-anton uppercase text-[clamp(2.75rem,10vw,6.5rem)] leading-[0.85] tracking-tight max-w-[10ch] md:max-w-none">
            Get in touch
          </h1>

          <div className="contact-fade grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 font-jetbrains text-sm leading-relaxed">
            <div className="flex flex-col items-start gap-4 sm:gap-5">
              <p className="opacity-70 max-w-[34ch] md:max-w-none text-[0.95rem] sm:text-[1rem]">
                Got an idea that&apos;s waiting to come alive? Let&apos;s build it together. Whether you&apos;re a designer, developer, or a creative studio, I&apos;d love to collaborate and turn your thoughts into something real.
              </p>
         
            <TextRoll>
             <a href="#" className=" px-4 py-1 border-1 cursor-pointer font-semibold  tracking-wider">  Let&apos;s Collaborate</a>
            </TextRoll>
          
            </div>

            <div className="flex flex-col items-start gap-4 sm:gap-5">
              <p className="opacity-70 max-w-[34ch] md:max-w-none text-[0.95rem] sm:text-[1rem]">
                If you&apos;re a digital agency or company looking for a designer, developer who cares about details, motion, and meaningful design. I&apos;m always open to exciting opportunities.
              </p>
                <TextRoll>
             <a href="#" className=" px-4 py-1 border-1 cursor-pointer font-semibold  tracking-wider"> Hire Me</a>
            </TextRoll>
            </div>

            <div className="flex flex-col items-start gap-4 sm:gap-5">
              <p className="opacity-70 max-w-[34ch] md:max-w-none text-[0.95rem] sm:text-[1rem]">
                You can reach me through any of my socials below or drop me a message. I&apos;d be happy to connect, collaborate, or just chat about new ideas.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href="#" className="relative group inline-flex overflow-hidden transition-colors hover:text-[#A84B2B] text-[1.05rem] sm:text-lg font-anton uppercase tracking-widest">
                  <span className="transition-transform duration-500 group-hover:-translate-y-full">LinkedIn</span>
                  <span className="absolute top-full transition-transform duration-500 group-hover:-translate-y-full">LinkedIn</span>
                </a>
                <a href="#" className="relative group inline-flex overflow-hidden transition-colors hover:text-[#A84B2B] text-[1.05rem] sm:text-lg font-anton uppercase tracking-widest">
                  <span className="transition-transform duration-500 group-hover:-translate-y-full">GitHub</span>
                  <span className="absolute top-full transition-transform duration-500 group-hover:-translate-y-full">GitHub</span>
                </a>
                <a href="#" className="relative group inline-flex overflow-hidden transition-colors hover:text-[#A84B2B] text-[1.05rem] sm:text-lg font-anton uppercase tracking-widest">
                  <span className="transition-transform duration-500 group-hover:-translate-y-full">Twitter / X</span>
                  <span className="absolute top-full transition-transform duration-500 group-hover:-translate-y-full">Twitter / X</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-fade w-full shrink-0 flex flex-col items-center gap-2 sm:gap-3 pb-1">
          <h2
            style={{
              color: "transparent",
              WebkitTextStroke: "2px #9D9A92",
            }}
            className="font-anton text-[clamp(2.4rem,11vw,5.8rem)] leading-[0.85] text-center tracking-tight break-words md:whitespace-nowrap selection:text-[#3C3D3C]"
          >
            ABHIRAJ SINGH BHATI
          </h2>

          <div className="max-w-full bg-[#3C3D3C] text-[#EAE6DF] px-4 py-2 sm:px-5 sm:py-3 font-jetbrains text-[9px] sm:text-xs tracking-wider whitespace-normal sm:whitespace-nowrap shadow-xl text-center leading-snug">
            Thank you for visiting my portfolio. This website was made with love by Abhiraj.
          </div>
        </div>
      </div>
    </main>
  );
}
