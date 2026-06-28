import React, { useEffect } from "react";
import Nav from "./components/Navbar/Nav";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Service from "./pages/Service/Service";
import Aboutus from "./pages/About/Aboutus";
import PrivacyPolicy from "./pages/Privacy/PrivacyPolicy";
import { Route, Routes, useLocation } from "react-router-dom";
import LoaderTransition from "./components/common/LoaderTransition";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Lenis from "lenis";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.65,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLoaderComplete = () => {
    console.log("Loader animation completed!");
  };

  return (
    <>
      <LoaderTransition onComplete={handleLoaderComplete}>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/services" element={<Service />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </LoaderTransition>
    </>
  );
};

export default App;
