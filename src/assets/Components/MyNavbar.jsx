import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          Elio Santarella
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
