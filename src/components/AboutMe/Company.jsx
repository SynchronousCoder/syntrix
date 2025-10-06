import { motion } from "motion/react";
import React, { useRef } from "react";
import Tagline from "./Tagline";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "gsap/all";
import Win from "./Win";
gsap.registerPlugin(ScrollTrigger);

const Company = () => {
  const main = useRef(null);
  const divider = useRef(null);

  useGSAP(function () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: divider.current,
        markers: true,
        start: "top 45%",
        end: "top 30%",
        scrub: 1
      },
    });
    tl.to(main.current, {
      backgroundColor: "#0C0C0C",
      color: "#F1F1F1",
      duration: 1,
      ease: "power2.out",
    });
    tl.to(divider.current, {
      backgroundColor: "#F1F1F1",
      duration: 1,
      ease: "power2.out",
    });
  });

  return (
    <div ref={main} className="min-h-screen w-full bg-[#F1F1F1] text-[#212121]">
      {/* heading */}
      <div className="heading lg:px-[6vh] px-[2vh] lg:text-[10.5vw] lg:leading-[9.5vw] font-[font1] uppercase lg:pt-[18vh] text-[22vw] leading-[20vw] pt-[22vh]">
        <h1>we are</h1>
        <div className=" flex items-center lg:h-[11.5vh]">
          <motion.img
            animate={{ width: "12vw", marginRight: "1.5vw" }}
            initial={{ width: "0vw", marginRight: "0vw" }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 1, delay: 0.25 }}
            className="lg:h-[11.7vh] h-[7.7vh] lg:mt-0 -mt-[1.2vh] object-cover lg:rounded-2xl rounded-xl"
            src="../public/img/imgSyntrix.png"
            alt=""
          />
          <h1 className="lg:text-[10.7vw] text-[22vw] -mt-4">syntrix</h1>
        </div>
      </div>
      {/* Divider */}
      <div
        ref={divider}
        className="divider mt-[17vh] h-[.2vh] w-full bg-[#212121] opacity-20 mb-[4vh]"
      ></div>

      <Tagline />

      <Win />
    </div>
  );
};

export default Company;
