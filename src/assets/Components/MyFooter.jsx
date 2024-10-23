import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const MyFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <Container className="text-center py-4">
        <Row className="align-items-center">
          <Col md={4} className="mb-3">
            <h5>Contattami</h5>
            <p>
              Email:{" "}
              <a href="mailto:elioverrucola@gmail.com" className="text-white">
                elioverrucola@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+393391614273" className="text-white">
                + 39 3391614273
              </a>
            </p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Seguimi</h5>
            <Row>
              <Col className="text-end">
                <a
                  href="https://www.facebook.com/elio.santarella"
                  className="text-white "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={30} />
                </a>
              </Col>
              <Col className="text-start">
                <a
                  href="https://www.instagram.com/eliosantarella/"
                  className="text-white "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={30} />
                </a>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="mb-3">
            <h5>© {currentYear} Elio Santarella. All rights reserved.</h5>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
