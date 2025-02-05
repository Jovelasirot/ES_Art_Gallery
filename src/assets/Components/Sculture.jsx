import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const images = import.meta.glob("../imgs/Sculture/*.{jpg,png,jpeg}");

const Sculture = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  return (
    <Container fluid className=" bg-info text-white"
      >
      <Container className="py-4">
        <h1 className="fw-bold">Sculture</h1>

        {showAll && (
          <Button
            variant="secondary"
            className="position-fixed top-0 end-0 m-3"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Mostra meno" : "Mostra tutto"}
          </Button>
        )}

        <Row className="align-items-center g-4">
          {(showAll ? imageUrls : imageUrls.slice(0, 3)).map((url, index) => (
            <Col key={index} xs={showAll ? "6" : ""}>
              <img
                className="d-block w-100"
                src={url}
                alt={`Scultura image ${index + 1}`}
              />
            </Col>
          ))}
        </Row>
        {imageUrls.length > 3 && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Mostra meno" : "Mostra tutto"}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Sculture;
