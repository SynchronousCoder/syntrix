import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [hasLoaderRun, setHasLoaderRun] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [initialPathname, setInitialPathname] = useState(pathname);
  const [rotate, setRotate] = useState(0);

  // Check if loader has run before (using sessionStorage to persist during session)
  useEffect(() => {
    const loaderCompleted = sessionStorage.getItem("loaderCompleted");
    if (loaderCompleted) {
      setHasLoaderRun(true);
      setIsFirstLoad(false);
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
  // Noise grain parallax on mouse move
  // Noise grain parallax + eye tracking on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      gsap.to(".noise-layer", {
        x: (x - 0.5) * 30,
        y: (y - 0.5) * 30,
        duration: 1.2,
        ease: "power2.out",
      });

      const deltaX = e.clientX - window.innerWidth / 2;
      const deltaY = e.clientY - window.innerHeight / 2;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main animation logic — only handles the initial loader
  useGSAP(() => {
    if (!hasLoaderRun) {
      runLoaderAnimation();
    }
  }, [hasLoaderRun]);

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
    tl.from(
      left.current,
      {
        x: 1500,
        duration: 0.7,
      },
      "-=.7",
    );
    tl.to(loader.current, {
      scale: 1,
      delay: 3.5,
      borderRadius: "0px",
    });
    tl.to(
      percent.current,
      {
        opacity: 0,
      },
      "-=.2",
    );
    tl.to(right.current, {
      opacity: 0,
    });
    tl.to(
      left.current,
      {
        opacity: 0,
      },
      "-=.7",
    );

    tl.to(mainLoader.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setHasLoaderRun(true);
        sessionStorage.setItem("loaderCompleted", "true");
        gsap.set(mainLoader.current, { display: "none" });
        setTimeout(() => {
          setIsFirstLoad(false);
        }, 100);
        if (onComplete) {
          onComplete();
        }
      },
    });
  };

  // Listens for nav clicks from Nav.jsx — covers the screen with a cinematic
  // depth transition, navigates only once fully covered, then reveals the
  // new page rising forward from depth.
  useEffect(() => {
    const handler = (e) => {
      const targetPath = e.detail.path;

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });

      gsap.set(transitionRef.current, {
        display: "block",
        y: "100%",
      });

      // Outgoing page: shrink back, tilt away, darken/blur — as the curtain rises
      tl.to(
        pageRef.current,
        {
          scale: 0.92,
          rotateX: 8,
          y: -40,
          filter: "blur(8px)",
          opacity: 0.6,
          duration: 0.9,
        },
        0,
      );

      // Curtain rises to fully cover the screen
      tl.to(
        transitionRef.current,
        {
          y: "0%",
          duration: 0.9,
          onComplete: () => {
            navigate(targetPath);

            // New page starts pre-positioned deeper in 3D space,
            // tilted the opposite way, ready to rise forward
            gsap.set(pageRef.current, {
              scale: 0.92,
              rotateX: -8,
              y: 80,
              opacity: 0.6,
              filter: "blur(8px)",
            });
          },
        },
        0,
      );

      // Curtain exits upward, revealing the new page
      tl.to(transitionRef.current, {
        y: "-100%",
        duration: 1.5,
        delay: 0.8,
      });

      // New page rises forward into its natural resting state
      tl.to(
        pageRef.current,
        {
          scale: 1,
          rotateX: 0,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.7,
          ease: "power4.out",
        },
        ">",
      );

      tl.set(transitionRef.current, {
        display: "none",
      });
    };

    window.addEventListener("syntrix-transition-start", handler);

    return () =>
      window.removeEventListener("syntrix-transition-start", handler);
  }, [navigate]);

  return (
    <>
      {/* Loader - only shows on first visit */}
      {!hasLoaderRun && (
        <div
          ref={mainLoader}
          className="fixed top-0 left-0 h-screen w-full bg-[#212121] overflow-hidden z-[9999]"
        >
          <div
            ref={loader}
            className="loader h-full w-full absolute z-[3] bg-[#F1F1F1] lg:px-[6vh] px-[3.5vh] scale-75 rounded-xl"
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

      {/* Transition overlay — pure black curtain, moving grain + tracking eyes */}
      {hasLoaderRun && (
        <div
          ref={transitionRef}
          className="fixed top-0 left-0 h-screen w-full bg-black z-[9999] overflow-hidden"
          style={{ display: "none" }}
        >
          <div
            className="noise-layer absolute inset-0 opacity-20"
            style={{ width: "130%", height: "130%", left: "-15%", top: "-15%" }}
          >
            <img
              src="/noise.png"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          <div className="absolute flex gap-2 scale-75 opacity-80 bottom-4 right-4">
            <Eye rotate={rotate} />
            <Eye rotate={rotate} />
          </div>
        </div>
      )}

      {/* Page content — 3D depth context for transitions */}
      <div
        ref={pageRef}
        style={{
          perspective: "2000px",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default LoaderTransition;