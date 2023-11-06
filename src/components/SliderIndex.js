import React, { useState, useEffect } from "react";
import yardım1 from "../photos/yardım1.png";
import yardım2 from "../photos/yardım2.png";
import yardım3 from "../photos/yardım3.png";

function SliderIndex() {
  const images = [yardım1, yardım2, yardım3];
  const captions = ["Yardım 1", "Yardım 2", "Yardım 3"];

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
    <>
      <div className="slider_about slider_home">
        <div className="slider_text">
          <h2>{captions[currentImageIndex]}</h2>
        </div>
        <div className="slider_img">
          <img
            src={images[currentImageIndex]}
            alt={`Image ${currentImageIndex + 1}`}
          />
        </div>
      </div>
    </>
  );
}

export default SliderIndex;
