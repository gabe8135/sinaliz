"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const About = dynamic(() => import("./about"), {
  ssr: false,
});

export default function DeferredAbout() {
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
      { rootMargin: "350px 0px" }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  if (shouldLoad) {
    return <About />;
  }

  return (
    <section
      ref={placeholderRef}
      id="about"
      className="py-20 bg-white"
      aria-label="Carregando seção sobre"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-56 mx-auto mb-6 rounded-lg bg-[#E7EDF1] animate-pulse" />
        <div className="h-6 w-96 max-w-full mx-auto mb-12 rounded-lg bg-[#F1F5F9] animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-72 rounded-3xl bg-[#F7FAFC] border border-[#E2E8F0] animate-pulse" />
          <div className="h-72 rounded-3xl bg-[#F7FAFC] border border-[#E2E8F0] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
