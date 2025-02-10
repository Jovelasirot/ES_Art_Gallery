/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { Button, Container } from "react-bootstrap";

const MyModal = ({
  selectedImage,
  imageUrls,
  showModal,
  handleChangeImg,
  handleCloseModal,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      fullscreen
      centered
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
        <Container className="d-flex mb-3">
          <i
            className="bi bi-arrow-left fs-2 text-white"
            onClick={handleCloseModal}
          ></i>
        </Container>
        <motion.img
          src={selectedImage}
          alt="Selected"
          className="d-block h-75"
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
              alt={`Immagine ${index}`}
              className="m-2 "
              style={{
                width: "80px",
                height: "80px",
                cursor: "pointer",
                objectFit: "cover",
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
