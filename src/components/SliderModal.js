// SliderModal.js

import React from "react";
import ReactDOM from "react-dom";
import "../css/sliderModal.css";

const SliderModal = ({ children, onClose, imageDetails }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default SliderModal;
