import React from "react";
import { Link } from "react-router-dom";

const Bottomtext = () => {
  return (
    <div className="lg:mt-[72vh] -mt-[40vh]">
      <div className="h-[.2vh] w-full bg-[#B2B2B2] opacity-60"></div>

      <div className="flex lg:flex-row flex-col justify-between lg:items-center lg:px-[6vh] px-[2vh] lg:mt-4 mt-[4vh]">
        {[
          "Web design & motion-first agency",
          "For startups, creators, and bold brands",
        ].map((item, index) => {
          return (
            <div key={index} className="font-[font2] font-medium lg:text-[1.4vw] text-[4.5vw] lg:mb-0 mb-[5vh]">
              {item}
            </div>
          );
        })}
        {/* Group parent */}
        <Link
          to={"/contact"}
          className="btn flex items-center gap-2 group cursor-pointer relative"
        >
          {/* Text button with sunrise effect */}
          <div className="relative px-5 py-1 rounded-full font-[font2] text-sm uppercase border-[1.3px] border-[#212121] overflow-hidden">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
              start a project
            </span>

            {/* sunrise bg */}
            <span
              className="absolute inset-0 bg-black 
                         [clip-path:circle(0%_at_50%_100%)] 
                         group-hover:[clip-path:circle(150%_at_50%_100%)] 
                         transition-all duration-700 ease-out
                         z-0"
            ></span>
          </div>

          {/* Icon button with scale effect */}
          <div className="lg:opacity-100 opacity-0  relative h-8 w-8 rounded-full border border-[#212121] flex items-center justify-center overflow-hidden">
            <i className="ri-arrow-right-up-line text-xl font-light relative z-10 transition-colors duration-300 group-hover:text-white"></i>

            {/* simple scale bg */}
            <span
              className="absolute inset-0 bg-black scale-0 group-hover:scale-100 
                         transition-transform duration-500 ease-out 
                         rounded-full origin-center z-0"
            ></span>
          </div>
        </Link>
      </div>

      <div className="relative h-10 w-24 flex justify-center items-center mx-auto lg:mt-20 lg:scale-100 mt-[4.2vh] scale-80 group cursor-pointer overflow-hidden">
        <div className="relative h-6 w-full text-zinc-400 opacity-80 flex justify-center items-center overflow-hidden">
          <h1 className="scrollDown absolute">Scroll Down</h1>
        </div>
      </div>
    </div>
  );
};

export default Bottomtext;
