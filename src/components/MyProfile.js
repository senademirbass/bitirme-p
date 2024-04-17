import React, { useState, useEffect } from "react";
import "../css/proje.css";

function MyProfile() {
  const [userData, setUserData] = useState({
    user_id: "",
    userName: "",
    userSurname: "",
    userMail: "",
    userPhone: "",
    userAddress: "",
    userType: "",
    userNickname: "",
  });

  const [isEditable, setIsEditable] = useState(false); // Düzenleme durumu
  const [editedFields, setEditedFields] = useState({}); // Değiştirilmiş alanlar

  useEffect(() => {
    fetch("http://localhost:3001/api/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUserData(data.userProfile))
      .catch((error) => console.error("Profil bilgileri getirilemedi:", error));
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedUserData = { ...userData, ...editedFields };

      const response = await fetch("http://localhost:3001/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedUserData),
      });
      const data = await response.json();
      console.log(data.message); // API'den gelen yanıtı kontrol et
      setIsEditable(false); // Düzenleme modunu kapat
      setEditedFields({}); // Değiştirilmiş alanları sıfırla
    } catch (error) {
      console.error("Profil bilgileri güncellenirken hata oluştu:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable); // Düzenleme durumunu tersine çevir
  };

  const handleFieldChange = (key, value) => {
    setEditedFields({ ...editedFields, [key]: value });
  };

  return (
    <div className="bodyBox">
      <form className="form">
        <h1 className="profileTitle">Profil Bilgileri</h1>
        <hr />
        {Object.keys(userData).map((key) => (
          <div key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type="text"
              value={editedFields[key] || userData[key]}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              disabled={key === "user_id" || !isEditable}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={isEditable ? handleUpdate : handleEditToggle}
        >
          {isEditable ? "Kaydet" : "Düzenle"}
        </button>
      </form>
    </div>
  );
}

export default MyProfile;
