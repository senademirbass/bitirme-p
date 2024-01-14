import React, { useState } from "react";
import "../css/proje.css";

const CreateAdModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [closingDate, setClosingDate] = useState("");

  const handleSave = () => {
    // İlanı kaydetme işlemleri
    onSave({
      title,
      content,
      closingDate,
    });

    // Modal'ı kapatma
    onClose();
  };

  const handleImageUpload = (files) => {
    const selectedImage = files[0]; // Sadece bir resim seçmesine izin veriyoruz
    if (selectedImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Resmin önizlemesini göstermek için burada bir state güncellemesi yapabilirsiniz
        // Örneğin, setPreviewImage(reader.result);
        console.log("Resim Yüklendi:", reader.result);
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div className="adModal" onClick={onClose}>
      <div className="adModal-content" onClick={(e) => e.stopPropagation()}>
        <span className="adModalClose">&times;</span>
        <h2>Yeni İlan Oluştur</h2>
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

        <label>İlan Resmi</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e.target.files)}
        />

        <label>İlanın Kapanış Tarihi</label>
        <input
          type="date"
          value={closingDate}
          onChange={(e) => setClosingDate(e.target.value)}
        />

        <button type="button" onClick={handleSave}>
          İlanı Oluştur
        </button>
      </div>
    </div>
  );
};

export default CreateAdModal;
