import React, { useRef, useEffect } from "react";

/**
 * Eye — Premium independent eye tracker
 *
 * Props:
 *   mousePosRef  {current: {x, y}}  — shared ref from parent, updated via rAF
 *   isMobile     boolean             — disables mouse tracking on touch devices
 */
const Eye = ({ mousePosRef, isMobile }) => {
  const eyeRef = useRef(null);
  const pupilRef = useRef(null);
  const glowRef = useRef(null);
  const rafRef = useRef(null);

  // Lerp target (raw) and current (smoothed)
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Autonomous idle movement for mobile / fallback
  const idlePhase = useRef(Math.random() * Math.PI * 2);

  useEffect(() => {
    const LERP_FACTOR = 0.09;          // Lower = smoother / more lag
    const MAX_TRAVEL_X = 28;           // % of iris radius pupil can travel (horizontal)
    const MAX_TRAVEL_Y = 18;           // % (vertical — eyes don't look as far up/down)
    const PROXIMITY_SCALE_MAX = 1.15;  // Max pupil scale when cursor is very close
    const PROXIMITY_RADIUS = 200;      // px — distance at which proximity kicks in

    const animate = (timestamp) => {
      const eye = eyeRef.current;
      const pupil = pupilRef.current;
      const glow = glowRef.current;
      if (!eye || !pupil) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = eye.getBoundingClientRect();
      const eyeCX = rect.left + rect.width / 2;
      const eyeCY = rect.top + rect.height / 2;

      if (!isMobile && mousePosRef?.current) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;

        const dx = mx - eyeCX;
        const dy = my - eyeCY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Normalise and clamp travel
        const maxTX = (rect.width / 2) * (MAX_TRAVEL_X / 100);
        const maxTY = (rect.height / 2) * (MAX_TRAVEL_Y / 100);
        const norm = Math.min(dist / (rect.width * 1.5), 1);

        target.current.x = (dx / (dist || 1)) * norm * maxTX;
        target.current.y = (dy / (dist || 1)) * norm * maxTY;

        // Proximity scale
        const proximity = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
        const scale = 1 + (PROXIMITY_SCALE_MAX - 1) * proximity;
        pupil.style.transform = `translate(-50%, -50%) translateX(${current.current.x.toFixed(2)}px) translateY(${current.current.y.toFixed(2)}px) scale(${scale.toFixed(3)})`;

        if (glow) {
          glow.style.opacity = (0.3 + proximity * 0.5).toFixed(3);
        }
      } else {
        // Mobile: autonomous idle drift — organic figure-8 lemniscate path
        idlePhase.current += 0.008;
        const t = idlePhase.current;
        const idleX = Math.sin(t) * 10;
        const idleY = Math.sin(t * 0.7) * 6;
        target.current.x = idleX;
        target.current.y = idleY;

        pupil.style.transform = `translate(-50%, -50%) translateX(${current.current.x.toFixed(2)}px) translateY(${current.current.y.toFixed(2)}px)`;
      }

      // Lerp — smooth damping
      current.current.x += (target.current.x - current.current.x) * LERP_FACTOR;
      current.current.y += (target.current.y - current.current.y) * LERP_FACTOR;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, mousePosRef]);

  return (
    /* Outer eyeball */
    <div
      ref={eyeRef}
      className="
        eye-outer
        lg:h-[28vh] lg:w-[14vw]
        h-[22vh] w-[38vw]
        rounded-[60%/70%]
        flex justify-center items-center
        bg-[#F4F4F4]
        shadow-[inset_0_4px_24px_rgba(0,0,0,0.08)]
        relative overflow-hidden
      "
    >
      {/* Subtle specular sheen on eyeball */}
      <div className="absolute inset-0 rounded-[60%/70%] bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none z-10" />

      {/* Iris */}
      <div
        className="
          lg:w-[7vw] lg:h-[14vh]
          h-[15vh] w-[22vw]
          rounded-[60%/70%]
          relative
          overflow-hidden
          flex items-center justify-center
        "
        style={{ background: "radial-gradient(ellipse at 40% 35%, #2a2a2a 0%, #111 60%, #000 100%)" }}
      >
        {/* Iris texture ring */}
        <div
          className="absolute inset-0 rounded-[60%/70%] opacity-20"
          style={{
            background: "repeating-radial-gradient(ellipse at center, transparent 0px, transparent 4px, rgba(255,255,255,0.06) 5px)"
          }}
        />

        {/* Pupil — uses translate, NEVER rotate */}
        <div
          ref={pupilRef}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
        >
          {/* Pupil core */}
          <div
            className="
              lg:w-10 lg:h-10
              w-8 h-8
              rounded-full
              bg-white
              relative
            "
          >
            {/* Glow halo */}
            <div
              ref={glowRef}
              className="absolute inset-[-4px] rounded-full opacity-30 transition-opacity duration-300"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)" }}
            />
            {/* Specular highlight (tiny dot, offset) */}
            <div className="absolute top-[15%] left-[20%] w-[28%] h-[28%] rounded-full bg-white/90" />
          </div>
        </div>

        {/* Iris rim light */}
        <div className="absolute inset-0 rounded-[60%/70%] ring-1 ring-white/5 pointer-events-none" />
      </div>

      {/* Bottom eyelid shadow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[20%] pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.06), transparent)" }}
      />
    </div>
  );
};

export default Eye;