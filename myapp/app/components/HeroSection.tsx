"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface Sparkle {
  id: number;
  size: number;
  angle: number;
  distance: number;
  color: string;
  delay: number;
}

const sparkleColors = ["#ff2d55", "#ff4d7d", "#ff6b8a", "#f0c27a", "#ff85a1", "#fff0f3"];

let sparkleId = 0;

export default function HeroSection() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isShining, setIsShining] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnBurst = useCallback(() => {
    const batch: Sparkle[] = Array.from({ length: 5 }, (_, i) => ({
      id: sparkleId++,
      size: 8 + Math.random() * 14,
      angle: Math.random() * 360,
      distance: 35 + Math.random() * 65,
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      delay: i * 20,
    }));

    setSparkles((prev) => [...prev, ...batch]);

    // Remove this batch after animation completes
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !batch.includes(s)));
    }, 1000);
  }, []);

  const startSparkles = useCallback(() => {
    setIsShining(true);
    spawnBurst(); // Immediate first burst
    intervalRef.current = setInterval(spawnBurst, 250);
  }, [spawnBurst]);

  const stopSparkles = useCallback(() => {
    setIsShining(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      {/* Radial glow background */}
      <div className="hero-glow absolute inset-0" />

      {/* Extra ambient glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff2d55 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff4d7d 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Interactive heartbeat icon */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={startSparkles}
          onMouseLeave={stopSparkles}
          onTouchStart={(e) => {
            e.preventDefault();
            startSparkles();
          }}
          onTouchEnd={stopSparkles}
        >
          {/* Main heart */}
          <span
            className="animate-heartbeat inline-block text-5xl sm:text-6xl md:text-8xl transition-all duration-300"
            style={{
              color: "#ff2d55",
              textShadow: isShining
                ? "0 0 50px rgba(255, 45, 85, 0.9), 0 0 100px rgba(255, 45, 85, 0.6), 0 0 150px rgba(255, 77, 125, 0.4)"
                : "0 0 30px rgba(255, 45, 85, 0.6), 0 0 60px rgba(255, 45, 85, 0.3)",
              filter: isShining ? "brightness(1.3)" : "brightness(1)",
            }}
          >
            &#10084;
          </span>

          {/* Continuous sparkle hearts */}
          {sparkles.map((sparkle) => (
            <span
              key={sparkle.id}
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                fontSize: `${sparkle.size}px`,
                color: sparkle.color,
                textShadow: `0 0 8px ${sparkle.color}`,
                animationDelay: `${sparkle.delay}ms`,
                animation: "sparkle-fly 0.9s ease-out forwards",
                ["--sparkle-x" as string]: `${Math.cos((sparkle.angle * Math.PI) / 180) * sparkle.distance}px`,
                ["--sparkle-y" as string]: `${Math.sin((sparkle.angle * Math.PI) / 180) * sparkle.distance}px`,
              }}
            >
              &#10084;
            </span>
          ))}
        </div>

        {/* Headline */}
        <h1
          className="font-playfair text-3xl font-black leading-tight tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
          style={{
            color: "#fff0f3",
            textShadow: "0 0 40px rgba(255, 77, 125, 0.3)",
          }}
        >
          Happy Valentine&apos;s Day
        </h1>

        {/* Subtitle */}
        <p className="animate-shimmer font-greatvibes text-2xl sm:text-3xl md:text-4xl">
          To Someone Special
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#love-letter"
        className="animate-scroll-bounce absolute bottom-10 z-10 flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
        style={{ color: "#e8b4c8" }}
      >
        <span className="text-sm tracking-widest uppercase">Scroll</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
