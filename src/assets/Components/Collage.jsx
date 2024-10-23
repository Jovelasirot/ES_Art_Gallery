import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const images = import.meta.glob("../imgs/Collage/*.{jpg,png,jpeg}");

const Collage = () => {
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
    <Container fluid className=" bg-black text-white">
      <Container className="py-4 position-relative">
        <h1 className="fw-bold">Collage</h1>

        {showAll && (
          <Button
            variant="primary"
            className="position-fixed top-0 end-0 m-3"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Mostra meno" : "Mostra tutto"}
          </Button>
        )}

        <Row className="align-items-center g-4">
          {(showAll ? imageUrls : imageUrls.slice(0, 3)).map((url, index) => (
            <Col key={index} sm={showAll ? "12" : ""}>
              <img
                className="d-block w-100"
                src={url}
                alt={`Collage image ${index + 1}`}
              />
            </Col>
          ))}
        </Row>
        {imageUrls.length > 3 && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button variant="primary" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Mostra meno" : "Mostra tutto"}
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Collage;
