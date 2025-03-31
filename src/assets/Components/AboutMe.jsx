import { Col, Container, Row, Button } from "react-bootstrap";
import elioPic from "../imgs/ElioPic.jpg";
import { useEffect, useState } from "react";
import MyFooter from "./MyFooter";
import { Link, useNavigate } from "react-router-dom";

const AboutMe = () => {
  const [isXLScreen, setIsXLScreen] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1200) {
        setIsXLScreen(true);
        setShowFullText(true);
      } else {
        setIsXLScreen(false);
        setShowFullText(false);
      }
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleText = () => {
    setShowFullText((prev) => !prev);
  };

  return (
    <Container className="d-flex flex-column">
      <Row className="flex-column flex-grow-1">
        <Container
          className="d-flex align-items-center"
          style={isXLScreen ? { height: "70vh" } : {}}
        >
          <Row>
            <Col>
              <img src={elioPic} className="w-100" alt="Elio Santarella" />
            </Col>
            <Col md={8}>
              <span>
                Elio inizia l&#39;attività artistica a Taranto, sua città
                natale.
                <br />
                Nel 1963, a Milano, entra in contatto con la Pop Art. Tra i
                primi artisti in Italia crea opere iperrealiste e partecipa con
                tele emulsionate alle ricerche della Mec Art.
                {showFullText || isXLScreen ? (
                  <>
                    <br />
                    Dal 1985, con il neon su tele acriliche, realizza grandi
                    opere che sono il prolungamento e il potenziamento
                    dell&#39;immagine. Nel 1996, realizza le prime sculture in
                    ferro e le prime opere in marmo travertino.
                    <br />
                    Il percorso artistico di Santarella si sviluppa con dipinti,
                    installazioni, video, sculture, ceramiche, fotografie,
                    vetrate e pannelli. Dal 1969, a Milano, collabora con
                    architetti e scenografi e promuove e organizza le attività
                    culturali del Comune di Milano con i sindaci Aniasi, Tognoli
                    e Pillitteri nei settori delle arti visive, architettura,
                    design, comunicazione, fotografia, spettacolo e moda.
                    <br />
                    Santarella opera in un macrocosmo culturale che, nelle sue
                    opere, assume significati e valenze diverse in rapporto alla
                    luce e al colore, trasformando il segno pittorico, con le
                    sue masse plastiche, in paesaggio metafisico, surreale e
                    iperrealista. <br />
                    La visione artistica di Elio Santarella, come sostiene
                    Pierre Restany, critico e amico personale, è quella del
                    pittore del corpo: il corpo della donna che diventa
                    universo, il mondo globale dei riferimenti primari ed
                    essenziali. La donna come paesaggio, come orizzonte, come
                    entità dinamica della comunicazione.
                  </>
                ) : (
                  <>...</>
                )}
              </span>
              {!isXLScreen && (
                <Button variant="link" onClick={toggleText} className="p-0 ">
                  {showFullText ? "Mostra meno" : "Leggi di più"}
                </Button>
              )}
            </Col>
            <Row className="my-5">
              <Col
                className="text-center my-3"
                onClick={() => navigate("/galleria")}
              >
                <span className="cstmBtn">Vai alla galleria</span>
              </Col>
            </Row>
          </Row>
        </Container>
      </Row>
      <MyFooter />
    </Container>
  );
};

export default AboutMe;
