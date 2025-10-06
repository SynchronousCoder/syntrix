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
        <Link to={"/"} className="block lg:w-32 w-14 cursor-pointer">
          <svg
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 103 44"
          >
            <path
              fill="#212121"
              fillRule="evenodd"
              d="M35.1441047,8.4486911 L58.6905011,8.4486911 L58.6905011,-1.3094819e-14 L35.1441047,-1.3094819e-14 L35.1441047,8.4486911 Z M20.0019577,0.000230366492 L8.83414254,25.3433089 L18.4876971,25.3433089 L29.5733875,0.000230366492 L20.0019577,0.000230366492 Z M72.5255345,0.000691099476 L72.5255345,8.44846073 L94.3991559,8.44846073 L94.3991559,16.8932356 L72.5275991,16.8932356 L72.5275991,19.5237906 L72.5255345,19.5237906 L72.5255345,43.9274346 L102.80937,43.9274346 L102.80937,35.4798953 L80.9357483,35.4798953 L80.9357483,25.3437696 L94.3996147,25.3428482 L94.3996147,16.8953089 L102.80937,16.8953089 L102.80937,0.000691099476 L72.5255345,0.000691099476 Z M-1.30398043e-14,43.9278953 L8.78642762,43.9278953 L8.78642762,0.0057591623 L-1.30398043e-14,0.0057591623 L-1.30398043e-14,43.9278953 Z M58.6849955,8.4486911 L43.1186904,43.9274346 L52.3166592,43.9274346 L67.9877996,8.4486911 L58.6849955,8.4486911 Z M18.4688864,25.3437696 L26.7045278,43.9278953 L36.2761871,43.9278953 L28.1676325,25.3375497 L18.4688864,25.3437696 Z"
            ></path>
          </svg>
        </Link>

        {/* ===== Nav Items ===== */}
        <div className="lg:ml-0 ml-[4.5vh] flex items-center justify-center lg:gap-[2.5vh] lg:scale-100 scale-80">
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
