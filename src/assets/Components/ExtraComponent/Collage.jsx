import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageTrack from "../ImageTrack";
import MyModal from "../MyModal";

const images = import.meta.glob("../imgs/Collage/*.{jpg,png,jpeg}");

const Collage = () => {
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

  const handleChangeImg = (image) => {
    if (image !== undefined) {
      setSelectedImage(image);
    } else {
      setShowModal(false);
    }
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
          <span className="fs-1 fw-bold text-center">Collagge</span>
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
      <Col className="text-center current-text">
        <div className="fs-1 fw-bold">
          {currentIndex + 1} - {imageUrls.length}
        </div>
      </Col>

      <MyModal
        selectedImage={selectedImage}
        imageUrls={imageUrls}
        showModal={showModal}
        handleChangeImg={handleChangeImg}
        handleCloseModal={handleCloseModal}
      />
    </Container>
  );
};

export default Collage;
