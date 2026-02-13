"use client";

import ScrollReveal from "./ScrollReveal";

const memories = [
  { placeholder: "gallery-placeholder-1", caption: "Our first date", height: "h-64 sm:h-72" },
  { placeholder: "gallery-placeholder-2", caption: "A trip together", height: "h-48 sm:h-56" },
  { placeholder: "gallery-placeholder-3", caption: "Laughing until we cry", height: "h-56 sm:h-64" },
  { placeholder: "gallery-placeholder-4", caption: "Our favorite spot", height: "h-52 sm:h-60" },
  { placeholder: "gallery-placeholder-5", caption: "A surprise for you", height: "h-60 sm:h-72" },
  { placeholder: "gallery-placeholder-6", caption: "Forever & always", height: "h-48 sm:h-56" },
];

function LockIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" className="section-glow px-4 py-24 md:py-32">
      <div className="section-divider mb-16" />
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <h2
            className="font-playfair mb-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ color: "#fff0f3", textShadow: "0 0 30px rgba(255, 77, 125, 0.2)" }}
          >
            Our Memories
          </h2>
          <p
            className="font-greatvibes mb-4 text-center text-xl md:text-2xl"
            style={{ color: "#f0c27a" }}
          >
            Moments waiting to be made
          </p>
          <p
            className="font-lora mb-16 text-center text-sm"
            style={{ color: "#e8b4c8" }}
          >
            Our story is just beginning — these are the memories we&apos;ll unlock together
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory, i) => (
            <ScrollReveal key={memory.caption} delay={i * 120}>
              <div
                className={`glass group relative overflow-hidden ${memory.height} cursor-default transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,45,85,0.2)]`}
              >
                {/* Gradient placeholder background */}
                <div className={`${memory.placeholder} absolute inset-0 opacity-40`} />

                {/* Dark overlay for locked feel */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(circle at center, rgba(42, 7, 20, 0.5) 0%, rgba(42, 7, 20, 0.8) 100%)",
                  }}
                />

                {/* Lock icon + text centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div
                    className="rounded-full p-3 transition-all duration-500 group-hover:scale-110"
                    style={{
                      color: "#ff6b8a",
                      background: "rgba(255, 45, 85, 0.1)",
                      border: "1px solid rgba(255, 107, 138, 0.25)",
                    }}
                  >
                    <LockIcon />
                  </div>
                  <span
                    className="font-greatvibes text-lg"
                    style={{ color: "#ff7aa2" }}
                  >
                    Locked
                  </span>
                </div>

                {/* Caption at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 p-4 pt-8"
                  style={{ background: "linear-gradient(to top, rgba(42, 7, 20, 0.95), transparent)" }}
                >
                  <p className="font-lora text-center text-sm" style={{ color: "#e8b4c8" }}>
                    {memory.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
