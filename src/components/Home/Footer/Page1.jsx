import React, { useEffect, useState } from "react";
import Eye from "../Eyes/Eye";
import { Link } from "react-router-dom";

const Page1 = ({ btnAnimation }) => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      let deltaX = mouseX - window.innerWidth / 2;
      let deltaY = mouseY - window.innerHeight / 2;

      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="min-h-screen h-fit w-full bg-[#57D4FF] rounded-tl-3xl rounded-tr-3xl text-[#212121]">
        <div className="lg:h-[80vh] w-full flex flex-col justify-center items-center">
          <div className="relative font-[font1] flex flex-col text-center lg:text-[15vw] text-[22vw] lg:leading-[11vw] leading-[19vw] lg:px-0 px-[2vh] lg:mt-0 mt-[7vh]">
            <h1>READY</h1>
            <h1>TO START </h1>
            <h1>THE PROJECT ?</h1>
          </div>
          <div data-scroll data-scroll-speed="1"  className="lg:absolute flex lg:gap-6 gap-4 justify-center items-center lg:scale-[80%] scale-[65%] lg:pb-0 pb-[20vw]">
            <Eye rotate={rotate} />
            <Eye rotate={rotate} />
          </div>
        </div>
        <Link to={"/contact"} className="flex justify-center">
          {btnAnimation({ char: "Start the project", key: 2 })}
        </Link>
      </div>
    </>
  );
};

export default Page1;
