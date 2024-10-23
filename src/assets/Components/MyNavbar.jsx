import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const MyNavbar = () => {
  const [isXLScreen, setIsXLScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1200) {
        setIsXLScreen(true);
      } else {
        setIsXLScreen(false);
      }
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <Container
      fluid
      className="d-flex align-items-center bg-dark text-white"
      style={isXLScreen ? { height: "5vh" } : { marginBottom: "1rem" }}
    >
      <Container>
        <h1 className="fw-bold">Elio Santarella</h1>
      </Container>
    </Container>
  );
};

export default MyNavbar;
