import React from "react";
import { useAnimation } from "motion/react";
import ProjectCard from "../../components/Home/Projects/ProjectCard";

const Featured = () => {
  const data = [
    {
      name1: "Nayora",
      img1: "https://ik.imagekit.io/m9zi40oov/compress%20img/nayora.png",
      link1: "https://www.nayorajewels.com/",
      name2: "K72",
      img2: "https://ik.imagekit.io/m9zi40oov/compress%20img/k72.png",
      link2: "https://reconnect-x-zeta.vercel.app/",
    },
    {
      name1: "Coder's Cup",
      img1: "https://ik.imagekit.io/m9zi40oov/compress%20img/coder.png",
      link1: "https://synchronouscoder.github.io/Coder-s-Cup/",
      name2: "ReconnectX",
      img2: "https://ik.imagekit.io/m9zi40oov/compress%20img/alumini.png",
      link2: "https://reconnect-x-zeta.vercel.app/",
    },
  ];

  // useAnimation calls must be at top level — one per card slot
  const c0 = useAnimation();
  const c1 = useAnimation();
  const c2 = useAnimation();
  const c3 = useAnimation();
  const cards = [c0, c1, c2, c3];

  const handleHover = (index) => cards[index].start("visible");
  const handleHoverEnd = (index) => cards[index].start("hidden");

  return (
    /*
      REMOVED: min-h-[200vh]
      This was forcing the section to be at least 200vh tall regardless of content,
      creating a massive void below the cards on every device.
      Let height be determined by content naturally.
    */
    <div className="w-full bg-[#F1F1F1] lg:px-[6vh] px-[4vw] pt-[10vh] pb-[10vh]">
      <h1
        id="ourwork"
        className="font-[font2] lg:text-[4vw] text-[10vw] text-[#212121] lg:mb-12 mb-8"
      >
        Featured projects
      </h1>

      <div className="flex flex-col lg:gap-6 gap-5">
        {data.map((elem, index) => (
          <ProjectCard
            key={index}
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
        ))}
      </div>
    </div>
  );
};

export default Featured;