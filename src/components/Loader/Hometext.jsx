import React from "react";

const Hometext = () => {
  return (
    <div className="h-full w-full pt-[20vh]">
      <div className=" text-[#212121] font-[font1] uppercase text-[10vw] flex flex-col gap-[1.2vh] ">
        <div className="h-[13vh] w-fit  flex items-center">
          <h1>NOT JUST WEB.</h1>
        </div>
        <div className="h-[12vh] w-[50vw] flex items-center">
          <div
            className=" h-[11vh] object-cover rounded-2xl overflow-hidden -top-[1.5vw]"
          >

          </div>
          <h1 className="mb-[1vw] relative left-0">SYNTRIX</h1>
        </div>
        <div className="h-[13vh] w-fit  flex items-center relative top-[-1.3vh]">
          <h1>experiences</h1>
        </div>
      </div>
    </div>
  );
};

export default Hometext;