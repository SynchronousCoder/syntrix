import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [showNav, setShowNav] = useState(false); // initially hidden
  const [lastScroll, setLastScroll] = useState(0);

  // Show navbar after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNav(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < lastScroll) {
        // 🔼 scrolling up -> show nav
        setShowNav(true);
      } else {
        // 🔽 scrolling down -> hide nav
        setShowNav(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="backdrop-blur-[2px] bg-white/30 h-[8vh] flex justify-between items-center lg:px-[6vh] px-[2vh]">
        {/* ===== Logo ===== */}
        <Link to={"/"} className="block lg:w-32 w-[19vw] cursor-pointer">
          <img src="./public/logo.svg" alt="" />
        </Link>

        {/* ===== Nav Items ===== */}
        <div className="lg:ml-0 ml-[0vh] flex items-center justify-center lg:gap-[2.5vh] lg:scale-100 scale-80">
          {[
            { path: "/services", label: "services" },
            { path: "/about", label: "about us" },
          ].map((nav, idx) => (
            <Link
              to={nav.path}
              key={idx}
              className="relative h-10 w-24 lg:font-normal font-bold flex items-center group cursor-pointer overflow-hidden"
            >
              <div className="relative h-6 w-full font-[font2] text-[#212121] flex justify-center overflow-hidden">
                {/* Default text */}
                <h1 className="uppercase absolute transform translate-y-0 transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                  {nav.label}
                </h1>
                {/* Hover text */}
                <h1 className="uppercase absolute transform translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                  {nav.label}
                </h1>
              </div>
              {/* Underline effect */}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <Link
          to={"/contact"}
          className="lg:mr-0 -mr-[4vh] lg:font-normal font-bold relative lg:h-[3vw] lg:w-[8vw] w-[26vw] flex lg:justify-center items-center group cursor-pointer overflow-hidden lg:scale-100 scale-70"
        >
          <div className=" relative h-11 w-full font-[font2] text-[#212121] flex justify-center items-center overflow-hidden">
            <h1 className="absolute transform translate-y-0 transition-transform duration-500 ease-in-out group-hover:-translate-y-[200%]">
              CONTACT US
            </h1>

            <h1 className="absolute transform translate-y-[200%] transition-transform duration-500 ease-in-out group-hover:translate-y-0">
              CONTACT US
            </h1>
          </div>

          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
