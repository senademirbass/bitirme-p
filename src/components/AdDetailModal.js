// AdDetailModal.js

import React from "react";
import "../css/AdDetailModal.css";

const AdDetailModal = ({ ad, onClose }) => {
  const modalClassName = ad ? "adDetailModal active" : "adDetailModal";

  return (
    <div className={modalClassName}>
      <div className="adDetailModal-content">
        <span className="adDetailModalClose" onClick={onClose}>
          &times;
        </span>
        <h2>{ad.title}</h2>
        <p>{ad.description}</p>
        <button className="button-55"> Yardım Et</button>
      </div>
    </div>
  );
};

export default AdDetailModal;
