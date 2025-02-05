import { useState } from "react";
import "./App.css";
import HeroSection from "./assets/Components/HeroSection";
import MyNavbar from "./assets/Components/MyNavbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MyNavbar />
      <HeroSection />
    </>
  );
}

export default App;
