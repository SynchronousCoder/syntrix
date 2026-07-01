import Hometext from "./Hometext";
import Bottomtext from "./Bottomtext";
import FloatingPreview from "./FloatingPreview";
import FluidCanvas from "./FluidCanvas";   // ← ADD
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Hero = () => {
  const mainContainer = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      mainContainer.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" },
    );
  }, []);

  return (
    <div
      ref={mainContainer}
      className="relative h-screen w-full bg-[#212121] flex flex-col justify-between overflow-hidden"
    >
      <div className="h-full w-full absolute z-[3] bg-transparent lg:px-[6vh] px-[3.5vh] rounded-xl overflow-hidden">
        <FluidCanvas />   {/* ← ADD — z-0, canvas fills card */}
        <div className="relative z-[1]">
          <Hometext />
          <FloatingPreview />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-[2] lg:px-0 px-0">
          <Bottomtext />
        </div>
      </div>
    </div>
  );
};

export default Hero;