import { motion } from "motion/react";
import React from "react";

const textVariants = {
  hidden: { y: "100%" },
  visible: { y: "0%" },
};

const ProjectCard = ({ img1, name1, img2, name2, link1, link2,  idx, handleHoverEnd, handleHover, cards }) => {
  return (
    <div className="flex lg:flex-row flex-col lg:gap-5 lg:pt-0 pt-[20vh] w-full text-[#57D4FF]">
      {/* First Card */}
      <motion.div
        onHoverStart={() => handleHover(idx)}
        onHoverEnd={() => handleHoverEnd(idx)}
        className="card relative lg:h-[65vh] lg:w-[45vw] lg:mb-0 mb-[45vh]"
      >
        <a href={link1} className="h-full w-full rounded-xl overflow-hidden">
          <h1 className="absolute z-[1] flex font-[font1] text-[6vw] tracking-tight leading-none left-full -translate-x-1/2 top-1/2 -translate-y-1/2">
            {name1.split("").map((item, index) => (
              <span className="overflow-hidden inline-block" key={index}>
                <motion.span
                  variants={textVariants}
                  initial="hidden"
                  animate={cards[idx]}
                  transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                  className="inline-block"
                >
                  {item}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.img
            loading="lazy"
            whileHover={{ scale: 0.9, rotate: 1 }}
            initial={{ scale: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="absolute rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
            src={img1}
            alt={name1}
          />
        </a>
      </motion.div>

      {/* Second Card */}
      <motion.div
        onHoverStart={() => handleHover(idx + 1)}
        onHoverEnd={() => handleHoverEnd(idx + 1)}
        className="card relative lg:h-[65vh] lg:w-[45vw] lg:mb-0 mb-[18.5vh]"
      >
        <a href={link2} className="h-full w-full rounded-xl overflow-hidden">
          <h1 className="absolute z-[1] flex font-[font1] text-[6vw] tracking-tight leading-none right-full translate-x-1/2 top-1/2 -translate-y-1/2">
            {name2.split("").map((item, index) => (
              <span className="overflow-hidden inline-block" key={index}>
                <motion.span
                  variants={textVariants}
                  initial="hidden"
                  animate={cards[idx + 1]}
                  transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                  className="inline-block"
                >
                  {item}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.img
            loading="lazy"
            whileHover={{ scale: 0.9, rotate: -1 }}
            initial={{ scale: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="absolute rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
            src={img2}
            alt={name2}
          />
        </a>
      </motion.div>
    </div>
  );
};

export default React.memo(ProjectCard);
