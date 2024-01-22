import React, { useState } from "react";
import SliderModal from "./SliderModal";

const imageDetailsList = {
  0: [
    "Sitemiz 10 Mart - 13 Mart / 2024 tarihleri arasında bakıma alınacaktır.",
  ],
  1: [
    "İlan açarken argo ve küfür kullanımı yasaktır. Tüm kullanıcıların dikkatine sunulur.",
  ],
  2: [
    "İlan oluşturmak ve var olan ilanları incelemek için İlanlar sayfasına göz atabilirsiniz.",
  ],
};

const ImageSlider = ({ images, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const handleImageClick = () => {
    openModal();
    if (onImageClick) {
      onImageClick(currentImageIndex);
    }
  };

  return (
    <div className="slider_about">
      <img
        className="slider_img"
        src={images[currentImageIndex]}
        alt={`Resim ${currentImageIndex + 1}`}
        onClick={handleImageClick}
      />
      <div className="slider_buttons">
        <button className="image-slider-buttons" onClick={prevImage}>
          Önceki
        </button>
        <button className="image-slider-buttons" onClick={nextImage}>
          Sonraki
        </button>
      </div>

      {isModalOpen && (
        <SliderModal
          onClose={closeModal}
          imageDetails={imageDetailsList[currentImageIndex]}
        >
          {imageDetailsList[currentImageIndex].map((detail, index) => (
            <p key={index}>{detail}</p>
          ))}
        </SliderModal>
      )}
    </div>
  );
};

export default ImageSlider;
