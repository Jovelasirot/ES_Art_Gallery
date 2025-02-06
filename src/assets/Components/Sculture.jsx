import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const images = import.meta.glob("../imgs/Sculture/*.{jpg,png,jpeg}");

const Sculture = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      const sortedImages = Object.keys(images).sort((a, b) => {
        const aNumber = parseInt(a.match(/\d+/)[0], 10);
        const bNumber = parseInt(b.match(/\d+/)[0], 10);
        return aNumber - bNumber;
      });

      const loadedImages = await Promise.all(
        sortedImages.map(async (imagePath) => {
          const module = await images[imagePath]();
          return module.default;
        })
      );

      setImageUrls(loadedImages);
    };

    loadImages();
  }, []);

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
    updateImg(nextPercentage);
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
    updateImg(nextPercentage);
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

  const updateImg = (nextPercentage) => {
    const index = Math.round((-nextPercentage / 100) * (imageUrls.length - 1));
    setCurrentIndex(index);
  };

  useEffect(() => {
    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [percentage]);

  return (
    <Container className="text-white">
      <Row>
        <Col xs={12} className="mb-4 text-white" as={Link} to="/">
          <i className="bi bi-arrow-left fs-2"></i>
        </Col>
        <Col className="d-flex justify-content-center">
          <span className="fs-1 fw-bold text-center">Sculture</span>
        </Col>
      </Row>
      <section
        id="image-track"
        data-mouse-down-at={mouseDownAt}
        data-prev-percentage={prevPercentage}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {imageUrls.map((image, index) => (
          <img
            key={index}
            src={image}
            className="image"
            draggable="false"
            alt={`Scultura numero ${index + 1}`}
          />
        ))}
      </section>
      <Col className="text-center current-text">
        <div className="fs-1 fw-bold">
          {currentIndex + 1} - {imageUrls.length}
        </div>
      </Col>
    </Container>
  );
};

export default Sculture;
