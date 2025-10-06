import React from "react";
import { useAnimation } from "motion/react";
import ProjectCard from "../../components/Home/Projects/ProjectCard";
import { link } from "motion/react-client";

const Featured = () => {
  const data = [
    {
      name1: "Project1",
      img1: "https://ochi.design/wp-content/uploads/2025/02/Salience_Website_cover-1326x1101.png",
      link1: "https://www.google.com/",
      name2: "Project2",
      img2: "https://ochi.design/wp-content/uploads/2025/02/Salience_Website_cover-1326x1101.png",
      link2: "https://www.facebook.com/"
    },
    {
      name1: "Project3",
      img1: "https://ochi.design/wp-content/uploads/2025/02/Salience_Website_cover-1326x1101.png",
      link1: "https://www.godaddy.com/en-in",
      name2: "Project4",
      img2: "https://ochi.design/wp-content/uploads/2025/02/Salience_Website_cover-1326x1101.png",
      link2: "https://www.instagram.com/",
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