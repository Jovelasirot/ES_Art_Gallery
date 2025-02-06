import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Col } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar variant="dark" className="mt-4">
      <Container className="d-flex justify-content-center align-items-center">
        <Col className="text-end border-end fw-bold">
          <Navbar.Brand as={Link} to="/" className="fs-2">
            Elio Santarella
          </Navbar.Brand>
        </Col>
        <Col>
          <Nav>
            <Nav.Link as={Link} to="/about-me" className="fs-2">
              Info
            </Nav.Link>
          </Nav>
        </Col>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
