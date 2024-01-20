import React, { useState } from "react";
import Modal from "react-modal";
import "../css/style.css";

const ServiceBox = ({ id, imageSrc, title, description, content }) => {
  const [isModalOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="col-md-4">
        <div className="box">
          <div className="detail-box">
            <h5 className="homePage_services_titles">{title}</h5>
            <p className="homePage_services_descs">{description}</p>
            <button className="openModal_button" onClick={openModal}>
              Daha Fazla
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={`Modal ${id}`}
        className="modalStyle"
      >
        <h2 className="modalTitleStyle">{title}</h2>
        <p className="modalContentStyle">{content}</p>
        <button className="modalButtonStyle" onClick={closeModal}>
          Kapat
        </button>
      </Modal>
    </>
  );
};

export default ServiceBox;
