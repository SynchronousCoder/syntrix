import React from "react";
import Nav from "./components/Navbar/Nav";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Service from "./pages/Service/Service";
import Aboutus from "./pages/About/Aboutus";
import { Route, Routes, useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import LoaderTransition from "./components/common/LoaderTransition";
import { Analytics } from "@vercel/analytics/react";
import SpeedInsights from "@vercel/speed-insights/react"; // <- add this

// ScrollToTop: resets scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  // instantiate locomotive scroll once
  const locoRef = React.useRef<LocomotiveScroll | null>(null);

  React.useEffect(() => {
    // initialize once on mount
    locoRef.current = new LocomotiveScroll({
      el: document.querySelector("#root") || document.documentElement,
      smooth: true,
      // ...other options
    });

    return () => {
      // cleanup on unmount
      if (locoRef.current) {
        locoRef.current.destroy();
        locoRef.current = null;
      }
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
        </Routes>

        <Analytics /> {/* Vercel Analytics (separate) */}

        {/* Speed Insights — only mount in production */}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </LoaderTransition>
    </>
  );
};

export default App;