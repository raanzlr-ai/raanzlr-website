import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
    __turnstileLoader?: Promise<void>;
  }
}

// Cloudflare's public test sitekey (always passes) is used until a real key
// is provided via VITE_TURNSTILE_SITE_KEY. The matching test secret is the
// fallback on the submit-form edge function.
export const TURNSTILE_SITE_KEY = (
  (import.meta.env.VITE_TURNSTILE_SITE_KEY as string) || "1x00000000000000000000AA"
).trim();

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!window.__turnstileLoader) {
    window.__turnstileLoader = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Failed to load Turnstile script"));
      document.head.appendChild(s);
    });
  }
  return window.__turnstileLoader;
}

interface TurnstileProps {
  /** Receives the token when solved, or null when it expires/errors. */
  onToken: (token: string | null) => void;
  isAr?: boolean;
  /** Bump this number to force the widget to reset (e.g. after submit). */
  resetSignal?: number;
}

export default function Turnstile({ onToken, isAr, resetSignal }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    let cancelled = false;
    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "auto",
          language: isAr ? "ar" : "en",
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        });
      })
      .catch(err => console.error("[Turnstile]", err));
    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch { /* already gone */ }
        widgetIdRef.current = null;
      }
    };
  }, [isAr]);

  useEffect(() => {
    if (resetSignal && widgetIdRef.current && window.turnstile) {
      try { window.turnstile.reset(widgetIdRef.current); } catch { /* ignore */ }
      onTokenRef.current(null);
    }
  }, [resetSignal]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}
