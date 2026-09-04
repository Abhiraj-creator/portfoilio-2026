"use client";

import { useRef } from "react";
import TextReveal from "./TextReveal";
import TextRoll from "./TextRoll";
import { gsap, ScrollTrigger, useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";
import type { Project } from "@/types/CarousalCard.types";
import Button from "./Button";

type ProjectPageProps = {
  project: Project;
  nextProject: Project;
};

const ProjectPage = ({ project, nextProject }: ProjectPageProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current) return;

      // Hero image clip-path reveal
      gsap.to(imageRef.current, {
        clipPath: "inset(0 0 0% 0)",
        scale: 1,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.7,
      });

      // Rotation-based scroll entrance + pinning per gallery section
      const sections = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-section]",
      );

      sections.forEach((section, idx) => {
        const frame = section.querySelector<HTMLElement>(
          "[data-scroll-frame]",
        );
        if (!frame) return;

        // Un-rotate on scroll
        gsap.to(frame, {
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        });

        // Pin all sections except the last
        if (idx === sections.length - 1) return;

        ScrollTrigger.create({
          trigger: section,
          start: "bottom bottom",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
      });
    },
    { scope: containerRef, dependencies: [project] },
  );

  const { navigateTo } = useViewTransition();

  const handleNextClick = () => {
    navigateTo(`/project/${nextProject.slug}`);
  };

  return (
    <main ref={containerRef} className="bg-[#EAE6DF] text-[#1C1B1A]">
      {/* ── Hero section ─────────────────────────────────────────── */}
      <section className="h-screen w-full">
        <div className="sectionContainer flex h-full w-full px-[3rem] pt-[7rem] pb-[4rem]">
          {/* Number */}
          <div className="firstSegment h-full w-[10%]">
            <TextReveal>
              <h3 className="text-[2rem] font-bebas">{project.number}</h3>
            </TextReveal>
          </div>

          {/* Cover image */}
          <div className="secondSegment h-[85%] w-[30%]">
            <div className="imageDiv h-full w-full overflow-hidden">
              <img
                ref={imageRef}
                style={{ clipPath: "inset(0 0 100% 0)" }}
                className="h-full w-full scale-[1.7] object-cover"
                src={project.coverImage}
                alt={project.title}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="thirdSegment flex h-[85%] w-[60%] flex-col justify-end pl-[8rem]">
            <div className="heading">
              <TextReveal delay="0.8" ease="power4.out" splitBy="chars">
                <h1 className="text-[5rem] leading-[1.1]">{project.title}</h1>
              </TextReveal>
            </div>

            <div className="subHeading flex gap-[3rem]">
              <TextReveal delay="0.85" splitBy="words">
                <h2 className="text-[2rem]">{project.subtitle}</h2>
              </TextReveal>
              <TextReveal delay="0.85" splitBy="chars">
                <h2 className="text-[2rem]">{project.year}</h2>
              </TextReveal>
            </div>

            <div className="description mt-[2rem] w-[70%] text-balance">
              <TextReveal delay="0.85" splitBy="lines">
                <p className="text-[1.5rem] leading-[1.2]">
                  {project.description}
                </p>
              </TextReveal>
            </div>

            {/* ── Live link button ──────────────────────────────── */}
            {project.liveUrl && (
              <div className="mt-[2rem]">
                <a href={project.liveUrl}>
                  <Button text='View live' />
                </a>

              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery sections (pinned + rotation reveal) ─────────── */}
      {project.gallery.map((image, idx) => (
        <section
          key={image}
          data-scroll-section
          className="h-screen w-full"
        >
          <div
            data-scroll-frame
            style={{ transformOrigin: "bottom left" }}
            className="h-full w-full rotate-[30deg]"
          >
            <img
              className="h-full w-full object-cover"
              src={image}
              alt={`${project.title} gallery ${idx + 1}`}
            />
          </div>
        </section>
      ))}

      {/* ── Footer / Next project ────────────────────────────────── */}
      <footer className="flex min-h-[70svh] w-full flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <h2 className="font-bebas text-sm uppercase tracking-[0.35em] text-[#827C75]">
          Next Project
        </h2>

        {/*
          Pure-CSS roll effect — keeps the <button> element fully intact so
          onClick fires reliably. SplitText inside <TextRoll> would replace the
          button's text node with split <div>s, silently breaking the click target.
        */}
        <button
          type="button"
          onClick={handleNextClick}
          className="group relative overflow-hidden font-anton text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none tracking-tight"
          aria-label={`Go to next project: ${nextProject.title}`}
        >
          {/* visible row */}
          <span
            className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
          >
            {nextProject.title}
          </span>
          {/* clone that slides up from below */}
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center translate-y-full text-[#A84B2B] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
          >
            {nextProject.title}
          </span>
        </button>
      </footer>
    </main>
  );
};

export default ProjectPage;
