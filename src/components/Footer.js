import React from "react";
import "../css/style.css";
import "../css/bootstrap.css";
import { Link } from "react-router-dom";

function Footer() {
  const location =
    "https://www.google.com/maps/place/Kocaeli+%C3%9Cniversitesi/@40.8221772,29.9190714,17z/data=!3m1!4b1!4m6!3m5!1s0x14cb5badf629fe45:0xc81fa849234e8755!8m2!3d40.8221732!4d29.9216517!16s%2Fm%2F026l203?hl=tr-TR&entry=tts&shorturl=1";
  const mail = "demirbassena139@gmail.com";
  const social = "https://www.linkedin.com/in/senaademirbas/";
  return (
    <>
      <footer className="info_section layout_padding2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 info_col">
              <div className="info_contact">
                <h4>İletişim Bilgileri</h4>
                <div className="contact_link_box">
                  <a href={location} target={"_blank"}>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    <span>Konum</span>
                  </a>
                  <a href={`mailto:${mail}`}>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span>Mail</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 info_col">
              <div className="info_detail">
                <h4>Info</h4>
                <p style={{ color: "#002b64" }}>
                  Bu web sitesi Sena Demirbaş tarafından oluşturulmuştur.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-2 mx-auto info_col">
              <div className="info_link_box">
                <h4>Links</h4>
                <div className="info_links">
                  <a>
                    <Link style={{ color: "#002b64" }} to="/home">
                      Ana Sayfa
                    </Link>
                  </a>
                  <a>
                    <Link style={{ color: "#002b64" }} to="/about">
                      Hakkımızda
                    </Link>
                  </a>
                  <a>
                    <Link style={{ color: "#002b64" }} to="/team">
                      Ekibimiz
                    </Link>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 info_col">
              <h4>Sosyal Medya</h4>
              <div className="info_links">
                <a href={social} target={"_blank"}>
                  <i
                    className="fa fa-linkedin"
                    style={{ color: "#002b64" }}
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
