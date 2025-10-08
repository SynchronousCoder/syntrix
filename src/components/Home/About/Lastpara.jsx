import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Lastpara = ({ btnAnimation }) => {
  const img = useRef(null);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full h-full lg:px-[6vh] px-[2vh] font-[font2] text-[#212121] flex lg:flex-row flex-col justify-between items-center pt-[6vh] pb-[5vh]">
      
      {/* Button / Text */}
      <Link 
        to={"/about"} 
        className="lg:relative lg:mt-0 lg:scale-100 absolute mt-[32vh] scale-75" 
        onMouseEnter={() => setIsActive(true)}  
        onMouseLeave={() => setIsActive(false)}
      >
        {btnAnimation({ char: "know more", key: 1 })}
      </Link>

      {/* Image */}
      <div className="lg:h-[62vh] lg:w-[48vw] lg:pb-0 pb-[5vh] lg:rounded-2xl rounded-4xl overflow-hidden">
        <motion.img
          ref={img}
          className="h-full w-full lg:mt-0 -mt-[4vh] object-cover"
          src="/img/aboutus.png"  // ✅ CORRECTED PATH
          alt="About Us"
          animate={{ scale: isActive ? 1.2 : 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

    </div>
  );
};

export default Lastpara;