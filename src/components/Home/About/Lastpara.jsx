import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Lastpara = ({ btnAnimation }) => {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Parallax: image drifts up slightly as user scrolls past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <div
      ref={sectionRef}
      className="
        w-full h-full
        lg:px-[6vh] px-[4vw]
        pt-[6vh] pb-[7vh]
        font-[font2] text-[#212121]
        flex lg:flex-row flex-col
        justify-between
        items-center
        gap-[4vh]
      "
    >
      {/* ── CTA Button ── */}
      <div className="lg:self-end self-start order-2 lg:order-1">
        <Link
          to="/about"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {btnAnimation({ char: "know more", key: 1 })}
        </Link>
      </div>

      {/* ── Image ── */}
      <div
        ref={imgWrapRef}
        className="
          order-1 lg:order-2
          lg:h-[62vh] lg:w-[48vw]
          h-[45vw] w-full
          min-h-[240px]
          rounded-2xl
          overflow-hidden
          relative
          /* Clip-path reveal on scroll */
          will-change-transform
        "
        style={{
          boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* Scroll-parallax wrapper */}
        <motion.div
          style={{ y: smoothY }}
          className="absolute inset-[-5%] h-[110%] w-[110%]"
        >
          <motion.img
            ref={imgRef}
            className="h-full w-full object-cover"
            src="/img/aboutus.png"
            alt="About Syntrix"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </motion.div>

        {/* Subtle gradient frame overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%, rgba(0,0,0,0.06) 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
          }}
        />
      </div>
    </div>
  );
};

export default Lastpara;