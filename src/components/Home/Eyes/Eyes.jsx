import React, { useEffect, useRef, useState } from "react";
import Eye from "./Eye";

// Floating orb config — deterministic so no hydration mismatch
const ORBS = [
  { id: 1,  size: 320, x: 8,   y: 15,  duration: 18, delay: 0,    opacity: 0.07, blur: 60 },
  { id: 2,  size: 180, x: 75,  y: 60,  duration: 24, delay: -6,   opacity: 0.09, blur: 40 },
  { id: 3,  size: 240, x: 55,  y: 10,  duration: 20, delay: -3,   opacity: 0.06, blur: 70 },
  { id: 4,  size: 140, x: 20,  y: 70,  duration: 28, delay: -10,  opacity: 0.10, blur: 30 },
  { id: 5,  size: 200, x: 88,  y: 25,  duration: 16, delay: -8,   opacity: 0.07, blur: 50 },
  { id: 6,  size: 260, x: 40,  y: 80,  duration: 22, delay: -4,   opacity: 0.05, blur: 80 },
  { id: 7,  size: 120, x: 65,  y: 45,  duration: 30, delay: -14,  opacity: 0.08, blur: 25 },
  { id: 8,  size: 160, x: 5,   y: 50,  duration: 26, delay: -2,   opacity: 0.06, blur: 45 },
];

const Eyes = () => {
  const mousePosRef = useRef({ x: 0, y: 0 });
  const bgRef = useRef(null);
  const containerRef = useRef(null);
  const bgRafRef = useRef(null);
  const bgTarget = useRef({ x: 0, y: 0 });
  const bgCurrent = useRef({ x: 0, y: 0 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    checkMobile();
    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", checkMobile);
    return () => mq.removeEventListener("change", checkMobile);
  }, []);

  // Mouse tracking — writes to ref, NOT state (zero re-renders)
  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      // Parallax target — normalise to [-1, 1] from center
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      bgTarget.current = { x: nx * 14, y: ny * 8 }; // px — very subtle
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [isMobile]);

  // Background parallax rAF loop — separate from eye rAF
  useEffect(() => {
    if (isMobile) return;

    const tick = () => {
      bgCurrent.current.x += (bgTarget.current.x - bgCurrent.current.x) * 0.06;
      bgCurrent.current.y += (bgTarget.current.y - bgCurrent.current.y) * 0.06;

      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.04) translateX(${bgCurrent.current.x.toFixed(2)}px) translateY(${bgCurrent.current.y.toFixed(2)}px)`;
      }
      bgRafRef.current = requestAnimationFrame(tick);
    };

    bgRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(bgRafRef.current);
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-hidden rounded-tl-3xl rounded-tr-3xl relative"
    >
      {/* Background layer — slightly oversized to allow parallax travel without edges showing */}
      <div
        ref={bgRef}
        className="absolute inset-[-2%] bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url(/img/bannerOP.png)",
          transform: "scale(1.04)",
        }}
      />

      {/* Dark overlay for depth + eye contrast */}
      <div className="absolute inset-0 bg-black/25 z-[1]" />

      {/* Floating orbs — pure CSS, zero JS */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {ORBS.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full orb-float"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: "radial-gradient(circle at 40% 35%, rgba(255,255,255,1) 0%, rgba(200,200,255,0.6) 40%, transparent 70%)",
              opacity: orb.opacity,
              filter: `blur(${orb.blur}px)`,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
              transform: "translate(-50%, -50%)",
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Eyes — centered */}
      <div
        className="
          absolute z-[10]
          flex gap-5 lg:gap-10
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
        "
        data-scroll
        data-scroll-speed="-.7"
      >
        <Eye mousePosRef={mousePosRef} isMobile={isMobile} />
        <Eye mousePosRef={mousePosRef} isMobile={isMobile} />
      </div>
    </div>
  );
};

export default Eyes;