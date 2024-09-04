import React, { useEffect, useRef } from "react";
import "./styles/App.scss";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { AnimatePresence } from "framer-motion";

const pages = [
  { path: "/", pathName: "Home", Component: Home },
  { path: "/about", pathName: "About", Component: About },
  { path: "/contact", pathName: "Contact", Component: Contact },
];

function App() {
  const location = useLocation();
  let cursorRef = useRef();
  let cursorRef2 = useRef();

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    gsap.to("body", 0, { css: { visibility: "visible" } });

    const cursorList = document.addEventListener("mousemove", (e) => {
      cursorRef.current.setAttribute(
        "style",
        `transform: translate3d(${e.pageX - 10}px, ${e.pageY - 10}px, 0px)`
      );
      cursorRef2.current.setAttribute(
        "style",
        `transform: translate3d(${e.pageX + 10}px, ${e.pageY + 10}px, 0px)`
      );
    });

    return () => {
      document.removeEventListener("mousemove", cursorList);
    };
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <div ref={cursorRef} className="cursor"></div>
      <div ref={cursorRef2} className="cursor cursor2"></div>
      <div className="pages">
        <AnimatePresence initial={false} mode ="wait">
          <Routes location={location} key={location.pathname}>
            {pages.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
