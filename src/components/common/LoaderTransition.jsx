import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Eye from "../../components/Home/Eyes/Eye";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Hometext from "../Loader/Hometext";

const LoaderTransition = ({ children, onComplete }) => {
  // Loader refs
  const mainLoader = useRef(null);
  const loader = useRef(null);
  const percent = useRef(null);
  const right = useRef(null);
  const left = useRef(null);

  // Transition refs
  const transitionRef = useRef(null);
  const pageRef = useRef(null);

  // States
const { pathname } = useLocation();
  const [count, setCount] = useState(0);
  const [hasLoaderRun, setHasLoaderRun] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [initialPathname, setInitialPathname] = useState(pathname);
  const [rotate, setRotate] = useState(0);

  // Check if loader has run before (using sessionStorage to persist during session)
  useEffect(() => {
    const loaderCompleted = sessionStorage.getItem('loaderCompleted');
    if (loaderCompleted) {
      setHasLoaderRun(true);
      setIsFirstLoad(false); // Not first load if loader already completed
    }
  }, []);

  // Counter for loader percentage
  useEffect(() => {
    if (!hasLoaderRun) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevCount + 1;
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [hasLoaderRun]);

  // Eye rotation for transitions
  useEffect(() => {
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - window.innerWidth / 2;
      const deltaY = e.clientY - window.innerHeight / 2;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main animation logic
  useGSAP(() => {
    if (!hasLoaderRun) {
      // First time visit - run loader animation
      runLoaderAnimation();
    } else if (!isFirstLoad && pathname !== initialPathname) {
      // Only run transition if pathname actually changed from initial
      runTransitionAnimation();
    }
  }, [pathname, hasLoaderRun, isFirstLoad]);

  const runLoaderAnimation = () => {
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
    }, "-=.2");
    tl.to(right.current, {
      opacity: 0,
    });
    tl.to(left.current, {
      opacity: 0,
    }, "-=.7");
    
    tl.to(mainLoader.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // Mark loader as completed
        setHasLoaderRun(true);
        sessionStorage.setItem('loaderCompleted', 'true');
        
        // Hide loader completely
        gsap.set(mainLoader.current, { display: "none" });
        
        // After loader completes, mark first load as done
        setTimeout(() => {
          setIsFirstLoad(false);
        }, 100);
        
        // Callback to parent if needed
        if (onComplete) {
          onComplete();
        }
      }
    });
  };

  const runTransitionAnimation = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    // Show transition overlay
    tl.set(transitionRef.current, { display: "block" });

    // Slide in overlay
    tl.fromTo(
      transitionRef.current,
      { y: "100%" },
      { y: "0%", duration: 1.2 }
    );

    // Slide out overlay
    tl.to(transitionRef.current, { y: "-100%", duration: 1, delay: 0.7 });

    // Hide transition overlay
    tl.set(transitionRef.current, { display: "none" });

    // Fade/scale page content
    tl.from(
      pageRef.current,
      { opacity: 0, scale: 1.05, duration: 1.2 },
      "-=0.5"
    );
  };

  return (
    <>
      {/* Loader - only shows on first visit */}
      {!hasLoaderRun && (
        <div ref={mainLoader} className="fixed top-0 left-0 h-screen w-full bg-[#212121] overflow-hidden z-[9999]">
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
      )}

      {/* Transition overlay - shows on route changes after loader has run */}
      {hasLoaderRun && (
        <div
          ref={transitionRef}
          className="fixed top-0 left-0 h-screen w-full bg-[#212121] z-[500] overflow-hidden"
          style={{ display: "none" }}
        >
          <div className="absolute flex gap-2 scale-50 bottom-4 right-4">
            <Eye rotate={rotate} />
            <Eye rotate={rotate} />
          </div>
        </div>
      )}

      {/* Page content */}
      <div ref={pageRef} key={pathname}>
        {children}
      </div>
    </>
  );
};

export default LoaderTransition;