"use client";

import { useEffect } from "react";

/**
 * Fires a single lightweight visit-log ping per browser session.
 * Renders nothing. Failures are silent so tracking never affects the UX.
 */
export function VisitTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("v_tracked")) return;
      sessionStorage.setItem("v_tracked", "1");
    } catch {
      /* private mode / storage disabled — still attempt one ping */
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname, ref: document.referrer }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
