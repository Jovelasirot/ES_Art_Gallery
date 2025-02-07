import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, ModalBody, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageTrack from "./ImageTrack";

const images = import.meta.glob("../imgs/PaesaggiDelCorpo/*.{jpg,png,jpeg}");

const PaesaggoDelCorpoUmano = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage("");
  };

  return (
    <Container className="text-white">
      <Row>
        <Col xs={12} className="mb-4 text-white" as={Link} to="/">
          <i className="bi bi-arrow-left fs-2"></i>
        </Col>
        <Col className="d-flex justify-content-center">
          <span className="fs-1 fw-bold text-center">
            Paessaggi del corpo umano
          </span>
        </Col>
      </Row>
      <ImageTrack
        imageUrls={imageUrls}
        onImageClick={handleImageClick}
        setCurrentIndex={setCurrentIndex}
      />
      <Col className="text-center current-text">
        <div className="fs-1 fw-bold">
          {currentIndex + 1} - {imageUrls.length}
        </div>
      </Col>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        className="bg-none"
      >
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Full Image"
            className="d-block w-100"
            style={{ objectFit: "contain" }}
          />
        </Modal.Body>
        <Modal.Footer className="bg-none">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PaesaggoDelCorpoUmano;
