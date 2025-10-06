import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Card from "./Cards";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const Serve = ({ btnAnimation }) => {
  const mainPage = useRef(null);
  const changeColor = useRef(null);
  const heading = useRef(null);
  const sub = useRef(null);
  const subtext = useRef(null);

  const content = [
    {
      title: "Web Design",
      line: "Pixel-perfect layouts that balance creativity and clarity. We craft designs that not only look stunning but also drive results",
    },
    {
      title: "UI/UX Strategy",
      line: "Human-first interfaces with smooth journeys. From wireframes to prototypes, every click feels effortless",
    },
    {
      title: "Web Dev",
      line: "Fast, responsive, and scalable websites powered by clean code. Built to perform across every screen and platform",
    },
    {
      title: "Digital Storytelling",
      line: "Immersive motion and interactive design that breathe life into your brand and keep users engaged",
    },
  ];

  //Changing color of the page
  useGSAP(function () {
    gsap.to(mainPage.current, {
      backgroundColor: "#0C0C0C",
      color: "#fff",
      ease: "power2.out",
      scrollTrigger: {
        trigger: changeColor.current,
        // markers: true,
        start: "top 40%",
        end: "top 30%",
        scrub: 1,
      },
    });
  });

  //heading+subheading
  useGSAP(function () {
    const tl = gsap.timeline();
    tl.from(heading.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrub: true,
      delay: 2.5,
    });
    tl.from(sub.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrub: true,
    });
  });

  //Getoutshined
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: changeColor.current,
        start: "top 55%", // when element enters viewport
        end: "top 40%", // when element scrolls past top
        // markers: true, // for debugging
      },
    });

    tl.fromTo(
      changeColor.current,
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
  });

  //getOutshined description
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: subtext.current,
        start: "-100% 55%", // when element enters viewport
        end: "-100% 40%", // when element scrolls past top
        scrub: true, // smooth scroll-linked animation
        // markers: true, // for debugging
      },
    });

    tl.fromTo(
      subtext.current,
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
  });

  return (
    <div
      ref={mainPage}
      className="min-h-[260vh] w-full bg-[#F1F1F1] text-[#212121] overflow-x-hidden"
    >
      {/* Heading */}
      <div className="pt-[13vh] lg:px-[6vh] px-[2vh] overflow-hidden">
        <h1 ref={heading} className="font-[font1] lg:text-[9.2vw] text-[14.5vw] uppercase">
          Services That Scale
        </h1>
      </div>

      {/* Divider */}
      <div className="divider mt-[5vh] h-[.2vh] w-full bg-[#212121] opacity-20 mb-[4vh]"></div>

      {/* Intro text */}
      <div className="lg:px-[6vh] lg:w-[85vw] px-[2vh] overflow-hidden">
        <p ref={sub} className="font-[font2] lg:text-[3.5vw] text-[8.5vw] lg:leading-[3vw] leading-[8.5vw]">
          We design & build digital experiences with motion-first design, clean
          code, and bold creativity.
        </p>
      </div>

      {/* Divider */}
      <div className="mt-[5vh] h-[.2vh] w-full bg-[#212121] opacity-20 lg:mb-[4vh] -mb-[10vh]"></div>

      {/* Scroll Trigger Text */}
      <div
        ref={changeColor}
        className=" w-full h-[40vh] flex justify-center items-center"
      >
        <h1
          className="z-[2]  absolute lg:text-[8.4vw] text-[10.5vw] text-center font-extrabold bg-[url('https://ik.imagekit.io/sheryians/Aptitude%20&%20Reasoning/bloomMask%20Large_lvwFbM14_l.png')] bg-cover bg-center
        bg-clip-text text-transparent"
        >
          GET OUTSHINED
        </h1>
        <h1
          className="bloom absolute lg:text-[8.4vw] text-[10.5vw] text-center font-extrabold bg-[url('https://ik.imagekit.io/sheryians/Aptitude%20&%20Reasoning/bloomMask%20Large_lvwFbM14_l.png')] bg-cover bg-center
        bg-clip-text text-transparent"
        >
          GET OUTSHINED
        </h1>
      </div>

      {/* Subtext */}
      <div
        ref={subtext}
        className="h-[6vh] w-full relative flex items-center justify-center lg:-top-[13vh] -top-[17vh] lg:mb-0 mb-[7vh]"
      >
        <p className="font-[font2] lg:w-[45vw]  capitalize lg:text-[2.7vw] text-[4.2vw] text-center">
          Because ordinary isn’t our language
        </p>
      </div>

      {/* Cards Section */}
      <div className="Midserve relative w-full h-[120vh] flex items-center justify-center">
        <div className="flex lg:flex-row flex-col flex-wrap justify-center items-center gap-[10vw] w-[80%] [transform-style:preserve-3d] [perspective:1000px]">
          {content.map((item, index) => (
            <Card key={index} title={item.title} line={item.line} idx={index} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Serve;
