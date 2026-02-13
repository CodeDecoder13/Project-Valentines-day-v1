"use client";

export default function FooterSection() {
  return (
    <footer className="px-4 py-16 text-center">
      <div className="section-divider mb-12" />
      <div className="mx-auto max-w-md">
        <span
          className="animate-heartbeat mb-4 inline-block text-3xl"
          style={{
            color: "#ff2d55",
            textShadow: "0 0 20px rgba(255, 45, 85, 0.5)",
          }}
        >
          &#10084;
        </span>

        <p
          className="font-greatvibes mb-6 text-2xl md:text-3xl"
          style={{ color: "#f0c27a", textShadow: "0 0 15px rgba(240, 194, 122, 0.2)" }}
        >
          Made with love, for you
        </p>

        <a
          href="#hero"
          className="inline-block text-sm tracking-widest uppercase transition-colors duration-200 hover:opacity-70"
          style={{ color: "#e8b4c8" }}
        >
          Back to top &uarr;
        </a>
      </div>
    </footer>
  );
}
