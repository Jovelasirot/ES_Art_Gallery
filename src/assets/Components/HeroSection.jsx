import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import ImageTrack from "./ImageTrack";
import collageImg from "../imgs/Collage/1.png";
import paesaggiDelCorpoImg from "../imgs/PaesaggiDelCorpo/1.png";
import scultureImg from "../imgs/Sculture/6.png";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [isScreenXl, setIsScreenXl] = useState(window.innerWidth >= 1200);

  const images = [
    {
      src: paesaggiDelCorpoImg,
      color: "#641820",
      text: "Paesaggi Del Corpo Umano",
      link: "paesaggi-del-corpo",
    },
    { src: scultureImg, color: "#317BC1", text: "Nudi", link: "Nudi" },
    { src: scultureImg, color: "#3f4140", text: "Sculture", link: "sculture" },
    { src: collageImg, color: "#1E1E1E", text: "Collage", link: "collage" },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bg-color",
      images[currentIndex].color
    );

    const handleResize = () => setIsScreenXl(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    navigate(`/${images[index].link}`);
  };

  return (
    <Container fluid className="hero-section">
      <Row>
        <Col xs={12}>
          <ImageTrack
            imageUrls={images.map((img) => img.src)}
            onImageClick={(img) =>
              handleImageClick(images.findIndex((image) => image.src === img))
            }
            setCurrentIndex={setCurrentIndex}
            isScreenXl={isScreenXl}
            images={images}
          />
        </Col>
      </Row>

      {isScreenXl ? (
        <Row className="justify-content-center mt-3">
          <Col xs="auto" className="text-center current-text">
            <div className="fs-1 fw-bold">
              {images[currentIndex]?.text || ""}
            </div>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default HeroSection;
