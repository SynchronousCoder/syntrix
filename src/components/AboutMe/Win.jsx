import React from "react";

const Win = () => {
  return (
    <div className="lg:min-h-[60vh] min-h-[150vh] w-full text-white">
      {/* Principles Section */}
      <div className="flex flex-col md:flex-row gap-10 mt-[10vh] px-[6vh]">
        {/* Card 1 */}
        <div className="relative w-full flex lg:flex-row flex-col items-center justify-center lg:md:w-1/2">
          <img
            src="/img/engage.png"  // ✅ CORRECTED PATH
            alt="Engaging Experiences"
            className="lg:w-full lg:h-[50vh] object-cover rounded-2xl opacity-75" // reduced opacity
          />
          <h1
            className="absolute lg:-bottom-[1vw] font-[font1] lg:text-[5vw] bottom-[22vh] text-[11vw] font-bold text-white 
        drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse"
          >
            Engaging Experiences
          </h1>
          <p className="lg:text-[1.25vw] text-[4.25vw] font-[font2] text-base opacity-60 text-center lg:w-[80%] w-[90%]">
            At Syntrix, we create digital experiences that truly engage users.
            Every click, scroll, and motion is designed to keep people connected
            with your brand while delivering real value.
          </p>
        </div>

        {/* Card 2 */}
        <div className="relative w-full flex lg:flex-row flex-col items-center justify-center md:w-1/2">
          <img
            src="/img/design.png"  // ✅ CORRECTED PATH
            alt="Performing Design"
            className="lg:w-full lg:h-[50vh] object-cover rounded-2xl opacity-75" // reduced opacity
          />
          <h1
            className="absolute lg:-bottom-[1vw] font-[font1] lg:text-[5vw] bottom-[14vh] text-[11vw] font-bold text-white 
        drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse"
          >
            Performing Design
          </h1>
          <p className="lg:text-[1.25vw] text-[4.25vw] font-[font2] text-base opacity-60 text-center lg:w-[80%] w-[90%] lg:mt-[0vh] mt-[5vh]">
            Our designs don't just look good—they work hard. We blend creativity
            with performance to craft websites that are beautiful, fast, and
            results-driven.
          </p>
        </div>
      </div>



      </div>
  );
};

export default Win;