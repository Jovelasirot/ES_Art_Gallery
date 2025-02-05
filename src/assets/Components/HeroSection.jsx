import React, { useState, useEffect } from "react";
import collageImg from "../imgs/Collage/1.png";
import paeaggiDelCorpoImg from "../imgs/PaesaggiDelCorpo/1.png";
import sculture from "../imgs/Sculture/6.png";

const HeroSection = () => {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const onMouseDown = (e) => {
    setMouseDownAt(e.clientX);
  };

  const onMouseMove = (e) => {
    if (mouseDownAt === 0) return;

    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth;
    const newPercentage = -((mouseDelta / maxDelta) * 100);
    const nextPercentageUnconstrained = prevPercentage + newPercentage;
    const nextPercentage = Math.max(
      Math.min(nextPercentageUnconstrained, 0),
      -100
    );

    setPercentage(nextPercentage);

    const track = document.getElementById("image-track");
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    const images = document.getElementsByClassName("image");
    for (const image of images) {
      image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    }
  };

  const onMouseUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  };

  const onWheel = (e) => {
    const delta = e.deltaY;

    const smoothness = 0.3;
    const direction = delta > 0 ? -1 : 1;

    const newPercentage = percentage + direction * smoothness * 10;
    const nextPercentage = Math.max(Math.min(newPercentage, 0), -100);

    setPercentage(nextPercentage);

    const track = document.getElementById("image-track");
    track.style.transition = "transform 0.3s ease-out";
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    const images = document.getElementsByClassName("image");
    for (const image of images) {
      image.style.transition = "object-position 0.3s ease-out";
      image.style.objectPosition = `${nextPercentage + 100}% 50%`;
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", onWheel);
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [percentage]);

  return (
    <section
      id="image-track"
      data-mouse-down-at={mouseDownAt}
      data-prev-percentage={prevPercentage}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <img src={collageImg} className="image" draggable="false" alt="image 1" />
      <img
        src={paeaggiDelCorpoImg}
        className="image"
        draggable="false"
        alt="image 2"
      />
      <img src={sculture} className="image" draggable="false" alt="image 3" />
      <img
        src="https://images.unsplash.com/photo-1677688010633-138cea460828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
        className="image"
        draggable="false"
        alt="image 4"
      />
    </section>
  );
};

export default HeroSection;
