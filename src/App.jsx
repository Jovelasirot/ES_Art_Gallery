import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Container } from "react-bootstrap";
import MyNavbar from "./assets/Components/MyNavbar";
import AboutMe from "./assets/Components/AboutMe";
import Collage from "./assets/Components/Collage";
import Nudi from "./assets/Components/Nudi";
import PaesaggiDelCorpoUmano from "./assets/Components/PaesaggiDelCorpoUmano";
import PaesaggiMediterranei from "./assets/Components/PaesaggiMediterranei";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyNavbar />
      <AboutMe />
      <Collage />
      <Nudi />
      <PaesaggiDelCorpoUmano />
      <PaesaggiMediterranei />
    </>
  );
}

export default App;
