import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const MyNavbar = () => {
  return (
    <Container>
      <Row className="fs-4 mt-3">
        <Col className="text-end border-end fw-bold">Elio Santarella</Col>
        <Col>Info</Col>
      </Row>
    </Container>
  );
};

export default MyNavbar;
