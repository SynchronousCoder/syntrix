import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, line, idx }) => {
  const card = useRef(null);

  useGSAP(() => {
    const direction = idx % 2 === 0 ? -1000 : 1000; // even: right, odd: left
    const rowDelay = idx < 2 ? 0 : 0.5; // first row: no delay, second row: delayed

    gsap.from(card.current, {
      x: direction,
      opacity: 0,
      duration: 1,
      delay: rowDelay,
      ease: "power3.out",
      transformPerspective: 800, // 👈 depth ka feel
      rotationY: direction > 0 ? 15 : -15, // 👈 thoda sa twist based on direction
      scrollTrigger: {
        trigger: card.current,
        start: "top 70%",
        end: "top 45%",
        scrub: 2,
        // markers: true,
      },
    });
  }, [idx]);

  return (
    <div
      ref={card}
      className="relative lg:min-h-[40vh] lg:w-[32vw] min-h-[35vh] w-[90%] overflow-hidden rounded-[6rem]"
    >
      {/* Glow Border Layer */}
      <div
        className="absolute inset-0 border-[.7vh] border-transparent blommBorder"
        style={{
          borderImage:
            "url('https://ik.imagekit.io/sheryians/Aptitude%20&%20Reasoning/bloomMask%20Large_lvwFbM14_l.png') 30 round",
        }}
      ></div>

      {/* Main Border Layer */}
      <div
        className="absolute inset-0 border-[.7vh] border-transparent flex flex-col justify-start items-center px-[2vh] py-[4vh]"
        style={{
          borderImage:
            "url('https://ik.imagekit.io/sheryians/Aptitude%20&%20Reasoning/bloomMask%20Large_lvwFbM14_l.png') 30 round",
          borderRadius: "10vh",
        }}
      >
        <div
          className="bg-[url('https://ik.imagekit.io/sheryians/Aptitude%20&%20Reasoning/bloomMask%20Large_lvwFbM14_l.png')] bg-cover bg-center
          bg-clip-text text-transparent text-center"
        >
          <h1 className="font-[font1] lg:text-[6vw] text-[10vw] lg:mb-[2vw] mb-[2.4vw] mt-[1vw] uppercase lg:leading-[5.5vw] leading-[9.5vw]">
            {title}
          </h1>
          <h3 className="text-center font-[font2] lg:font-semibold font-normal">{line}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
