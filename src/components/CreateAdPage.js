import React, { useState } from "react";
import "../css/proje.css";
import axios from "axios";

const CreateAdPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/createAd", {
        title,
        content,
        closingDate,
      });

      console.log("Kayıt başarılı", response.data);
      setSuccessMessage("İlan başarıyla oluşturuldu!");
      setErrorMessage(""); // Eğer önce bir hata mesajı varsa, onu temizle
    } catch (error) {
      console.log("Kayıt sırasında bir hata oluştu.", error.message);
      setErrorMessage(
        "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
      setSuccessMessage(""); // Eğer önce bir başarı mesajı varsa, onu temizle
    }
  };

  return (
    <>
      <h2 className="adTitle">Yeni İlan Oluştur</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="createAd">
        <form>
          <label>İlan Başlığı</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>İlan İçeriği</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <label>İlanın Kapanış Tarihi</label>
          <input
            type="date"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
          />

          <button type="button" className="button-24" onClick={handleSubmit}>
            İlanı Oluştur
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateAdPage;
