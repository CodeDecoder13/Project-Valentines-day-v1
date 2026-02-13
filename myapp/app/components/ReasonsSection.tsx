"use client";

import ScrollReveal from "./ScrollReveal";
import ReasonCard from "./ReasonCard";

const reasons = [
  {
    emoji: "\u{1F495}",
    title: "Your Smile",
    description:
      "The way your smile lights up an entire room and makes everything feel okay.",
  },
  {
    emoji: "\u{1F31F}",
    title: "Your Kindness",
    description:
      "Your gentle heart that always knows exactly how to make others feel loved.",
  },
  {
    emoji: "\u{1F602}",
    title: "Your Laughter",
    description:
      "The sound of your laugh is the most beautiful melody I've ever heard.",
  },
  {
    emoji: "\u{1F4AA}",
    title: "Your Strength",
    description:
      "How you face every challenge with grace and never give up on what matters.",
  },
  {
    emoji: "\u{2728}",
    title: "Your Spirit",
    description:
      "The adventurous spark in your eyes that makes every day an exciting journey.",
  },
  {
    emoji: "\u{1F49E}",
    title: "Your Love",
    description:
      "The way you love deeply, fiercely, and unconditionally inspires me every day.",
  },
];

export default function ReasonsSection() {
  return (
    <section id="reasons" className="px-4 py-24 md:py-32">
      <div className="section-divider mb-16" />
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2
            className="font-playfair mb-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "#fff0f3", textShadow: "0 0 30px rgba(255, 77, 125, 0.2)" }}
          >
            Reasons I Started to like You
          </h2>
          <p
            className="font-greatvibes mb-16 text-center text-xl md:text-2xl"
            style={{ color: "#f0c27a" }}
          >
            Just a few of the countless reasons
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 150}>
              <ReasonCard {...reason} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
