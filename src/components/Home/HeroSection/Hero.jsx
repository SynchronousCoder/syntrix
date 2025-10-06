import Hometext from "./Hometext";
import Bottomtext from "./Bottomtext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Hero = () => {
  const mainContainer = useRef(null);

  useGSAP(function(){
    let tl = gsap.timeline();
    
    // Simple fade in for hero content
    tl.fromTo(mainContainer.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0, ease: "power2.out" }
    );
    
  }, []);

  return (
    <>
      <div ref={mainContainer} className="relative h-screen w-full bg-[#212121] flex flex-col justify-between overflow-hidden">
        {/* Main Hero Content - exactly like your original structure */}
        <div className="h-full w-full absolute z-[3] bg-[#F1F1F1] lg:px-[6vh] px-[3.5vh] rounded-xl">
          <Hometext />
        </div>

        <div className="relative z-[4] mt-auto">
          <Bottomtext />
        </div>
      </div>
    </>
  );
};

export default Hero;