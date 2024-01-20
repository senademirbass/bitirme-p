import React, { useState, useEffect } from "react";
function Slider() {
  const images = [
    require("../photos/yardım1.png"),
    require("../photos/yardım2.png"),
    require("../photos/yardım3.png"),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  return (
    <div className="slider_about">
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
      />
    </div>
  );
}

export default Slider;
