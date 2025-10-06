import React from "react";
import { useAnimation } from "motion/react";
import ProjectCard from "../../components/Home/Projects/ProjectCard";
import { link } from "motion/react-client";

const Featured = () => {
  const data = [
    {
      name1: "K72",
      img1: "./public/project/prjk.png",
      link1: "https://k72-8ed3.onrender.com",
      name2: "ReconnectX",
      img2: "./public/project/prjx.png",
      link2: "https://reconnect-x-zeta.vercel.app/"
    },
    {
      name1: "Finance",
      img1: "./public/project/prj2.png",
      link1: "https://knowyourfd.vercel.app/",
      name2: "Skills4Good",
      img2: "./public/project/prjaar2.png",
      link2: "https://skills4good.vercel.app/",
    },
  ];

  // Create controllers directly (2 per project)
  const cards = [];
  for (let i = 0; i < data.length * 2; i++) {
    cards.push(useAnimation());
  }

  const handleHover = (index) => {
    cards[index].start("visible");
  };

  const handleHoverEnd = (index) => {
    cards[index].start("hidden");
  };

  return (
    <div className="min-h-[200vh] w-full bg-[#F1F1F1] lg:px-[6vh] px-[4vh] py-[12vh]">
      <h1 id="ourwork" className="font-[font2] lg:text-[4vw] text-[10vw] text-[#212121] lg:mb-12 mb-10 lg:mt-0 -mt-[10vh]">
        Featured projects
      </h1>

      <div className="projects-container flex flex-col gap-12">
        {data.map((elem, index) => (
          <div key={index} className="cards flex gap-5 w-full">
            <ProjectCard
              idx={index * 2}
              img1={elem.img1}
              name1={elem.name1}
              img2={elem.img2}
              name2={elem.name2}
              link1={elem.link1}
              link2={elem.link2}
              handleHover={handleHover}
              handleHoverEnd={handleHoverEnd}
              cards={cards}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;