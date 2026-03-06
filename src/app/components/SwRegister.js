"use client";
import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    let idleId = null;
    let timeoutId = null;

    const registerServiceWorker = () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      }
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(registerServiceWorker, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(registerServiceWorker, 1000);
    }

    // Optional: capture event to allow custom install CTA elsewhere in the app
    function beforeInstallPromptHandler(e) {
      e.preventDefault();
      // window.deferredPwaPrompt = e; // optional: expose globally if needed
    }

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

    return () => {
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      window.removeEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    };
  }, []);

  return null;
}
