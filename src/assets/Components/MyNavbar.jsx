import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";

const MyNavbar = () => {
  const location = useLocation();

  const getLinkOpacity = (path) => {
    return location.pathname === path ? 1 : 0.7;
  };

  return (
    <Navbar variant="dark" className="mt-4">
      <Container>
        <Row className="justify-content-center align-items-center flex-grow-1">
          <Col className="text-end border-end">
            <Nav.Link
              as={Link}
              to="/"
              className="fs-2"
              style={{ opacity: getLinkOpacity("/") }}
            >
              Elio Santarella
            </Nav.Link>
          </Col>
          <Col>
            <Nav.Link
              as={Link}
              to="/galleria"
              className="fs-2"
              style={{ opacity: getLinkOpacity("/galleria") }}
            >
              Galleria
            </Nav.Link>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
