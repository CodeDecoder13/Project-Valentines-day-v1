"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getCookie, setCookie } from "../hooks/useCookies";

const CORRECT_PIN = "060606";
const PIN_LENGTH = 6;
const UNLOCK_COOKIE = "valentine_unlocked";

export default function PinLock({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (getCookie(UNLOCK_COOKIE) === "true") {
      setUnlocked(true);
    }
    setLoaded(true);
    // Focus first input on mount
    setTimeout(() => inputRefs.current[0]?.focus(), 300);
  }, []);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow digits
      const digit = value.replace(/\D/g, "").slice(-1);

      setError(false);
      const newPin = [...pin];
      newPin[index] = digit;
      setPin(newPin);

      // Move to next input
      if (digit && index < PIN_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if complete
      const fullPin = newPin.join("");
      if (fullPin.length === PIN_LENGTH && !newPin.includes("")) {
        if (fullPin === CORRECT_PIN) {
          setSuccess(true);
          setCookie(UNLOCK_COOKIE, "true", 365);
          setTimeout(() => setUnlocked(true), 800);
        } else {
          setError(true);
          // Shake then clear
          setTimeout(() => {
            setPin(Array(PIN_LENGTH).fill(""));
            inputRefs.current[0]?.focus();
          }, 600);
        }
      }
    },
    [pin]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !pin[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newPin = [...pin];
        newPin[index - 1] = "";
        setPin(newPin);
      }
    },
    [pin]
  );

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, PIN_LENGTH);
    if (pasted.length > 0) {
      const newPin = Array(PIN_LENGTH).fill("");
      for (let i = 0; i < pasted.length; i++) {
        newPin[i] = pasted[i];
      }
      setPin(newPin);
      const focusIndex = Math.min(pasted.length, PIN_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();

      if (pasted.length === PIN_LENGTH) {
        if (pasted === CORRECT_PIN) {
          setSuccess(true);
          setCookie(UNLOCK_COOKIE, "true", 365);
          setTimeout(() => setUnlocked(true), 800);
        } else {
          setError(true);
          setTimeout(() => {
            setPin(Array(PIN_LENGTH).fill(""));
            inputRefs.current[0]?.focus();
          }, 600);
        }
      }
    }
  }, []);

  // Don't flash content while checking cookie
  if (!loaded) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #2a0714 0%, #3b0a1a 50%, #2a0714 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff2d55 0%, transparent 70%)" }}
      />

      <div
        className="relative z-10 flex w-full max-w-sm flex-col items-center text-center"
        style={{ animation: "fade-in-up 0.6s ease-out forwards" }}
      >
        {/* Lock heart */}
        <div
          className="animate-heartbeat mb-6 text-5xl sm:text-6xl"
          style={{
            color: success ? "#f0c27a" : "#ff2d55",
            textShadow: success
              ? "0 0 40px rgba(240, 194, 122, 0.6)"
              : "0 0 30px rgba(255, 45, 85, 0.5)",
            transition: "all 0.3s",
          }}
        >
          {success ? "\u{1F513}" : "\u{1F512}"}
        </div>

        {/* Title */}
        <h1
          className="font-playfair mb-2 text-2xl font-bold sm:text-3xl"
          style={{ color: "#fff0f3" }}
        >
          This is Private
        </h1>
        <p
          className="font-greatvibes mb-8 text-lg sm:text-xl"
          style={{ color: "#f0c27a" }}
        >
          Enter the special date to continue
        </p>

        {/* Hint */}
        <p className="font-lora mb-6 text-xs" style={{ color: "#c9a0ad" }}>
          Hint: A date that means something to us (MM-DD-YY)
        </p>

        {/* PIN inputs */}
        <div
          className={`mb-6 flex gap-2 sm:gap-3 ${error ? "animate-shake" : ""}`}
        >
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <div key={i} className="relative">
              {/* Dash separator after 2nd and 4th digit */}
              {(i === 2 || i === 4) && (
                <span
                  className="absolute -left-2 top-1/2 -translate-y-1/2 font-playfair text-lg sm:-left-2.5"
                  style={{ color: "#ff6b8a" }}
                >
                  -
                </span>
              )}
              <input
                ref={(el) => { inputRefs.current[i] = el; }}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={pin[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className="h-12 w-10 rounded-lg text-center font-playfair text-xl font-bold outline-none transition-all duration-200 focus:scale-110 sm:h-14 sm:w-12 sm:text-2xl"
                style={{
                  background: pin[i]
                    ? "rgba(255, 45, 85, 0.15)"
                    : "rgba(255, 255, 255, 0.05)",
                  border: error
                    ? "2px solid #ff2d55"
                    : pin[i]
                      ? "2px solid rgba(255, 77, 125, 0.5)"
                      : "1px solid rgba(255, 150, 170, 0.2)",
                  color: "#fff0f3",
                  caretColor: "#ff2d55",
                  boxShadow: pin[i] ? "0 0 15px rgba(255, 45, 85, 0.15)" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <p
            className="font-lora mb-4 text-sm"
            style={{ color: "#ff4d7d", animation: "fade-in 0.3s ease-out" }}
          >
            That&apos;s not it... try again &#10084;
          </p>
        )}

        {/* Success message */}
        {success && (
          <p
            className="font-greatvibes mb-4 text-2xl"
            style={{
              color: "#f0c27a",
              textShadow: "0 0 20px rgba(240, 194, 122, 0.4)",
              animation: "fade-in-up 0.4s ease-out",
            }}
          >
            Welcome, my love &#10084;&#65039;
          </p>
        )}
      </div>
    </div>
  );
}
