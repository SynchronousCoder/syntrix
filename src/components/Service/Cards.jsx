import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const BLOOM_URL = "https://ik.imagekit.io/m9zi40oov/bloom_texture_cleanup.png";

const Card = ({ title, line, idx }) => {
  const card = useRef(null);

  useGSAP(() => {
    const direction = idx % 2 === 0 ? -150 : 150;

    gsap.fromTo(
      card.current,
      {
        x: direction,
        opacity: 0,
        rotationY: direction > 0 ? 10 : -10,
      },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card.current,
          start: "top 85%",
          end: "top 50%",
          scrub: true,
        },
      }
    );
  }, [idx]);

  return (
    <div
      ref={card}
      className="relative w-full group cursor-default rounded-[2.5rem] 
                 border-2 border-transparent 
                 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    >
      {/* SVG Bloom Border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={`bloom-${idx}`} patternUnits="userSpaceOnUse" width="600" height="400">
            <image
              href={BLOOM_URL}
              x="0"
              y="0"
              width="600"
              height="400"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
        <rect
          x="1.5"
          y="1.5"
          width="99%"
          height="99%"
          rx="38"
          ry="38"
          fill="none"
          stroke={`url(#bloom-${idx})`}
          strokeWidth="2.5"
        />
      </svg>

      {/* Card Content */}
      <div className="relative flex flex-col justify-between gap-4 px-8 py-8 sm:px-10 sm:py-10">
        <span className="self-end text-xs font-[font2] tracking-widest uppercase opacity-30 text-white">
          0{idx + 1}
        </span>

        <h1
          className="font-[font1] uppercase leading-none text-center"
          style={{
            fontSize: "clamp(2rem, 5vw, 5.5rem)",
            backgroundImage: `url('${BLOOM_URL}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title}
        </h1>

        <div className="w-16 h-[1px] bg-white/20 mx-auto" />

        <p className="font-[font2] text-center text-white/60 text-sm sm:text-base lg:text-[1.05vw] leading-relaxed">
          {line}
        </p>
      </div>
    </div>
  );
};

export default Card;