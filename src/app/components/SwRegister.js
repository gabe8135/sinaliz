"use client";
import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Optional: capture event to allow custom install CTA elsewhere in the app
    function beforeInstallPromptHandler(e) {
      e.preventDefault();
      // window.deferredPwaPrompt = e; // optional: expose globally if needed
    }

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    };
  }, []);

  return null;
}
