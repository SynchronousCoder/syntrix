import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Tophead = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const words = containerRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.8, // smoother transition
        ease: "power2.out", // soft easing
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        // onComplete: () => onComplete?.()
      }
    );
  },);

  const renderText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[0.4vw]">
        {word}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="lg:px-[6vh] px-[2vh]">
      <h1 className="lg:text-[3vw] text-[7vw] font-[font2] leading-[1.3] flex flex-wrap max-w-[80ch] lg:gap-[0vh] gap-[.2vh]">
        {renderText(
          "We  craft  immersive  websites,  powerful  brand  identities,  and  digital  experiences  that  capture  attention,  drive  engagement,  and  fuel  lasting  growth."
        )}
      </h1>
    </div>
  );
};

export default Tophead;
