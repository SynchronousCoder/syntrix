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
        stagger: 0.025,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
        },
      }
    );
  }, []);

  const renderText = (text) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block mr-[0.35em] last:mr-0">
        {word}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="lg:px-[6vh] px-[4vw] pt-[1vh]">
      <h2
        className="
          font-[font2] leading-[1.35]
          text-[clamp(1.5rem,4.5vw,3vw)]
          max-w-[34ch]
          flex flex-wrap
          gap-y-[0em]
          text-black/90
        "
      >
        {renderText(
          "We craft immersive websites, powerful brand identities, and digital experiences that capture attention, drive engagement, and fuel lasting growth."
        )}
      </h2>
    </div>
  );
};

export default Tophead;