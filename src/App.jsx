import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HeroSection from "./assets/Components/HeroSection";
import MyNavbar from "./assets/Components/MyNavbar";
import AboutMe from "./assets/Components/AboutMe";
import "bootstrap-icons/font/bootstrap-icons.css";
import Collage from "./assets/Components/ExtraComponent/Collage";
import Sculture from "./assets/Components/ExtraComponent/Sculture";
import PaesaggoDelCorpoUmano from "./assets/Components/ExtraComponent/PaesaggoDelCorpoUmano";
import HoverComponent from "./assets/Components/HoverComponent";
import { useState } from "react";

function App() {
  const [isScreenXl, setIsScreenXl] = useState(window.innerWidth > 1024);
  return (
    <Router>
      <MyNavbar />
      {isScreenXl ? <HoverComponent /> : null}
      <Routes>
        <Route path="/" element={<AboutMe />} />
        <Route path="/galleria" element={<HeroSection />} />
        {/* <Route path="/collage" element={<Collage />} />
        <Route path="/paesaggi-del-corpo" element={<PaesaggoDelCorpoUmano />} />
        <Route path="/sculture" element={<Sculture />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
