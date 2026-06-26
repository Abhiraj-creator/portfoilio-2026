"use client";

import Heropage from "@/components/Heropage";
import InfinteCarousal from "@/components/InfinteCarousal";
import React, { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    const scrollToProjects = () => {
      if (window.location.hash !== "#projects") return;
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    scrollToProjects();
    window.addEventListener("hashchange", scrollToProjects);

    return () => window.removeEventListener("hashchange", scrollToProjects);
  }, []);

  return (
    <main className="min-h-screen bg-[#EAE6DF]">
      <Heropage />
      <section id="projects" className="scroll-mt-24">
        <InfinteCarousal />
      </section>
    </main>
  );
}

export default Page;
