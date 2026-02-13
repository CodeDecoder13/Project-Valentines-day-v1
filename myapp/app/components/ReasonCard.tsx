"use client";

interface ReasonCardProps {
  emoji: string;
  title: string;
  description: string;
}

export default function ReasonCard({ emoji, title, description }: ReasonCardProps) {
  return (
    <div
      className="glass group cursor-default p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(255,45,85,0.25)]"
      style={{
        borderColor: "rgba(255, 100, 130, 0.2)",
      }}
    >
      <span className="mb-4 block text-4xl">{emoji}</span>
      <h3
        className="font-playfair mb-2 text-xl font-bold"
        style={{ color: "#fff0f3" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#e8b4c8" }}>
        {description}
      </p>
    </div>
  );
}
