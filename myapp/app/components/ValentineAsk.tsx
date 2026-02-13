"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";

// ─── Web3Forms Config ───────────────────────────────
// 1. Go to https://web3forms.com
// 2. Enter YOUR email and get your access key
// 3. Paste it below
const WEB3FORMS_ACCESS_KEY = "06e51d7d-3a2d-4af1-a1a2-2d73a62ec92b";

const dodgeStages = [
  { text: "No", emoji: "" },
  { text: "Are you sure?", emoji: "\u{1F914}" },
  { text: "Really really?", emoji: "\u{1F612}" },
  { text: "Think again!", emoji: "\u{1F625}" },
  { text: "Pretty please?", emoji: "\u{1F97A}" },
  { text: "Don't break my heart!", emoji: "\u{1F494}" },
  { text: "I'll be sad...", emoji: "\u{1F62D}" },
  { text: "You're making me cry!", emoji: "\u{1F62D}\u{1F62D}" },
  { text: "PLEASE!", emoji: "\u{1F64F}" },
  { text: "Last chance!", emoji: "\u{1F631}" },
];

function sendValentineNotification(dodgeAttempts: number) {
  const now = new Date();
  const timestamp = now.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "\u{1F495} She said YES! Happy Valentine's Day! \u{1F495}",
      from_name: "Valentine's Day App",
      message: [
        "\u{2764}\uFE0F Your Valentine said YES! \u{2764}\uFE0F",
        "",
        `Date & Time: ${timestamp}`,
        `Dodge attempts before saying Yes: ${dodgeAttempts}`,
        "",
        "Happy Valentine's Day! \u{1F339}\u{1F495}",
      ].join("\n"),
    }),
  }).catch(() => {
    // Silently fail — don't ruin the celebration
  });
}

export default function ValentineAsk() {
  const [accepted, setAccepted] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);

  const handleDodge = useCallback(() => {
    setDodgeCount((prev) => Math.min(prev + 1, dodgeStages.length - 1));
  }, []);

  const handleAccept = useCallback(() => {
    setAccepted(true);
    sendValentineNotification(dodgeCount);
  }, [dodgeCount]);

  const stage = dodgeStages[dodgeCount];
  // Yes button grows but capped for mobile
  const yesScale = Math.min(1 + dodgeCount * 0.08, 1.6);
  // No button shrinks with each dodge
  const noScale = Math.max(1 - dodgeCount * 0.06, 0.55);

  if (accepted) {
    return (
      <section id="valentine-ask" className="px-4 py-24 md:py-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div
            className="animate-heartbeat mb-6 text-6xl sm:text-7xl md:text-9xl"
            style={{
              color: "#ff2d55",
              textShadow: "0 0 40px rgba(255, 45, 85, 0.6), 0 0 80px rgba(255, 45, 85, 0.3)",
            }}
          >
            &#10084;
          </div>
          <h2
            className="font-playfair mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "#fff0f3", textShadow: "0 0 30px rgba(255, 77, 125, 0.4)" }}
          >
            Yay! I knew it!
          </h2>
          <p
            className="font-greatvibes text-2xl sm:text-3xl md:text-4xl"
            style={{ color: "#f0c27a", textShadow: "0 0 20px rgba(240, 194, 122, 0.3)" }}
          >
            Happy Valentine&apos;s Day, my love!
          </p>

          {/* Emoji celebration */}
          <p className="mt-6 text-3xl sm:text-4xl">
            {"\u{1F389}\u{1F495}\u{2728}\u{1F970}\u{2728}\u{1F495}\u{1F389}"}
          </p>

          {/* Heart burst */}
          <div className="relative mt-8 h-40 w-40">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="animate-burst absolute left-1/2 top-1/2 text-2xl"
                style={{
                  color: i % 3 === 0 ? "#ff2d55" : i % 3 === 1 ? "#ff4d7d" : "#f0c27a",
                  textShadow: "0 0 12px rgba(255, 45, 85, 0.5)",
                  animationDelay: `${i * 60}ms`,
                  transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-50px)`,
                }}
              >
                &#10084;
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="valentine-ask" className="px-4 py-24 md:py-32">
      <div className="section-divider mb-16" />
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <ScrollReveal>
          <h2
            className="font-playfair mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ color: "#fff0f3", textShadow: "0 0 30px rgba(255, 77, 125, 0.2)" }}
          >
            Will You Be My Valentine?
          </h2>
          <p
            className="font-greatvibes mb-4 text-lg sm:text-xl md:text-2xl"
            style={{ color: "#e8b4c8" }}
          >
            I have an important question for you...
          </p>

          {/* Reaction emoji that changes per dodge */}
          {dodgeCount > 0 && (
            <p className="mb-8 text-4xl sm:text-5xl transition-all duration-300" key={dodgeCount}>
              {stage.emoji}
            </p>
          )}
          {dodgeCount === 0 && <div className="mb-8" />}
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="relative flex min-h-[140px] flex-wrap items-center justify-center gap-4 sm:gap-6 overflow-hidden">
            {/* Yes button — grows with each dodge */}
            <button
              onClick={handleAccept}
              className="animate-pulse-glow cursor-pointer rounded-full font-playfair font-bold transition-all duration-500 hover:scale-110"
              style={{
                backgroundColor: "#ff2d55",
                color: "#fff0f3",
                transform: `scale(${yesScale})`,
                padding: `${14 + dodgeCount}px ${32 + dodgeCount * 2}px`,
                fontSize: `${18 + dodgeCount}px`,
                zIndex: 10,
              }}
            >
              Yes! &#10084;
            </button>

            {/* Dodging No button */}
            <DodgeButton
              text={stage.text}
              scale={noScale}
              onDodge={handleDodge}
              dodgeCount={dodgeCount}
            />
          </div>

          {/* Hint text after a few dodges */}
          {dodgeCount >= 3 && (
            <p
              className="font-lora mt-8 text-xs sm:text-sm italic transition-all duration-300"
              style={{ color: "#ff7aa2" }}
            >
              {dodgeCount >= 7
                ? "Just click Yes already! \u{1F49C}"
                : dodgeCount >= 5
                  ? "The Yes button is looking really good right now..."
                  : "Hmm, that button seems hard to catch..."}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

function DodgeButton({
  text,
  scale,
  onDodge,
  dodgeCount,
}: {
  text: string;
  scale: number;
  onDodge: () => void;
  dodgeCount: number;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dodge = useCallback(() => {
    // Smaller dodge range on mobile so button stays visible
    const baseRange = isMobile ? 100 : 200;
    const increment = isMobile ? 15 : 30;
    const range = baseRange + dodgeCount * increment;
    const x = (Math.random() - 0.5) * range;
    const y = (Math.random() - 0.5) * (range * 0.5);
    setPosition({ x, y });
    onDodge();
  }, [onDodge, dodgeCount, isMobile]);

  return (
    <button
      onMouseEnter={dodge}
      onClick={(e) => {
        e.preventDefault();
        dodge();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        dodge();
      }}
      className="cursor-pointer rounded-full border font-playfair text-sm sm:text-lg transition-all duration-300"
      style={{
        borderColor: dodgeCount >= 7 ? "rgba(255, 107, 138, 0.15)" : "#ff6b8a",
        color: "#e8b4c8",
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        padding: isMobile ? "12px 24px" : "16px 40px",
        opacity: Math.max(1 - dodgeCount * 0.08, 0.4),
      }}
    >
      {text}
    </button>
  );
}
