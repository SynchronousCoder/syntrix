import React from "react";

const Win = () => {
  return (
    <div className="w-full text-white">
      <div className="flex flex-col md:flex-row gap-6 mt-[10vh] px-4 sm:px-6 lg:px-[6vh]">

        {/* Card 1 */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          {/* Image Container — title overlaid at bottom via flex */}
          <div className="relative w-full overflow-hidden rounded-2xl">
            <img
              src="/img/engage.png"
              alt="Engaging Experiences"
              className="w-full h-[40vw] min-h-[220px] max-h-[420px] object-cover opacity-75"
            />
            {/* Gradient overlay so text is always readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Title pinned to bottom of image */}
            <h1 className="absolute bottom-4 left-4 right-4 font-[font1] text-[6vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.8vw] font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse leading-tight">
              Engaging Experiences
            </h1>
          </div>
          {/* Description — always below image, never overlapping */}
          <p className="font-[font2] text-[4vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.25vw] opacity-60 text-center leading-relaxed px-2">
            At Syntrix, we create digital experiences that truly engage users.
            Every click, scroll, and motion is designed to keep people connected
            with your brand while delivering real value.
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <div className="relative w-full overflow-hidden rounded-2xl">
            <img
              src="/img/design.png"
              alt="Performing Design"
              className="w-full h-[40vw] min-h-[220px] max-h-[420px] object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <h1 className="absolute bottom-4 left-4 right-4 font-[font1] text-[6vw] sm:text-[4vw] md:text-[3vw] lg:text-[2.8vw] font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse leading-tight">
              Performing Design
            </h1>
          </div>
          <p className="font-[font2] text-[4vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.25vw] opacity-60 text-center leading-relaxed px-2">
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