import { motion } from "motion/react";
import React from "react";

const Hometext = () => {
  return (
    <div className="h-full w-full lg:pt-[20vh] pt-[15vh]">
      <div className=" text-[#212121] font-[font1] uppercase lg:text-[10vw] text-[18vw] leading-[14vw] flex flex-col lg:gap-[1.2vh] lg:leading-none">
        <div className="lg:h-[13vh]  w-fit  flex items-center">
          <h1>NOT JUST WEB.</h1>
        </div>
        <div className="lg:h-[12vh] lg:w-[50vw]  flex items-center">
          <motion.div
            animate={{ width: "12vw", marginRight: "1.5vw" }}
            initial={{ width: "0vw", marginRight: "0vw" }}
            transition={{ ease: [0.76, 0, 0.24, 1], duration: 1, delay: 0.25 }}
            className="lg:h-[11vh] lg:w-[12vw] h-[11vw] w-[14vw] object-cover lg:rounded-2xl rounded-[1vh] overflow-hidden lg:-top-[1.5vw]"
          >
            <img
              src="/img/imgSyntrix.png"
              alt="strip"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <h1 className="lg:mb-[1vw] relative left-0">SYNTRIX</h1>
        </div>
        <div className="lg:h-[13vh]  w-fit  flex items-center relative lg:top-[-1.3vh]">
          <h1>experiences</h1>
        </div>
      </div>
    </div>
  );
};

export default Hometext;
