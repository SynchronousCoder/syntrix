import React from "react";
import { motion } from "framer-motion";

const Marquee = () => {
  return (
    <div className="w-full lg:h-[60vh] h-[35vh] lg:py-[6vw] py-[8vh] rounded-tl-3xl rounded-tr-3xl bg-[#00274D]">
      <div className="text border-t-2 border-b-2 border-zinc-300 flex overflow-hidden">
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="lg:text-[27vw] -mb-[2vw] -mt-[5vw] font-[font1] text-[37.5vw] font-semibold text-white whitespace-nowrap uppercase leading-none pr-[5.5vw]"
        >
          we are syntrix
        </motion.h1>
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="lg:text-[27vw] -mb-[2vw] -mt-[5vw] font-[font1] text-[37.5vw] font-semibold text-white whitespace-nowrap uppercase leading-none pr-[5.5vw]"
        >
          we are syntrix
        </motion.h1>
      </div>
    </div>
  );
};

export default Marquee;