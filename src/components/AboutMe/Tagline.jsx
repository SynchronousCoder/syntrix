import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Eye from "../Home/Eyes/Eye";
gsap.registerPlugin(ScrollTrigger);

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
    <span className="inline-block mx-2 ">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="initial"
          animate="animate"
          className=" inline-block lg:text-[5.9vw] text-[17vw] font-extrabold bg-[url('https://ik.imagekit.io/sheryians/Aptitude%20&%20Reasoning/bloomMask%20Large_lvwFbM14_l.png')] bg-cover bg-center
        bg-clip-text text-transparent text-shadow-[0_0_20px_rgba(255,255,255,0.5)] "
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const Tagline = () => {
  const para = useRef(null);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const text = useRef(null);
  const divider = useRef(null);

  //WavyText
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text.current,
        start: "top 40%",
        end: "top 10%",
      },
    });

    tl.fromTo(
      text.current,
      {
        y: 100,
        scale: 2,
        opacity: 0,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "none",
      }
    );

    tl.from(
      para.current,{
        y: 100,
        scale: 0,
        opacity: 0,
        scrub: true
      }
    )
  });

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* MainHeading */}
      <div className="flex lg:justify-between lg:px-[6vh] px-[2vh]">
        <div ref={text} className="lg:py-[12vh] py-[9vh]">
          <h1 className="font-[font2] lg:leading-none lg:text-[4.7vw] text-[15vw] leading-[17vw] text-light text-white">
            We <WaveWord text="Design" />. We <WaveWord text="Develop" />. We{" "}
            <WaveWord text="Launch" />.
          </h1>
        </div>
      </div>

      {/* ===== About Us (Intro Para) ===== */}
      <div ref={para} className="lg:mb-[15vh] lg:px-[6vh] lg:max-w-[88vw] lg:text-[2.5vw] lg:leading-[1.5] px-[2vh] text-[6vw] mb-[5vh] tracking-wide text-[#F1F1F1]">
        <p className="font-[font2]">
          At <span className="font-bold">Syntrix</span>, we don’t just build
          websites—we craft digital experiences. <br />
          For us, design isn’t decoration, it’s communication. Every pixel,
          every motion, every interaction is designed to make brands
          unforgettable.
        </p>
      </div>

      {/* ===== Empty div for Eyes Animation ===== */}
      <div className="w-full lg:h-[40vh] flex items-center justify-center lg:gap-5 mb-[15vh]">
        <Eye rotate={rotate} />
        <Eye rotate={rotate} />
      </div>

      {/* ===== Our Philosophy (heading) ===== */}
      <div className="lg:px-[6vh] px-[2vh] max-w-[85ch] lg:text-[2.6vh] text-[6vw] leading-[7vw] lg:leading-[3.8vw] tracking-wide text-white">
        <p className="lg:mb-[2vh] font-[font2] lg:text-[3.8vw]">
          We craft stories you can see, feel, and remember.
        </p>
      </div>

      {/* ===== Divider ===== */}
      <div
        ref={divider}
        className="divider lg:mt-[9vh] mt-[8vh] h-[.2vh] w-full bg-[#F1F1F1] opacity-20 mb-[4vh]"
      ></div>

      <div className="lg:px-[6vh] px-[2vh] lg:py-[7vh] py-[5vh] text-white">
        <div className="flex lg:flex-row flex-col justify-between items-start">
          {/* <!-- Heading --> */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="lg:text-[1.75vw] text-[7.5vw] font-[font2]">What sets us apart:</h2>
          </div>

          {/* <!-- Paragraphs --> */}
          <div className="space-y-6 font-[font2] lg:w-1/2">
            <p className="lg:text-[2vw] text-[6vw] lg:leading-relaxed leading-tight">
              At Syntrix, we go beyond building websites—we design digital
              journeys that move people. With motion, clarity, and bold ideas,
              we turn static brands into living experiences.
            </p>
            <p className="lg:text-[2vw] text-[6vw] lg:leading-relaxed leading-tight">
              Our team blends design, code, and creativity to craft work that
              isn’t just seen but remembered. We aim to stand as one of the most
              fearless and forward-thinking digital agencies of our time.
            </p>
          </div>
        </div>

        {/* <!-- Image Placeholder --> */}
        {/* <div className="mt-12 w-full h-[80vh] bg-gray-200 rounded-xl overflow-hidden">
          <img src="..." />
        </div> */}
      </div>

      {/* ===== Divider ===== */}
      <div
        ref={divider}
        className="divider mt-[9vh] h-[.2vh] w-full bg-[#F1F1F1] opacity-20 mb-[4vh]"
      ></div>
      
    </div>
  );
};

export default Tagline;
