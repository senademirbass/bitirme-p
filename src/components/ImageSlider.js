import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider_about">
      <img
        className="slider_img"
        src={images[currentImageIndex]}
        alt={`Resim ${currentImageIndex + 1}`}
      />
      <div className="slider_buttons">
        <button className="image-slider-buttons" onClick={prevImage}>
          Önceki
        </button>
        <button className="image-slider-buttons" onClick={nextImage}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
