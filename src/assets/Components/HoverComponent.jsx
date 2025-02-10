/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from "react";

const HoverComponent = ({ currentIndex }) => {
  const [styles, setStyles] = useState([]);
  const speed = 0.1;
  const numCursors = 5;
  const ballsRef = useRef([]);
  const aim = useRef({ x: 0, y: 0 });

  const positions = useRef([...Array(numCursors)].map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    const animate = () => {
      const newStyles = [];

      positions.current.forEach((pos, index) => {
        const ballSpeed = speed - index * 0.0145;

        pos.x += (aim.current.x - pos.x) * ballSpeed;
        pos.y += (aim.current.y - pos.y) * ballSpeed;

        newStyles.push({
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        });
      });

      setStyles(newStyles);
      requestAnimationFrame(animate);
    };

    animate();
  }, [speed, numCursors]);

  const onMouseMove = (e) => {
    aim.current.x = e.clientX;
    aim.current.y = e.clientY;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="cursors">
      {[...Array(numCursors)].map((_, index) => (
        <div
          key={index}
          ref={(el) => (ballsRef.current[index] = el)}
          className="ball"
          style={styles[index]}
        ></div>
      ))}
    </div>
  );
};

export default HoverComponent;
