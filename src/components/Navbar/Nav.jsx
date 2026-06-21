import { createPortal } from "react-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [showNav, setShowNav] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNav(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      setShowNav(true);
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return;

      const currentScroll = window.scrollY;

      if (currentScroll < lastScroll) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll, menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Intercepts every internal nav click: closes the mobile menu (if open),
  // then tells LoaderTransition to cover the screen before navigating.
  const handleNavigation = (e, path) => {
    e.preventDefault();

    setMenuOpen(false);

    window.dispatchEvent(
      new CustomEvent("syntrix-transition-start", {
        detail: { path },
      })
    );
  };

  const navLinks = [
    { path: "/services", label: "Services" },
    { path: "/about", label: "About us" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showNav || menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="backdrop-blur-[2px] bg-white/30 h-[8vh] flex justify-between items-center lg:px-[6vh] px-5 sm:px-8">
        {/* ===== Logo ===== */}
        <Link
          to={"/"}
          onClick={(e) => handleNavigation(e, "/")}
          className="block lg:w-32 w-24 sm:w-28 cursor-pointer relative z-[60]"
        >
          <img
            src="https://ik.imagekit.io/m9zi40oov/logo-only.png?updatedAt=1782029051265"
            alt="Syntrix Logo"
          />
        </Link>

        {/* ===== Desktop Nav Items (lg and up, unchanged) ===== */}
        <div className="hidden lg:flex items-center justify-center gap-[2.5vh]">
          {navLinks.map((nav, idx) => (
            <Link
              to={nav.path}
              key={idx}
              onClick={(e) => handleNavigation(e, nav.path)}
              className="relative h-10 w-24 font-normal flex items-center group cursor-pointer overflow-hidden"
            >
              <div className="relative h-6 w-full font-[font2] text-[#212121] flex justify-center overflow-hidden">
                <h1 className="uppercase absolute transform translate-y-0 transition-transform duration-500 ease-in-out group-hover:-translate-y-full">
                  {nav.label}
                </h1>
                <h1 className="uppercase absolute transform translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                  {nav.label}
                </h1>
              </div>
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* ===== Desktop Contact Button (lg and up, unchanged) ===== */}
        <Link
          to={"/contact"}
          onClick={(e) => handleNavigation(e, "/contact")}
          className="hidden lg:flex mr-0 font-normal relative h-[3vw] w-[8vw] justify-center items-center group cursor-pointer overflow-hidden"
        >
          <div className="relative h-11 w-full font-[font2] text-[#212121] flex justify-center items-center overflow-hidden">
            <h1 className="absolute transform translate-y-0 opacity-100 transition-transform duration-500 ease-in-out group-hover:-translate-y-[200%]">
              CONTACT US
            </h1>
            <h1 className="absolute transform translate-y-[200%] transition-transform duration-500 ease-in-out group-hover:translate-y-0">
              CONTACT US
            </h1>
          </div>
          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-500 group-hover:w-full"></span>
        </Link>

        {/* ===== Mobile/Tablet Menu Trigger ===== */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="lg:hidden relative z-[60] h-11 w-11 rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer transition-colors duration-300 hover:bg-[#212121]/5"
        >
          <span
            className={`block h-[2px] w-7 bg-[#212121] transition-all duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          ></span>
          <span
            className={`block h-[2px] w-7 bg-[#212121] transition-all duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* ===== Mobile/Tablet Fullscreen Overlay Menu — portaled to body ===== */}
      {createPortal(
        <div
          className={`lg:hidden fixed inset-0 bg-[#F1F1F1] transition-opacity duration-500 ease-in-out ${
            menuOpen
              ? "opacity-100 visible z-[9999]"
              : "opacity-0 invisible pointer-events-none z-[9999]"
          }`}
        >
          <div className="h-full w-full overflow-y-auto flex flex-col justify-between px-6 sm:px-10 pt-[12vh] pb-12">
            <div className="flex flex-col gap-2">
              {navLinks.map((nav, idx) => (
                <Link
                  key={idx}
                  to={nav.path}
                  onClick={(e) => handleNavigation(e, nav.path)}
                  className="group relative overflow-hidden border-b border-[#212121]/15 py-5"
                  style={{
                    transitionDelay: menuOpen ? `${idx * 70 + 100}ms` : "0ms",
                  }}
                >
                  <span
                    className={`block font-[font1] uppercase text-[12vw] sm:text-[8vw] leading-none text-[#212121] transition-all duration-500 ease-out ${
                      menuOpen
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                    }`}
                  >
                    {nav.label}
                  </span>
                </Link>
              ))}
            </div>

            <div
              className={`flex flex-col gap-6 mt-10 transition-all duration-500 ease-out ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: menuOpen ? "240ms" : "0ms" }}
            >
              <p className="font-[font1] text-[5.5vw] sm:text-[3.5vw] leading-tight text-[#212121] uppercase">
                Crafting digital experiences
                <br />
                for ambitious brands.
              </p>

              <Link
                to={"/contact"}
                onClick={(e) => handleNavigation(e, "/contact")}
                className="inline-flex items-center justify-center w-full h-14 rounded-full border border-[#212121] font-[font2] uppercase text-sm tracking-wide text-[#212121] active:bg-[#212121] active:text-white transition-colors duration-300"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Nav;