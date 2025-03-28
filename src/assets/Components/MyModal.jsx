/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { Button, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const MyModal = ({
  selectedImage,
  imageUrls,
  showModal,
  handleCloseModal,
  handleChangeImg,
}) => {
  const location = useLocation();
  const getCategoryName = () => {
    if (!selectedImage) return "";

    if (selectedImage.includes("PaesaggiDelCorpo"))
      return "Paesaggi del corpo umano";
    if (selectedImage.includes("Sculture")) return "Sculture";
    if (selectedImage.includes("Nudi")) return "Nudi";
    if (selectedImage.includes("Collage")) return "Collage";

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
          <Row className="align-itmes-center">
            <Col>
              <i
                className="bi bi-arrow-left  fs-2"
                onClick={handleCloseModal}
              ></i>
            </Col>
            <Col className="text-center fs-4 fw-bold">
              {getCategoryName()} {imageUrls.indexOf(selectedImage) + 1}
            </Col>
            <Col className="text-end fs-4">ELio Santarella</Col>
          </Row>
        </Container>
        <motion.img
          src={selectedImage}
          alt="Selected"
          className=" h-75 w-100"
          style={{ objectFit: "contain" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="d-flex overflow-auto mt-3" style={{ maxWidth: "90%" }}>
          {imageUrls.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className="m-2 "
              style={{
                width: "80px",
                height: "80px",
                cursor: "pointer",
                objectFit: "cover",
                opacity: image === selectedImage ? 1 : 0.5,
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
