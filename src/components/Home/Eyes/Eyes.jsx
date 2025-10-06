import React, { useEffect, useState } from "react";
import Eye from "./Eye";

  
const Eyes = () => {

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
    <div className="h-screen w-full overflow-hidden rounded-tl-3xl rounded-tr-3xl text-black">
      <div data-scroll data-scroll-speed="-.7" className='relative w-full h-full bg-cover bg-center bg-[url(./public/img/bannerOP.png)]'>
        <div className="absolute flex lg:gap-10  gap-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <Eye rotate={rotate} />
          <Eye rotate={rotate} />
        </div>
      </div>
    </div>
  );
};

export default Eyes;

