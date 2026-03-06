"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Footer = dynamic(() => import("./footer"), {
  ssr: false,
});

export default function DeferredFooter() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const enableLoad = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enableLoad, { timeout: 2200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    const timeoutId = window.setTimeout(enableLoad, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldLoad) {
    return (
      <footer className="bg-[#0B1623] text-white" aria-hidden="true">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-400 text-sm text-center">Carregando rodape...</p>
        </div>
      </footer>
    );
  }

  return <Footer />;
}
