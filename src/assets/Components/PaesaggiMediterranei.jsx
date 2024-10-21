import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const images = import.meta.glob(
  "../imgs/PaesaggiMediterranei/*.{jpg,png,jpeg}"
);

const PaesaggiMediterranei = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        Object.values(images).map((importImage) => importImage())
      );
      setImageUrls(loadedImages);
    };

    loadImages();
  }, []);

  return (
    <Container fluid className="bg-info text-white">
      <Container className="bg-info text-white">
        <h1 className="fw-bold pt-3">Paesaggi Mediterranei</h1>
        <Carousel className="pb-5">
          {imageUrls.map((imageUrl, index) => (
            <Carousel.Item key={index} interval={1000}>
              <img
                src={imageUrl.default}
                alt={`Slide ${index}`}
                className="d-block w-100"
                style={{ height: "1000px", objectFit: "contain" }}
              />
              <Carousel.Caption>
                {/* <h3>{`Slide ${index + 1} label`}</h3> */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </Container>
  );
};

export default PaesaggiMediterranei;