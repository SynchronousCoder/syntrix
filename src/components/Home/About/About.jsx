import React, { useState } from "react";
import { motion } from "framer-motion";
import Tophead from "./Tophead";
import Middlepara from "./Middlepara";
import Lastpara from "./Lastpara";

// WaveWord Component for animation
const WaveWord = ({ text }) => {
  const letters = text.split("");

  const letterVariants = {
    initial: { y: 0 },
    animate: (i) => ({
      y: [0, -10, 10, 0], // smoother sine-like wave
      transition: {
        delay: i * 0.1, // staggered ripple
        duration: 3, // slower & smoother
        repeat: Infinity,
        ease: "easeInOut", // smooth easing
      },
    }),
  };

  return (
    <span className="inline-block mx-2">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          className="inline-block font-normal lg:text-[5.9vw] text-[17vw]"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const About = ({ btnAnimation }) => {
  const [showMiddle, setShowMiddle] = useState(false);

  return (
    <div id="aboutus" className="min-h-screen w-full bg-[#57D4FF] rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl text-black">
      {/* Wavy Text Section */}
      <div className="flex lg:justify-between lg:px-[6vh] px-[2vh]">
        <div className="lg:py-[12vh] py-[9vh]">
          <h1 className="font-[font2] lg:leading-none lg:text-[4.7vw] text-[15vw] leading-[17vw] text-light">
            We <WaveWord text="Design" />. We <WaveWord text="Develop" />. We{" "}
            <WaveWord text="Launch" />.
          </h1>
        </div>
      </div>

      <Tophead />
      {/* Divider */}
      <div className="mt-[4vh] h-[.2vh] w-full bg-[#fefefe] opacity-60"></div>

      {/* Middle Paragraph Section */}
      <Middlepara />

      {/* Divider */}
      <div className="mt-[4vh] h-[.2vh] w-full bg-[#fefefe] opacity-60"></div>

      <Lastpara btnAnimation={btnAnimation} />

    </div>
  );
};

export default About;