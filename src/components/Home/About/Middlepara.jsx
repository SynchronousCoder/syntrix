import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// ── Data ───────────────────────────────────────────────────────────────────────
const CARDS = [
  {
    index: "01",
    tag: "Growth Focused",
    headline: "Your growth\nis our mission",
    body: "We don't just design websites — we craft digital experiences that amplify trust, strengthen brand authority, and drive measurable impact.",
    accent: "#3ECFFF",
  },
  {
    index: "02",
    tag: "Precision Crafted",
    headline: "Every detail\ndeliberately built",
    body: "From design choices to micro-interactions — each element is engineered with precision to make your business stand out today and scale for tomorrow.",
    accent: "#A78BFA",
  },
  {
    index: "03",
    tag: "Digital Partnership",
    headline: "Not an agency.\nYour partner.",
    body: "Our mission is simple — to create experiences that build trust, spark engagement, and turn first-time visitors into loyal customers.",
    accent: "#34D399",
  },
];

// ── TiltCard ──────────────────────────────────────────────────────────────────
const TiltCard = ({ card, index }) => {
  const cardRef = useRef(null);
  const spotRef = useRef(null);
  const rafRef = useRef(null);

  // Tilt + spotlight on mouse move
  const handleMouseMove = (e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Tilt — max ±10deg
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) * 8;

      el.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02,1.02,1.02)`;

      // Spotlight follows cursor
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(320px circle at ${x}px ${y}px, ${card.accent}22, transparent 70%)`;
        spotRef.current.style.opacity = "1";
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      overwrite: true,
    });
    if (spotRef.current) {
      gsap.to(spotRef.current, { opacity: 0, duration: 0.4 });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        syntrix-card
        relative flex flex-col justify-between
        lg:w-[28vw] w-full
        lg:min-h-[52vh] min-h-0
        p-[clamp(1.4rem,3vw,2.4rem)]
        rounded-2xl
        cursor-default
        overflow-hidden
        will-change-transform
        select-none
      "
      style={{
        transformStyle: "preserve-3d",
        /* Glass surface — true backdrop blur */
        background: "rgba(241, 241, 241, 0.60)",
        backdropFilter: "blur(28px) saturate(140%) brightness(0.92)",
        WebkitBackdropFilter: "blur(28px) saturate(140%) brightness(0.92)",
        /* Layered shadows: ambient lift + tight contact shadow */
        boxShadow: `
          0 2px 0 0 rgba(255,255,255,0.60) inset,
          0 -1px 0 0 rgba(0,0,0,0.10) inset,
          1px 0 0 0 rgba(255,255,255,0.20) inset,
          -1px 0 0 0 rgba(255,255,255,0.12) inset,
          0 8px 32px rgba(0,0,0,0.14),
          0 2px 8px rgba(0,0,0,0.10),
          0 40px 80px rgba(0,0,0,0.08)
        `,
        /* Crisp border: top edge brighter (light source above) */
        border: "1px solid rgba(255,255,255,0.28)",
      }}
    >
      {/* Spotlight layer — per-card, follows cursor */}
      <div
        ref={spotRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-0 opacity-0 transition-opacity duration-200"
        style={{ background: "transparent" }}
      />

      {/* Top-edge gloss — the "lit bevel" that reads as physical thickness */}
      <div
        className="absolute top-0 left-[8%] right-[8%] h-[1px] pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.75) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.75) 70%, transparent)",
        }}
      />

      {/* Accent stripe — sits just below the gloss */}
      <div
        className="absolute top-[1px] left-0 right-0 h-[2px] rounded-tl-2xl rounded-tr-2xl z-10"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.accent}bb, transparent)`,
        }}
      />

      {/* Bottom ambient glow — card floats above bg */}
      <div
        className="absolute -bottom-6 left-[15%] right-[15%] h-12 pointer-events-none z-[-1] blur-xl rounded-full opacity-40"
        style={{ background: card.accent }}
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full gap-[clamp(1.5rem,4vh,3rem)]">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <span className="font-[font2] text-[clamp(0.65rem,1vw,0.8rem)] tracking-[0.18em] uppercase opacity-50">
            {card.tag}
          </span>
          <span className="font-[font2] text-[clamp(1rem,2.5vw,1.6rem)] font-bold leading-none opacity-20">
            {card.index}
          </span>
        </div>

        {/* Headline */}
        <h3 className="font-[font2] text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[1.15] font-semibold whitespace-pre-line">
          {card.headline}
        </h3>

        {/* Body */}
        <p className="font-[font2] text-[clamp(0.85rem,1.2vw,1rem)] leading-[1.7] opacity-70 mt-auto">
          {card.body}
        </p>

        {/* Bottom accent dot */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: card.accent }}
          />
          <div className="h-px flex-1 opacity-20 bg-current" />
        </div>
      </div>
    </div>
  );
};

// ── Middlepara ─────────────────────────────────────────────────────────────────
const Middlepara = () => {
  const containerRef = useRef(null);
  const headRef = useRef(null);
  const cardsRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label
      gsap.from(headRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Cards — stagger reveal with slight Y travel + fade
      const cards = cardsRef.current?.querySelectorAll(".syntrix-card");
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          scale: 0.96,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 78%",
          },
        });
      }

      // Social links
      const links = socialRef.current?.querySelectorAll(".social-link");
      if (links?.length) {
        gsap.from(links, {
          opacity: 0,
          x: -16,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 85%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        w-full h-full
        lg:px-[6vh] px-[4vw]
        py-[6vh]
        font-[font2]
        flex flex-col gap-[5vh]
      "
    >
      {/* Section label */}
      <span
        ref={headRef}
        className="text-[clamp(0.65rem,1vw,0.78rem)] tracking-[0.2em] uppercase opacity-50 font-[font2]"
      >
        What sets us apart
      </span>

      {/* Cards rail */}
      <div
        ref={cardsRef}
        className="
          flex
          lg:flex-row flex-col
          gap-[clamp(1rem,2vw,1.5rem)]
          w-full
        "
      >
        {CARDS.map((card, i) => (
          <TiltCard key={card.index} card={card} index={i} />
        ))}
      </div>

      {/* Social links — premium animated underline */}
      <div ref={socialRef} className="flex flex-col gap-1 pt-[1vh]">
        <span className="text-[clamp(0.65rem,1vw,0.78rem)] tracking-[0.2em] uppercase opacity-50 mb-3">
          Social
        </span>
        {[
          { label: "Youtube", href: "" },
          { label: "Instagram", href: "" },
          { label: "LinkedIn", href: "" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="social-link group flex items-center gap-3 w-fit"
          >
            {/* Sliding arrow */}
            <span className="text-[clamp(0.75rem,1.1vw,0.9rem)] font-[font2] tracking-wide relative">
              <span className="relative inline-block">
                {label}
                {/* Animated underline */}
                <span
                  className="
                    absolute bottom-[-2px] left-0 h-[1px] bg-current
                    w-0 group-hover:w-full
                    transition-all duration-300 ease-in-out
                  "
                />
              </span>
            </span>
            {/* Arrow — slides right on hover */}
            <span
              className="
                text-[0.7rem] opacity-0 -translate-x-2
                group-hover:opacity-70 group-hover:translate-x-0
                transition-all duration-300 ease-out
              "
            >
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Middlepara;
