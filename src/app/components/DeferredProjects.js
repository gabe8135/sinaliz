"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Projects = dynamic(() => import("./projects"), {
  ssr: false,
});

export default function DeferredProjects() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const enableLoad = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          enableLoad();
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    let idleId = null;
    let timeoutId = null;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enableLoad, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(enableLoad, 1000);
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (shouldLoad) {
    return <Projects />;
  }

  return (
    <section
      ref={placeholderRef}
      id="projects"
      className="py-20 bg-gradient-to-br from-[#F4F6F8] via-[#E7EDF1] to-white"
      aria-label="Carregando seção de projetos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-52 mx-auto mb-6 rounded-lg bg-[#D9E3EA] animate-pulse" />
        <div className="h-6 w-80 max-w-full mx-auto mb-12 rounded-lg bg-[#E7EDF1] animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-80 rounded-3xl bg-white/75 border border-[#D3DEE6] animate-pulse" />
          <div className="h-80 rounded-3xl bg-white/75 border border-[#D3DEE6] animate-pulse" />
          <div className="h-80 rounded-3xl bg-white/75 border border-[#D3DEE6] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
