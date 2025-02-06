import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HeroSection from "./assets/Components/HeroSection";
import MyNavbar from "./assets/Components/MyNavbar";
import AboutMe from "./assets/Components/AboutMe";
import "bootstrap-icons/font/bootstrap-icons.css";
import Collage from "./assets/Components/Collage";
import Sculture from "./assets/Components/Sculture";
import PaesaggoDelCorpoUmano from "./assets/Components/PaesaggoDelCorpoUmano";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/collage" element={<Collage />} />
        <Route path="/paesaggi-del-corpo" element={<PaesaggoDelCorpoUmano />} />
        <Route path="/sculture" element={<Sculture />} />
      </Routes>
    </Router>
  );
}

export default App;
