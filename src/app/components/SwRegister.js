"use client";
import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const clearLegacyCaches = async () => {
      if (!("caches" in window)) return;
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key.startsWith("webfolio-")).map((key) => caches.delete(key))
      );
    };

    // Em desenvolvimento, desativa SW para evitar cache preso durante mudanças locais.
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) =>
          Promise.all(
            registrations
              .filter((registration) =>
                [registration.active, registration.waiting, registration.installing].some(
                  (worker) => worker && new URL(worker.scriptURL).pathname === "/sw.js"
                )
              )
              .map((registration) => registration.unregister())
          )
        )
        .catch(() => {});
      clearLegacyCaches().catch(() => {});
      return;
    }

    let idleId = null;
    let timeoutId = null;
    // Atualiza o worker em segundo plano, sem interromper animações ou formulários.

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          updateViaCache: "none",
        });

        await registration.update();

        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;

          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              worker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      } catch {
        // Registro opcional; falhas não devem quebrar o app.
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
