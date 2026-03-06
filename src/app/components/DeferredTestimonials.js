"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Testimonials = dynamic(() => import("./testimonials"), {
  ssr: false,
  loading: () => (
    <section
      id="testimonials"
      className="relative py-20 w-full bg-gradient-to-br from-[#F4F6F8] via-[#E7EDF1] to-white overflow-x-hidden"
      aria-hidden="true"
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="h-10 w-64 mx-auto mb-8 rounded-lg bg-[#D9E3EA] animate-pulse" />
        <div className="h-56 w-full rounded-2xl bg-white/70 border border-[#D3DEE6] shadow-sm animate-pulse" />
      </div>
    </section>
  ),
});

export default function DeferredTestimonials() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const loadTestimonials = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadTestimonials();
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(loadTestimonials, { timeout: 2400 });
      return () => {
        cancelled = true;
        observer.disconnect();
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(loadTestimonials, 1200);
    return () => {
      cancelled = true;
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldLoad) {
    return (
      <section
        ref={placeholderRef}
        id="testimonials"
        className="relative py-20 w-full bg-gradient-to-br from-[#F4F6F8] via-[#E7EDF1] to-white overflow-x-hidden"
        aria-hidden="true"
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="h-10 w-64 mx-auto mb-8 rounded-lg bg-[#D9E3EA] animate-pulse" />
          <div className="h-56 w-full rounded-2xl bg-white/70 border border-[#D3DEE6] shadow-sm animate-pulse" />
        </div>
      </section>
    );
  }

  return <Testimonials />;
}
