import React from "react";

const ServiceBox = ({ imageSrc, title, description }) => {
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
            <button className="homePage_services_buttons">
              {" "}
              Daha Fazla{" "}
            </button>{" "}
            {/* Bu kısma bilgilerinde için modal eklenecek, burası button olacak */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceBox;
