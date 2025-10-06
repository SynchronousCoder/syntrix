// // ===== Loader.jsx - Super fast transition =====
// import React, { useEffect, useRef, useState } from "react";
// import Hometext from "./Hometext";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// const Loader = ({ onComplete }) => {
//   const mainLoader = useRef(null);
//   const loader = useRef(null);
//   const percent = useRef(null);
//   const right = useRef(null);
//   const left = useRef(null);

//   const [count, setcount] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setcount((prevCount) => {
//         if (prevCount >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prevCount + 1;
//       });
//     }, 25);
//     return () => clearInterval(interval);
//   });

//   useGSAP(function () {
//     const tl = gsap.timeline();

//     tl.from(loader.current, {
//       y: 1200,
//       duration: 0.4,
//     });
//     tl.from(right.current, {
//       x: -2000,
//       duration: 0.7,
//     });
//     tl.from(left.current, {
//       x: 1500,
//       duration: 0.7,
//     }, "-=.7");
//     tl.to(loader.current, {
//       scale: 1,
//       delay: 3.5,
//       borderRadius: "0px",
//     });
//     tl.to(percent.current, {
//       opacity: 0,
//     },"-=.2");
//     tl.to(right.current, {
//       opacity: 0,
//     });
//     tl.to(left.current, {
//       opacity: 0,
//     }, "-=.7");
    
//     // Perfect timing - loader disappears exactly when scale reaches 1
//     tl.to(mainLoader.current, {
//       opacity: 0,
//       duration: 0.05, // Super fast fade
//       onComplete: () => {
//         onComplete(); // Instant callback
//       }
//     }, "-=0.1"); // Start slightly before scale animation completes
//   });

//   return (
//     <>
//       <div ref={mainLoader} className="relative h-screen w-full bg-[#212121] overflow-hidden">
//         <div
//           ref={loader}
//           className="loader h-full w-full absolute z-[3] bg-[#F1F1F1] px-[6vh] scale-75 rounded-xl"
//         >
//           <Hometext />

//           <div
//             ref={percent}
//             className="absolute bottom-0 right-[10vh] text-[#212121] font-[font1] flex items-center opacity-100"
//           >
//             <h1 className="text-[10vw]">{count}</h1>
//             <h1 className="font-[font2] font-bold text-[10vw]">%</h1>
//           </div>
//         </div>

//         <div
//           ref={right}
//           className="h-full w-full absolute left-[6vh] z-[2] bg-[#4B4B4B] scale-70 rounded-2xl opacity-60"
//         ></div>
//         <div
//           ref={left}
//           className="h-full w-full absolute left-[13vh] z-[1] bg-[#4B4B4B] scale-65 rounded-3xl opacity-40"
//         ></div>
//       </div>
//     </>
//   );
// };

// export default Loader;  

// ===== Updated Loader.jsx - Triggers Epic Curtain =====
import React, { useEffect, useRef, useState } from "react";
import Hometext from "./Hometext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loader = ({ onComplete }) => {
  const mainLoader = useRef(null);
  const loader = useRef(null);
  const percent = useRef(null);
  const right = useRef(null);
  const left = useRef(null);

  const [count, setcount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setcount((prevCount) => {
        if (prevCount >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevCount + 1;
      });
    }, 25);
    return () => clearInterval(interval);
  });

  useGSAP(function () {
    const tl = gsap.timeline();

    tl.from(loader.current, {
      y: 1200,
      duration: 0.4,
    });
    tl.from(right.current, {
      x: -2000,
      duration: 0.7,
    });
    tl.from(left.current, {
      x: 1500,
      duration: 0.7,
    }, "-=.7");
    tl.to(loader.current, {
      scale: 1,
      delay: 3.5,
      borderRadius: "0px",
    });
    tl.to(percent.current, {
      opacity: 0,
    },"-=.2");
    tl.to(right.current, {
      opacity: 0,
    });
    tl.to(left.current, {
      opacity: 0,
    }, "-=.7");
    
    // Loader completes and stays visible for curtain effect
    tl.to(mainLoader.current, {
      opacity: 1, // Keep loader visible until curtain takes over
      duration: 0.05,
      onComplete: () => {
        // Small delay to ensure smooth handoff to curtain
        setTimeout(() => {
          onComplete(); // Trigger curtain with loader screen content
        }, 50);
      }
    });
    tl.to(mainLoader.current, {
      display: "none",
    });

  });

  return (
    <>
      <div ref={mainLoader} className="relative h-screen w-full bg-[#212121] overflow-hidden z-[9999]">
        <div
          ref={loader}
          className="loader h-full w-full absolute z-[3] bg-[#F1F1F1] px-[6vh] scale-75 rounded-xl"
        >
          <Hometext />

          <div
            ref={percent}
            className="absolute bottom-0 right-[10vh] text-[#212121] font-[font1] flex items-center opacity-100"
          >
            <h1 className="text-[10vw]">{count}</h1>
            <h1 className="font-[font2] font-bold text-[10vw]">%</h1>
          </div>
        </div>

        <div
          ref={right}
          className="h-full w-full absolute left-[6vh] z-[2] bg-[#4B4B4B] scale-70 rounded-2xl opacity-60"
        ></div>
        <div
          ref={left}
          className="h-full w-full absolute left-[13vh] z-[1] bg-[#4B4B4B] scale-65 rounded-3xl opacity-40"
        ></div>
      </div>
    </>
  );
};

export default Loader;