/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const ImageTrack = ({ imageUrls, onImageClick, setCurrentIndex, images }) => {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isScreenXl, setIsScreenXl] = useState(window.innerWidth > 1024);

  const updateScreenSize = () => {
    setIsScreenXl(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const onMouseMove = (e) => {
    if (mouseDownAt === 0 || !isScreenXl) return;

    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth;
    const newPercentage = -((mouseDelta / maxDelta) * 100);
    const nextPercentageUnconstrained = prevPercentage + newPercentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -100
    );

    setPercentage(nextPercentage);
    updateTrack(nextPercentage);
    updateImg(nextPercentage);
  };

  const onMouseUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  };

  const onMouseDown = (e) => {
    if (isScreenXl) setMouseDownAt(e.clientX);
  };

  const onWheel = (e) => {
    if (!isScreenXl) return;

    const delta = e.deltaY;
    const smoothness = 0.3;
    const direction = delta > 0 ? -1 : 1;
    const newPercentage = percentage + direction * smoothness * 10;
    const nextPercentage = Math.max(Math.min(newPercentage, 0), -100);

    setPercentage(nextPercentage);
    updateTrack(nextPercentage);
    updateImg(nextPercentage);
  };

  const updateTrack = (nextPercentage) => {
    const track = document.getElementById("image-track");
    track.style.transition = "transform 0.3s ease-out";
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    const images = document.getElementsByClassName("image");
    for (const image of images) {
      image.style.transition = "object-position 0.3s ease-out";
      image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    }
  };

  const updateImg = (nextPercentage) => {
    const index = Math.round((-nextPercentage / 100) * (imageUrls.length - 1));
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isScreenXl) {
      window.addEventListener("wheel", onWheel);
    } else {
      window.removeEventListener("wheel", onWheel);
    }
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [isScreenXl, percentage]);

  return (
    <>
      {isScreenXl ? (
        <section
          id="image-track"
          data-mouse-down-at={mouseDownAt}
          data-prev-percentage={prevPercentage}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {imageUrls.map((image, index) => (
            <img
              key={index}
              src={image}
              className="image"
              draggable="false"
              alt={`Immagine numero ${index + 1}`}
              onDoubleClick={() => onImageClick(image)}
            />
          ))}
        </section>
      ) : (
        <Row className="flex-column gy-3">
          {imageUrls.map((image, index) => (
            <Col key={index}>
              <div className="text-center fw-bold">{image.src}</div>
              <img
                id="image-track-xs"
                src={image}
                className="image"
                draggable="true"
                alt={`Immagine numero ${index + 1}`}
                onDoubleClick={() => onImageClick(image)}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ImageTrack;
