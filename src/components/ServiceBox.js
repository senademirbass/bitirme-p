import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";

const ServiceBox = ({ id, imageSrc, title, description }) => {
  const [popupContent, setPopupContent] = useState("");

  useEffect(() => {
    // This block will be executed after popupContent is updated
    console.log("Popup content updated:", popupContent);
  }, [popupContent]);

  function handleOpenPopup() {
    if (id === 0) {
      setPopupContent("DŞLSKFLŞDKLFŞ");
    } else if (id === 1) {
      setPopupContent("nnnnnn");
    } else if (id === 2) {
      setPopupContent("SSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
    }
  }

  return (
    <>
      <div className="col-md-4">
        <div className="box">
          <div className="img-box">
            <img src={imageSrc} alt="" />
          </div>
          <div className="detail-box">
            <h5 className="homePage_services_titles">{title}</h5>
            <p className="homePage_services_descs">{description}</p>
            <Popup
              trigger={
                <button className="openModal_button" onClick={handleOpenPopup}>
                  Daha Fazla
                </button>
              }
              modal
              nested
            >
              <div>
                <p style={{ color: "black" }}>SENA: {popupContent}</p>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceBox;
