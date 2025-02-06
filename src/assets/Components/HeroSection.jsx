import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"; //
import collageImg from "../imgs/Collage/1.png";
import paeaggiDelCorpoImg from "../imgs/PaesaggiDelCorpo/1.png";
import sculture from "../imgs/Sculture/6.png";
import { Col, Container, Row } from "react-bootstrap";

const HeroSection = () => {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const navigate = useNavigate();

  const images = [
    {
      src: collageImg,
      color: "black",
      text: "Collage",
      link: "collage",
    },
    {
      src: paeaggiDelCorpoImg,
      color: "#A20300",
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

  const onMouseDown = (e) => {
    setMouseDownAt(e.clientX);
  };

  const onMouseMove = (e) => {
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth;
    const newPercentage = -((mouseDelta / maxDelta) * 100);
    const nextPercentageUnconstrained = prevPercentage + newPercentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -100
    );

    setPercentage(nextPercentage);
    updateTrack(nextPercentage);
    updateBackgroundColor(nextPercentage);
    updateText(nextPercentage);
  };

  const onMouseUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  };

  const onWheel = (e) => {
    const delta = e.deltaY;
    const smoothness = 0.3;
    const direction = delta > 0 ? -1 : 1;
    const newPercentage = percentage + direction * smoothness * 10;
    const nextPercentage = Math.max(Math.min(newPercentage, 0), -100);

    setPercentage(nextPercentage);
    updateTrack(nextPercentage);
    updateBackgroundColor(nextPercentage);
    updateText(nextPercentage);
  };

  const updateTrack = (nextPercentage) => {
    const track = document.getElementById("image-track");
    track.style.transition = "transform 0.3s ease-out";
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    const images = document.getElementsByClassName("image");
    for (const image of images) {
      image.style.transition = "object-position 0.3s ease-out";
      image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    }
  };

  const updateBackgroundColor = (nextPercentage) => {
    const index = Math.round((-nextPercentage / 95) * (images.length - 1));
    const newColor = images[index]?.color || "black";
    document.documentElement.style.setProperty("--bg-color", newColor);
  };

  const updateText = (nextPercentage) => {
    const index = Math.round((-nextPercentage / 100) * (images.length - 1));
    const newText = images[index]?.text || "";
    setCurrentText(newText);
  };

  useEffect(() => {
    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [percentage]);

  const handleImageClick = (link, color) => {
    navigate(`/${link}`);
    document.documentElement.style.setProperty("--bg-color", color);
  };

  return (
    <Container>
      <Row className="flex-column">
        <Col>
          <section
            id="image-track"
            data-mouse-down-at={mouseDownAt}
            data-prev-percentage={prevPercentage}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                className="image"
                draggable="false"
                alt={`image ${index + 1}`}
                onClick={() => handleImageClick(image.link, image.color)}
              />
            ))}
          </section>
        </Col>
        <Col className="text-center current-text">
          <div className="fs-1 fw-bold">{currentText}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
