"use client";

import { useState, useEffect } from "react";

const heartColors = ["#ff2d55", "#ff4d7d", "#ff6b8a", "#ff7aa2", "#e63e6d", "#ff85a1"];

// Deterministic pseudo-random using a simple hash
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49271;
  return x - Math.floor(x);
}

function generateHearts() {
  return Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${seededRandom(i * 7 + 1) * 100}%`,
    size: `${seededRandom(i * 7 + 2) * 20 + 12}px`,
    duration: `${seededRandom(i * 7 + 3) * 10 + 8}s`,
    delay: `${seededRandom(i * 7 + 4) * 12}s`,
    opacity: seededRandom(i * 7 + 5) * 0.5 + 0.2,
    color: heartColors[i % heartColors.length],
  }));
}

const hearts = generateHearts();

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="animate-float-heart absolute"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            opacity: heart.opacity,
            color: heart.color,
            textShadow: `0 0 10px ${heart.color}60`,
          }}
        >
          &#10084;
        </span>
      ))}
    </div>
  );
}
