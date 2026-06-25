import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FloatingPreview = () => {
  const cardRef = useRef(null);
  const isHovered = useRef(false);

  useGSAP(() => {
    // Ambient float — barely perceptible, like an object suspended in air.
    // sine.inOut is the only easing that reads as "weightless" not "bouncy".
    gsap.to(cardRef.current, {
      y: -6,
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "sine.inOut",
    });
  });

  const handleMouseMove = (e) => {
    if (!isHovered.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0 → 1
    const y = (e.clientY - rect.top)  / rect.height; // 0 → 1

    // Max ±6deg — subtle enough to feel physical, not gamified.
    gsap.to(cardRef.current, {
      rotateY: (x - 0.5) * 12,
      rotateX: -(y - 0.5) * 8,
      duration: 0.8,         // slow follow = weight = premium
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseEnter = () => {
    isHovered.current = true;

    // Lift toward user: scale + subtle y rise.
    // duration 0.6 not 0.3 — luxury objects don't snap.
    gsap.to(cardRef.current, {
      scale: 1.025,
      y: -14,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    isHovered.current = false;

    // Weighted return — elastic would feel playful, power3 feels considered.
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      rotateX: 4,
      rotateY: -10,
      duration: 1.0,
      ease: "power3.out",
      overwrite: "auto",
      delay: 0.05,
    });
  };

  return (
    <div
      className="block absolute right-[1vw] top-[10vh] w-[58vw] h-[70vh] z-[10]"
      style={{ perspective: "1200px" }} // tighter perspective = more physical depth
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(-10deg) rotateX(4deg)",
          willChange: "transform",
        }}
      >
        <img
          src="https://ik.imagekit.io/m9zi40oov/ogHero.png?updatedAt=1782332189820"
          alt="Syntrix Preview"
          className="w-full h-full object-contain select-none"
          style={{ filter: "drop-shadow(0 32px 48px rgba(0,0,0,0.14))" }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default FloatingPreview;