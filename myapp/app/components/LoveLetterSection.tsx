"use client";

import ScrollReveal from "./ScrollReveal";

export default function LoveLetterSection() {
  return (
    <section id="love-letter" className="section-glow relative px-4 py-24 md:py-32">
      <div className="section-divider mb-16" />
      <div className="mx-auto max-w-2xl">
        <ScrollReveal>
          <h2
            className="font-greatvibes mb-12 text-center text-4xl md:text-5xl"
            style={{ color: "#f0c27a", textShadow: "0 0 20px rgba(240, 194, 122, 0.3)" }}
          >
            A Letter For You
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass p-8 md:p-12">
            <p className="drop-cap font-lora mb-6 text-lg leading-relaxed" style={{ color: "#fff0f3" }}>
              From the moment you came into my life, things just started feeling
              different in a good way. Being with you makes even normal days
              feel a little more special, and I genuinely enjoy the simple
              moments we share.
            </p>

            <ScrollReveal delay={400}>
              <p className="font-lora mb-6 text-lg leading-relaxed" style={{ color: "#fff0f3" }}>
                Every day with you feels like something I appreciate more and
                more. I love your laugh, your smile, and the way you make me
                feel comfortable just being myself. Honestly, having you in my
                life has been one of the best things that&apos;s happened to me.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <p className="font-lora mb-6 text-lg leading-relaxed" style={{ color: "#fff0f3" }}>
                Even though we haven&apos;t known each other for that long, it
                already feels like we&apos;ve built something meaningful. What I
                like most is how we&apos;ve been getting to know each other
                while talking about our plans and dreams. It makes me excited
                for what&apos;s ahead, and I really hope those dreams we&apos;re
                planning together come true.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={800}>
              <p className="font-lora mb-8 text-lg leading-relaxed" style={{ color: "#fff0f3" }}>
                Thank you for being you, I Hope your kindness, your patience, your
                warmth, and I hope you choose to share this journey with me.
                I&apos;ll always do my best to appreciate what we have, support
                you, and keep growing with you.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={1000}>
              <p
                className="font-greatvibes text-right text-2xl md:text-3xl"
                style={{ color: "#f0c27a", textShadow: "0 0 15px rgba(240, 194, 122, 0.25)" }}
              >
                With all my heart,
                <br />
                Rhuzzel
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
