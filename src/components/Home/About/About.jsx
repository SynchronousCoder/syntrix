import React, { useState } from "react";
import { motion } from "framer-motion";
import Tophead from "./Tophead";
import Middlepara from "./Middlepara";
import Lastpara from "./Lastpara";

// ── WaveWord: UNTOUCHED ────────────────────────────────────────────────────────
const WaveWord = ({ text }) => {
  const letters = text.split("");
  const letterVariants = {
    initial: { y: 0 },
    animate: (i) => ({
      y: [0, -10, 10, 0],
      transition: {
        delay: i * 0.1,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  };

  return (
    /*
      white-space: nowrap on the wrapper prevents mid-word line breaks.
      The outer h1 can still wrap between words, but "Design" will
      never split across lines.
    */
    <span className="inline-block mx-[0.2em] whitespace-nowrap">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          className="inline-block font-normal"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// ── About ──────────────────────────────────────────────────────────────────────
const About = ({ btnAnimation }) => {
  return (
    <div
      id="aboutus"
      className="min-h-screen w-full bg-[#57D4FF] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl text-black overflow-hidden"
    >
      {/* ── Hero headline ── */}
      <div className="flex lg:justify-between lg:px-[6vh] px-[4vw]">
        <div className="lg:py-[12vh] py-[7vh]">
          <h1
            className="font-[font2] hero-headline"
          >
            We <WaveWord text="Design" />. We{" "}
            <WaveWord text="Develop" />. We{" "}
            <WaveWord text="Launch" />.
          </h1>
        </div>
      </div>

      <Tophead />

      {/* Divider */}
      <div className="mt-[4vh] h-px w-full bg-white/40" />

      <Middlepara />

      {/* Divider */}
      <div className="mt-[4vh] h-px w-full bg-white/40" />

      <Lastpara btnAnimation={btnAnimation} />
    </div>
  );
};

export default About;