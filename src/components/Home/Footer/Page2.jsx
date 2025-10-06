import React from "react";

const Page2 = () => {
  return (
    <div className=" fixed bottom-0 left-0 z-[-1] h-screen w-full bg-[#F1F1F1] overflow-hidden">
      <div className="relative main h-[100%] w-full flex justify-center items-center">
        <div className="hero1 z-[-1] absolute lg:h-[25vw] lg:w-[25vw] h-[25vh] w-[25vh] bg-[#02D1F5] rounded-full"></div>
        <div className="hero2 z-[-1] absolute lg:h-[25vw] lg:w-[25vw] h-[25vh] w-[25vh] bg-[#02D1F5] rounded-full"></div>

        {/* ========== Text Layer ========== */}

        <div className="absolute w-full lg:top-[12vh] top-[6vh] flex justify-between lg:px-[10vh] px-[2vh] lg:text-[1.25vw]">
          {/* ========== Left Nav ========== */}
          <div className="lg:left-[5vw] flex flex-col  font-normal text-black  font-[font2]">
            <h1 className="lg:text-[1.5vw] font-semibold">M:</h1>
            {["Home", "Services", "About us", "Contact us"].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <span>{item}</span>
                <div className="h-[2px] w-0 bg-black transition-all duration-300 origin-left group-hover:w-full"></div>
              </div>
            ))}
          </div>

          {/* ========== Right Nav ========== */}
          <div className="lg:right-[5vw] flex flex-col items-start  text-black max-w-[20vw]">
            <h1 className="lg:text-[1.5vw] font-semibold">S:</h1>
            {["Instagram", "Twitter", "Linkedin"].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <span>{item}</span>
                <div className="h-[2px] w-0 bg-black transition-all duration-300 origin-left group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Big Brand Name Center (Outline Text) */}
        <h1 className="absolute lg:text-[18vw] text-[35.5vw] lg:font-extrabold  font-normal font-[font1] uppercase lg:leading-[15vw] z-10 text-transparent lg:syntrix-outline syntrix-outline1">
          Syntrix
        </h1>

        {/* Bottom Section */}
        <div className="absolute lg:bottom-[3vh] bottom-[2vh] font-[font2] left-0 w-full flex lg:flex-row flex-col justify-between items-center px-[5vw] lg:text-[1.1vw] text-black border-t border-black pt-[2vh]">
          <span>Copyright © syntrix design</span>
          <span>India, New Delhi</span>
          <span className="lg:text-[1.1vw] text-[3.5vw]">Website by Aryan Tyagi</span>
        </div>
      </div>
    </div>
  );
};

export default Page2;
