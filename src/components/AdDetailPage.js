import React from "react";
import "../css/AdDetailModal.css";

const AdDetailPage = ({ ad, onClose }) => {
  return (
    <div className="adDetailPage">
      <div className="adDetailPage-content">
        <span className="adDetailPageClose" onClick={onClose}>
          &times;
        </span>
        <h2>{ad.title}</h2>
        <p>{ad.description}</p>
        <button className="button-24"> Yardım Et</button>
      </div>
    </div>
  );
};

export default AdDetailPage;
