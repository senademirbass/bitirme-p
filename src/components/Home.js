import React from "react";
import ImageSlider from "./ImageSlider";
import ServiceSectionHome from "./ServiceSectionHome";

function Home() {
  const imageDirectory = "/sliderhome/";
  const imageNames = [
    "duyuru.png",
    "duyuru2.png",
    "duyurular.jpg",
    "kozmetik-duyurulari.jpg",
  ];

  const servicesTitle = {
    value: "Burada Neler Yapabilirsin?",
    className: "homePage_services",
  };

  const images = imageNames.map((imageName) => imageDirectory + imageName);

  return (
    <>
      <section className="slider_section">
        <div
          id="customCarousel1"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="img-box">
                  <ImageSlider images={images} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ServiceSectionHome />
    </>
  );
}

export default Home;
