import React from "react";
import "../css/style.css";
import "../css/bootstrap.css";
import Slider from "./Slider";
export default function Hakkımızda() {
  const titleAbout = "İyilik Denizi Nedir?";
  return (
    <>
      <section className="about_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 style={{ fontFamily: "Agbalumo", color: "#fff3cd" }}>
              Hakkımızda
            </h2>
            <p>
              Bu platform yardıma ihtiyaç duyan insanlarla, yardım etmek isteyen
              binlerce gönüllüyü tek bir platform üzerinde birleştirmek ve
              yardımlaşmak için kurulmuştur.
            </p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <Slider />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <h3 style={{ color: "#fff3cd" }} className="shaking-text">
                  {titleAbout}
                </h3>
                <p>
                  <strong>'İyilik Denizi'</strong> 2023 yılında Kocaeli
                  Üniversitesi, Bilişim Sistemleri Mühendisliği 4.sınıf
                  öğrencisi Sena Demirbaş tarafından, sosyal yardımı ve toplum
                  bağlarını güçlendirmek adına kurulmuştur.
                </p>
                <p>
                  Platformun amacı yardıma ihtiyacı olan insanların buradan
                  sesini duyurabilmesi, aynı zamanda yardım etmek isteyen
                  gönüllülerin de bu yardımlara bu platform üzerinden cevap
                  verebilmesini sağlamaktır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
