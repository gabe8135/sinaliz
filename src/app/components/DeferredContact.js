"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Contact = dynamic(() => import("./contact"), {
  ssr: false,
});

export default function DeferredContact() {
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
    return <Contact />;
  }

  return (
    <section
      ref={placeholderRef}
      id="contact"
      className="py-20 bg-white"
      aria-label="Carregando seção de contato"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-72 mx-auto mb-6 rounded-lg bg-[#E7EDF1] animate-pulse" />
        <div className="h-6 w-[32rem] max-w-full mx-auto mb-12 rounded-lg bg-[#F1F5F9] animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 rounded-2xl bg-gradient-to-br from-[#12324A] to-[#1F6B7A] opacity-30 animate-pulse" />
          <div className="h-96 rounded-2xl bg-[#F7FAFC] border border-[#E2E8F0] animate-pulse" />
        </div>
      </div>
    </section>
  );
}
