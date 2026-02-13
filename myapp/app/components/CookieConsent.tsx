"use client";

import { useState, useEffect } from "react";
import { getCookie, setCookie } from "../hooks/useCookies";

const CONSENT_COOKIE = "valentine_consent";

export function hasConsent(): boolean {
  if (typeof document === "undefined") return false;
  return getCookie(CONSENT_COOKIE) === "accepted";
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't made a choice yet
    const consent = getCookie(CONSENT_COOKIE);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie(CONSENT_COOKIE, "accepted", 365);
    setVisible(false);
  };

  const handleDecline = () => {
    setCookie(CONSENT_COOKIE, "declined", 365);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26, 5, 12, 0.85)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="glass w-full max-w-lg p-6 sm:p-8"
        style={{
          animation: "fade-in-up 0.5s ease-out forwards",
          background: "linear-gradient(135deg, rgba(92, 26, 46, 0.95), rgba(59, 10, 26, 0.95))",
          border: "1px solid rgba(255, 150, 170, 0.2)",
        }}
      >
        {/* Heart icon */}
        <div className="mb-4 text-center text-3xl">&#10084;&#65039;</div>

        {/* Title */}
        <h2
          className="font-playfair mb-4 text-center text-xl font-bold sm:text-2xl"
          style={{ color: "#fff0f3" }}
        >
          Before We Begin...
        </h2>

        {/* Description */}
        <div className="font-lora mb-6 space-y-3 text-sm leading-relaxed" style={{ color: "#e8b4c8" }}>
          <p>
            This website uses cookies and collects minimal data to make your
            experience special. Here&apos;s what we do:
          </p>

          <ul className="list-inside list-disc space-y-2 pl-2">
            <li>
              <strong style={{ color: "#fff0f3" }}>Cookie storage:</strong>{" "}
              We save your consent preference and Valentine response so you
              don&apos;t see repeated prompts.
            </li>
            <li>
              <strong style={{ color: "#fff0f3" }}>Email notification:</strong>{" "}
              When you click &quot;Yes&quot; on the Valentine question, a
              one-time notification is sent to let someone special know.
            </li>
            <li>
              <strong style={{ color: "#fff0f3" }}>No tracking:</strong>{" "}
              We don&apos;t use analytics, third-party trackers, or collect
              any personal information.
            </li>
          </ul>

          <p className="text-xs" style={{ color: "#c9a0ad" }}>
            By accepting, you agree to the use of cookies and the one-time
            email notification described above. You can clear cookies in your
            browser settings at any time to reset your preferences.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleAccept}
            className="cursor-pointer rounded-full px-8 py-3 font-playfair text-sm font-bold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#ff2d55",
              color: "#fff0f3",
              boxShadow: "0 0 20px rgba(255, 45, 85, 0.3)",
            }}
          >
            Accept &amp; Continue &#10084;
          </button>
          <button
            onClick={handleDecline}
            className="cursor-pointer rounded-full border px-8 py-3 font-playfair text-sm transition-all duration-300 hover:scale-105"
            style={{
              borderColor: "rgba(255, 107, 138, 0.3)",
              color: "#e8b4c8",
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
