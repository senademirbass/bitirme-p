import React, { useState, useEffect } from "react";
import yardım1 from "../photos/yardım1.png";
import yardım2 from "../photos/yardım2.png";
import yardım3 from "../photos/yardım3.png";
function AboutPageSlider() {
  const images = [yardım1, yardım2, yardım3];

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

export default AboutPageSlider;
