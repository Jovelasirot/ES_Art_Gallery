import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import ImageTrack from "./ImageTrack";
import collageImg from "../imgs/Collage/1.png";
import paeaggiDelCorpoImg from "../imgs/PaesaggiDelCorpo/1.png";
import sculture from "../imgs/Sculture/6.png";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const images = [
    {
      src: collageImg,
      color: "#1E1E1E",
      text: "Collage",
      link: "collage",
    },
    {
      src: paeaggiDelCorpoImg,
      color: "#641820",
      text: "Paesaggi Del Corpo Umano",
      link: "paesaggi-del-corpo",
    },
    {
      src: sculture,
      color: "#3f4140",
      text: "Sculture",
      link: "sculture",
    },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bg-color",
      images[currentIndex].color || "black"
    );
  }, [currentIndex]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    const { link } = images[index];
    navigate(`/${link}`);
  };

  return (
    <Container>
      <Row className="flex-column">
        <Col>
          <ImageTrack
            imageUrls={images.map((img) => img.src)}
            onImageClick={(img) => {
              const index = images.findIndex((image) => image.src === img);
              handleImageClick(index);
            }}
            setCurrentIndex={setCurrentIndex}
          />
        </Col>
        <Col className="text-center current-text">
          <div className="fs-1 fw-bold">{images[currentIndex].text || ""}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
