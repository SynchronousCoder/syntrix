import React from "react";
import Marquee from "../../components/Home/Marquee/Marque";
import About from "../../components/Home/About/About";
import Eyes from "../../components/Home/Eyes/Eyes";
import Featured from "../Featured/Featured";
import Footer from "../../components/Home/Footer/Footer";
import Hero from "../../components/Home/HeroSection/Hero";


const Home = () => {
  const btnAnimation = ({ char }) => {
    return (
      <div className="mainBtn border-[1.3px] border-[#212121] rounded-full px-5 py-1 h-fit w-fit overflow-hidden relative group cursor-pointer">
        {/* Sunrise background now applied to whole mainBtn */}
        <span
          className="absolute inset-0 bg-black 
                   [clip-path:circle(0%_at_50%_100%)] 
                   group-hover:[clip-path:circle(150%_at_50%_100%)] 
                   transition-all duration-700 ease-out 
                   z-0"
        ></span>

        <div className="btn flex items-center relative z-10">
          {/* Text */}
          <div className="px-5 py-1 font-[font2] text-sm uppercase">
            <span className="transition-colors duration-500 text-white group-hover:text-white">
              {char}
            </span>
          </div>

          {/* Icon button with dot → icon animation */}
          <div className="relative h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
            {/* white dot initially */}
            <span
              className="absolute w-2 h-2 rounded-full bg-white 
                       transition-transform duration-500 ease-out 
                       group-hover:scale-0 z-10"
            ></span>

            {/* Icon appears on hover */}
            <i className="ri-arrow-right-up-line text-xl font-light text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 relative z-10"></i>

            {/* black scale background */}
            <span
              className="absolute inset-0 bg-black scale-0 group-hover:scale-100 
                       transition-transform duration-500 ease-out 
                       rounded-full origin-center z-0"
            ></span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>      
      <Hero />
      <Marquee />
      <About btnAnimation={btnAnimation} />
      <Eyes />
      <Featured />
      <Footer btnAnimation={btnAnimation} />
    </div>
  );
};

export default Home;
