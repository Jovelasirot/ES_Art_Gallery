/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyModal = ({
  selectedImage,
  imageUrls,
  showModal,
  handleCloseModal,
  handleChangeImg,
}) => {
  const [isXLScreen, setIsXLScreen] = useState(false);
  const thumbnailRef = useRef(null);
  const navigate = useNavigate();

  const categoryMapping = {
    PaesaggiDelCorpo: "Paesaggi del corpo umano",
    Sculture: "Sculture",
    Nudi: "Nudi",
    Collage: "Collage",
  };

  useEffect(() => {
    if (
      showModal &&
      performance.getEntriesByType("navigation")[0]?.type === "reload"
    ) {
      navigate("/galleria");
    }
  }, [showModal, navigate]);

  const getCategoryName = () => {
    if (!selectedImage) return "";

    for (const key in categoryMapping) {
      if (selectedImage.includes(key)) {
        return categoryMapping[key];
      }
    }

    return "Gallery";
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentIndex = imageUrls.indexOf(selectedImage);
      if (event.key === "ArrowRight" && currentIndex < imageUrls.length - 1) {
        handleChangeImg(imageUrls[currentIndex + 1]);
      } else if (event.key === "ArrowLeft" && currentIndex > 0) {
        handleChangeImg(imageUrls[currentIndex - 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, imageUrls, handleChangeImg]);

  const handleScroll = (event) => {
    const currentIndex = imageUrls.indexOf(selectedImage);
    if (event.deltaY > 0 && currentIndex < imageUrls.length - 1) {
      handleChangeImg(imageUrls[currentIndex + 1]);
    } else if (event.deltaY < 0 && currentIndex > 0) {
      handleChangeImg(imageUrls[currentIndex - 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = imageUrls.indexOf(selectedImage);
    if (currentIndex > 0) {
      handleChangeImg(imageUrls[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = imageUrls.indexOf(selectedImage);
    if (currentIndex < imageUrls.length - 1) {
      handleChangeImg(imageUrls[currentIndex + 1]);
    }
  };

  useEffect(() => {
    if (thumbnailRef.current) {
      const currentIndex = imageUrls.indexOf(selectedImage);
      const thumbnailWidth = 90;
      thumbnailRef.current.scrollLeft =
        currentIndex * thumbnailWidth - thumbnailWidth * 1;
    }
  }, [selectedImage, imageUrls]);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1200) {
        setIsXLScreen(true);
      } else {
        setIsXLScreen(false);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      fullscreen
      centered
      onWheel={handleScroll}
    >
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
        <Container className="text-white mb-2">
          <Row className="align-items-center">
            <Col>
              <i
                className="bi bi-arrow-left fs-2"
                onClick={handleCloseModal}
              ></i>
            </Col>
            <Col className="text-center fs-4 fw-bold">
              {getCategoryName()} {imageUrls.indexOf(selectedImage) + 1}
            </Col>
            <Col className="text-end fs-4">Elio Santarella</Col>
          </Row>
        </Container>

        {!isXLScreen && (
          <>
            <button className="carousel-btn-left" onClick={handlePrev}>
              &#60;
            </button>

            <button className="carousel-btn-right" onClick={handleNext}>
              &#62;
            </button>
          </>
        )}

        <motion.img
          src={selectedImage}
          alt="Selected"
          className="h-75 w-100"
          style={{ objectFit: "contain" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div
          ref={thumbnailRef}
          className="d-flex overflow-auto mt-3"
          style={{ maxWidth: "90%" }}
        >
          {imageUrls.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className="m-2"
              style={{
                width: "80px",
                height: "80px",
                cursor: "pointer",
                objectFit: "cover",
                opacity: image === selectedImage ? 1 : 0.5,
                overflowY: "none",
                overflowX: "none",
              }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleChangeImg(image)}
            />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MyModal;
