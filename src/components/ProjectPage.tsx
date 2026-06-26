"use client";

import { useRef } from "react";
import TextReveal from "./TextReveal";
import { gsap, useGSAP } from "@/libs/gsap";
import useViewTransition from "@/hooks/useViewTransition";
import type { Project } from "@/types/CarousalCard.types";

type ProjectPageProps = {
  project: Project;
  nextProject: Project;
};

const ProjectPage = ({ project, nextProject }: ProjectPageProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { navigateTo } = useViewTransition();

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current) return;

      gsap.to(imageRef.current, {
        clipPath: "inset(0 0 0% 0)",
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        delay: 0.5,
      });

      const gallerySections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>("[data-gallery-section]"),
      );

      gallerySections.forEach((section) => {
        const frame = section.querySelector<HTMLElement>("[data-gallery-frame]");
        if (!frame) return;

        gsap.fromTo(
          frame,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: containerRef, dependencies: [project] },
  );

  const handleNextClick = () => {
    navigateTo(`/project/${nextProject.slug}`);
  };

  return (
    <main ref={containerRef} className="bg-[#EAE6DF] text-[#1C1B1A]">
      <section className="min-h-[100svh] w-full">
        <div className="flex min-h-[100svh] w-full flex-col gap-8 px-6 pt-28 pb-12 md:px-10 lg:flex-row lg:items-end lg:gap-12 lg:pt-32 lg:pb-16">
          <div className="flex w-full items-start lg:w-[10%] lg:pt-2">
            <TextReveal>
              <h3 className="text-2xl font-bebas md:text-[2.25rem]">{project.number}</h3>
            </TextReveal>
          </div>

          <div className="h-[32rem] w-full overflow-hidden lg:h-[78vh] lg:w-[32%]">
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

          <div className="flex w-full flex-col justify-end gap-5 lg:w-[58%] lg:pl-8">
            <div className="heading">
              <TextReveal delay="0.8" ease="power4.out" splitBy="chars">
                <h1 className="max-w-[12ch] text-[clamp(3rem,7vw,6rem)] leading-[0.95]">
                  {project.title}
                </h1>
              </TextReveal>
            </div>

            <div className="subHeading flex flex-wrap gap-x-8 gap-y-3">
              <TextReveal delay="0.85" splitBy="words">
                <h2 className="text-[clamp(1.4rem,3vw,2.25rem)] leading-none">{project.subtitle}</h2>
              </TextReveal>
              <TextReveal delay="0.85" splitBy="chars">
                <h2 className="text-[clamp(1.4rem,3vw,2.25rem)] leading-none">{project.year}</h2>
              </TextReveal>
            </div>

            <div className="description mt-2 max-w-3xl text-balance">
              <TextReveal delay="0.85" splitBy="lines">
                <p className="text-[1.05rem] leading-[1.45] md:text-[1.2rem]">
                  {project.description}
                </p>
              </TextReveal>
            </div>
          </div>
        </div>
      </section>

      {project.gallery.map((image, idx) => (
        <section
          key={image}
          data-gallery-section
          className="min-h-[100svh] w-full"
        >
          <div
            data-gallery-frame
            className="h-[100svh] w-full overflow-hidden"
          >
            <img
              className="h-full w-full object-cover"
              src={image}
              alt={`${project.title} gallery ${idx + 1}`}
            />
          </div>
        </section>
      ))}

      <footer className="flex min-h-[70svh] w-full flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <h2 className="font-bebas text-sm uppercase tracking-[0.35em] text-[#827C75]">
          Next Project
        </h2>
        <button
          type="button"
          onClick={handleNextClick}
          className="font-anton text-[clamp(2.5rem,7vw,5rem)] uppercase leading-none tracking-tight transition-colors hover:text-[#A84B2B]"
        >
          {nextProject.title}
        </button>
      </footer>
    </main>
  );
};

export default ProjectPage;
