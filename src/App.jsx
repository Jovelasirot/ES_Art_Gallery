import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import MyNavbar from "./assets/Components/MyNavbar";
import AboutMe from "./assets/Components/AboutMe";
import Collage from "./assets/Components/Collage";
import PaesaggoDelCorpoUmano from "./assets/Components/PaesaggoDelCorpoUmano";
import Sculture from "./assets/Components/Sculture";
import MyFooter from "./assets/Components/MyFooter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyNavbar />
      <AboutMe />
      <Collage />
      <PaesaggoDelCorpoUmano />
      <Sculture />
      <MyFooter />
    </>
  );
}

export default App;
