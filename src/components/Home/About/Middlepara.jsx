import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { div } from "motion/react-client";
import React, { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const Middlepara = ({ btnAnimation }) => {
  const container = useRef(null);

  useGSAP(function () {
    gsap.from(".content div", {
      opacity: 0,
      delay: 1,
      duration: 1,
      stagger: .1,
      scrollTrigger:{
        trigger: container.current,
        end: "top 80%",
      }
    });
  });

  return (
    <div
      ref={container}
      className="content h-full w-full flex lg:flex-row flex-col justify-between lg:px-[6vh] px-[2vh] py-[3vh] font-[font2]"
    >
      <div className="lg:text-[1.5vw] text-[5.5vw] lg:mb-0 mb-[5.5vh]">What sets us apart:</div>

      <div className="lg:w-[25vw] w-full flex flex-col lg:gap-4 gap-6 lg:text-[1.2vw] text-[4.5vw] lg:mb-0 mb-[5.5vh]">
        <h1>
          {" "}
          At Syntrix, your growth is our biggest priority. We don’t just design
          websites — we craft digital experiences that amplify trust, strengthen
          brand authority, and drive measurable impact.
        </h1>
        <h1>
          Every detail matters — from design choices to user interactions — and
          we build each element with precision to help your business stand out
          today while also creating a strong foundation for tomorrow.
        </h1>
        <h1>
          We’re not just another agency; we’re your digital partner. Our mission
          is simple — to create experiences that build trust, spark engagement,
          and turn visitors into loyal customers.
        </h1>
      </div>

      <div className="">
        <h2 className="lg:text-[1.4vw] text-[4.5vw] lg:mb-0 mb-[4vh]">Social: </h2>
        <h3 className="lg:text-[1.2vw] text-[4vw] underline">
          <a href="">Youtube</a>
        </h3>
        <h3 className="lg:text-[1.2vw] text-[4vw] underline">
          <a href="">Instagram</a>
        </h3>
        <h3 className="lg:text-[1.2vw] text-[4vw] underline">
          <a href="">LinkedIn</a>
        </h3>
      </div>
    </div>
  );
};

export default Middlepara;
