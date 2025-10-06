import React from "react";

const Eye = ({ rotate }) => {
  return (
    <div className="lg:h-[28vh] lg:w-[14vw] h-[25vh] w-[35vw] rounded-[60%/70%] flex justify-center items-center bg-[#F4F4F4]">
      <div className="lg:w-[7vw] lg:h-[14vh] h-[18vh] w-[22vw] rounded-[60%/70%] relative bg-zinc-900">
        <div
          style={{ transform: `rotate(${rotate}deg)` }}
          className="absolute w-full h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="lg:w-10 lg:h-10 h-10 w-10 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Eye;
