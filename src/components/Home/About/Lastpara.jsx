import { motion } from "motion/react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Lastpara = ({ btnAnimation }) => {
  const img = useRef(null);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full h-full lg:px-[6vh] px-[2vh] font-[font2] text-[#212121] flex lg:flex-row flex-col justify-between items-center pt-[6vh] pb-[5vh]">
      
      {/* Button / Text */}
      <Link to={"/about"} className="  lg:relative lg:mt-0  lg:scale-100 absolute mt-[37vh] scale-75 " onMouseEnter={() => setIsActive(!isActive)}  onMouseLeave={() => setIsActive(!isActive)}>
        {btnAnimation({ char: "know more", key: 1 })}
      </Link>

      {/* Image */}
      <div className="lg:h-[62vh] lg:w-[48vw] lg:pb-0 pb-[5vh] rounded-2xl overflow-hidden">
        <motion.img
          ref={img}
          className="h-full w-full lg:mt-0 -mt-[4vh]"
          src="https://i.pinimg.com/736x/5e/e8/86/5ee886294bfed20c48cd3a80e9a789a6.jpg"
          alt=""
          animate={{ scale: isActive ? 1.2 : 1 }}   // 🔑 Scale effect
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

    </div>
  );
};

export default Lastpara;