import { motion } from "motion/react";
import React from "react";

const textVariants = {
  hidden: { y: "100%" },
  visible: { y: "0%" },
};

/*
  ROOT CAUSES FIXED:

  MOBILE GAP:
  - Removed pt-[20vh] on the row — was adding 20vh dead space above every pair
  - Removed mb-[45vh] on first card — was the #1 culprit: zero-height mobile container
    + 45vh margin = 45vh void
  - Removed mb-[18.5vh] on second card — same issue, smaller
  - Added explicit aspect-ratio on mobile so the container has real height

  DESKTOP CROP:
  - Removed `absolute min-w-full min-h-full object-cover` image pattern
  - This was center-cropping every screenshot to 65vh — hiding the actual design
  - Now using `w-full h-full object-cover` with the container as the scroll clip
  - Desktop: fixed 65vh container — shows more of the image
  - Mobile: aspect-ratio [16/10] container — full width, proportional height, no crop

  ANIMATIONS: 100% preserved — hover scale/rotate, name letter stagger, all untouched
*/

const ProjectCard = ({
  img1,
  name1,
  img2,
  name2,
  link1,
  link2,
  idx,
  handleHoverEnd,
  handleHover,
  cards,
}) => {
  return (
    <div className="flex lg:flex-row flex-col lg:gap-5 gap-5 w-full text-[#57D4FF]">
      {/* ── Card 1 ── */}
      <motion.div
        onHoverStart={() => handleHover(idx)}
        onHoverEnd={() => handleHoverEnd(idx)}
        className="card relative lg:h-[65vh] lg:w-[47%] w-full"
        style={{ aspectRatio: "16/10" }}
      >
        {/* Title lives here — outside the overflow-hidden layer, free to escape */}
        <h1
          className="
      hidden lg:flex
      absolute z-[20] font-[font1] text-[6vw] tracking-tight leading-none
      left-full -translate-x-1/2 top-1/2 -translate-y-1/2
      pointer-events-none
    "
        >
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

        {/* Inner clip layer — overflow-hidden lives here, only clips the image */}
        <a
          href={link1}
          target="_blank"
          rel="noreferrer"
          className="block h-full w-full rounded-xl overflow-hidden"
        >
          <span className="lg:hidden absolute bottom-3 left-4 z-10 font-[font2] text-[4.5vw] text-white/90 tracking-wide">
            {name1}
          </span>
          <motion.img
            loading="lazy"
            whileHover={{ scale: 0.96, rotate: 1 }}
            initial={{ scale: 1 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            className="w-full h-full object-cover object-top"
            src={img1}
            alt={name1}
          />
        </a>
      </motion.div>

      {/* ── Card 2 ── */}
      <motion.div
        onHoverStart={() => handleHover(idx + 1)}
        onHoverEnd={() => handleHoverEnd(idx + 1)}
        className="card relative lg:h-[65vh] lg:w-[47%] w-full"
        style={{ aspectRatio: "16/10" }}
      >
        <h1
          className="
      hidden lg:flex
      absolute z-[20] font-[font1] text-[6vw] tracking-tight leading-none
      right-full translate-x-1/2 top-1/2 -translate-y-1/2
      pointer-events-none
    "
        >
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

        <a
          href={link2}
          target="_blank"
          rel="noreferrer"
          className="block h-full w-full rounded-xl overflow-hidden"
        >
          <span className="lg:hidden absolute bottom-3 left-4 z-10 font-[font2] text-[4.5vw] text-white/90 tracking-wide  drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {name2}
          </span>
          <motion.img
            loading="lazy"
            whileHover={{ scale: 0.96, rotate: -1 }}
            initial={{ scale: 1 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            className="w-full h-full object-cover object-top"
            src={img2}
            alt={name2}
          />
        </a>
      </motion.div>
    </div>
  );
};

export default React.memo(ProjectCard);