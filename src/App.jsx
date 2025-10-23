// import React from "react";
// import Nav from "./components/Navbar/Nav";
// import Home from "./pages/Home/Home";
// import Contact from "./pages/Contact/Contact";
// import Service from "./pages/Service/Service";
// import { Route, Routes, useLocation } from "react-router-dom";
// import LocomotiveScroll from "locomotive-scroll";
// import LoaderTransition from "./components/common/LoaderTransition";
// import Aboutus from "./pages/About/Aboutus";

// // ScrollToTop component har route change pe scroll reset karega
// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   React.useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// };

// const App = () => {
//   const locomotiveScroll = new LocomotiveScroll();

//   const handleLoaderComplete = () => {
//     console.log("Loader animation completed!");
//     // Any additional logic after loader completes
//   };

//   return (
//     <>
//       <LoaderTransition onComplete={handleLoaderComplete}>
//         <ScrollToTop /> {/* Yeh line add karo */}
//         <Nav />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<Aboutus />} />
//           <Route path="/services" element={<Service />} />
//         </Routes>
//       </LoaderTransition>
//     </>
//   );
// };

// export default App;
import React from "react";
import Nav from "./components/Navbar/Nav";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Service from "./pages/Service/Service";
import Aboutus from "./pages/About/Aboutus";
import { Route, Routes, useLocation } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import LoaderTransition from "./components/common/LoaderTransition";
import { Analytics } from "@vercel/analytics/react"; // ✅ Correct import

// ScrollToTop: resets scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();

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
        <Analytics /> {/* ✅ Added here to track all routes */}
      </LoaderTransition>
    </>
  );
};

export default App;