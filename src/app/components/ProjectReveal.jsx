"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ProjectReveal({ children, index }) {
  const frameRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 1101px)",
        tablet: "(min-width: 768px) and (max-width: 1100px)",
        mobile: "(max-width: 767px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        if (conditions.reduced) return;
        const columns = conditions.desktop ? 3 : conditions.tablet ? 2 : 1;
        const delay = (index % columns) * 0.12;
        let entered = false;
        const reset = () => {
          gsap.killTweensOf(content);
          gsap.set(content, { opacity: 0, y: 24 });
          entered = false;
        };
        const reveal = (immediate = false) => {
          entered = true;
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: immediate ? 0 : 0.7,
            delay: immediate ? 0 : delay,
            ease: "power3.out",
            overwrite: true,
          });
        };
        reset();
        // Observe the stationary frame so the animation cannot retrigger itself.
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (content.contains(document.activeElement)) return;
            if (!entry.isIntersecting) reset();
            else if (!entered && entry.intersectionRatio >= 0.08) reveal();
          },
          { threshold: [0, 0.08] }
        );
        const onFocus = () => reveal(true);
        frame.addEventListener("focusin", onFocus);
        observer.observe(frame);
        return () => {
          observer.disconnect();
          frame.removeEventListener("focusin", onFocus);
          gsap.killTweensOf(content);
        };
      }
    );
    return () => media.revert();
  }, [index]);

  return (
    <div ref={frameRef} className="project-reveal">
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
