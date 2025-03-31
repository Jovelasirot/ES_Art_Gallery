import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ImageTrack from "./ImageTrack";
import MyModal from "./MyModal";
import collageImg from "../imgs/Collage/1.png";
import paesaggiDelCorpoImg from "../imgs/PaesaggiDelCorpo/1.png";
import scultureImg from "../imgs/Sculture/6.png";
import nudiImg from "../imgs/Nudi/1.svg";

const categoryImages = {
  "paesaggi-del-corpo": import.meta.glob(
    "../imgs/PaesaggiDelCorpo/*.{jpg,png,jpeg}"
  ),
  Nudi: import.meta.glob("../imgs/Nudi/*.{jpg,png,jpeg,svg}"),
  sculture: import.meta.glob("../imgs/Sculture/*.{jpg,png,jpeg}"),
  collage: import.meta.glob("../imgs/Collage/*.{jpg,png,jpeg}"),
};

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScreenXl, setIsScreenXl] = useState(window.innerWidth >= 1200);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const images = [
    {
      src: paesaggiDelCorpoImg,
      color: "#641820",
      text: "Paesaggi del corpo umano",
      category: "paesaggi-del-corpo",
    },
    // { src: nudiImg, color: "#112438", text: "Nudi", category: "Nudi" },
    {
      src: scultureImg,
      color: "#3f4140",
      text: "Sculture",
      category: "sculture",
    },
    { src: collageImg, color: "#1E1E1E", text: "Collage", category: "collage" },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--bg-color",
      images[currentIndex].color
    );
    const handleResize = () => setIsScreenXl(window.innerWidth >= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleImageClick = async (index) => {
    const clickedImage = images[index];
    setSelectedImage(clickedImage.src);
    setShowModal(true);

    const categoryFiles = categoryImages[clickedImage.category];

    const sortedImages = Object.keys(categoryFiles).sort((a, b) => {
      const aNumber = parseInt(a.match(/\d+/)?.[0] || "0", 10);
      const bNumber = parseInt(b.match(/\d+/)?.[0] || "0", 10);
      return aNumber - bNumber;
    });

    const loadedImages = await Promise.all(
      sortedImages.map(async (imagePath) => {
        const module = await categoryFiles[imagePath]();
        return module.default;
      })
    );

    setImageUrls(loadedImages);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleChangeImg = (newImage) => setSelectedImage(newImage);

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

      {isScreenXl && (
        <Row className="justify-content-center mt-3">
          <Col xs="auto" className="text-center current-text">
            <div className="fs-1 fw-bold">
              {images[currentIndex]?.text || ""}
            </div>
          </Col>
        </Row>
      )}

      <MyModal
        selectedImage={selectedImage}
        imageUrls={imageUrls}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleChangeImg={handleChangeImg}
      />
    </Container>
  );
};

export default HeroSection;
