import React, { useState, useEffect } from "react";
import "../css/proje.css";

function MyProfile() {
  const [userData, setUserData] = useState({
    userName: "",
    userSurname: "",
    userMail: "",
    userPhone: "",
    userAddress: "",
    userType: "",
    userNickname: "",
  });

  const formFields = [
    { label: "Ad", key: "userName", type: "text" },
    { label: "Soyad", key: "userSurname", type: "text" },
    { label: "Email", key: "userMail", type: "text" },
    { label: "Telefon Numarası", key: "userPhone", type: "number" },
    { label: "Adres", key: "userAddress", type: "text" },
    { label: "Üyelik Türü", key: "userType", type: "text" },
    { label: "Kullanıcı Adı", key: "userNickname", type: "text" },
  ];

  useEffect(() => {
    // Bu kısımda kullanıcının profil bilgilerini getiren bir API çağrısı yapmalısınız
    fetch("http://localhost:3001/api/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUserData(data.userProfile))
      .catch((error) => console.error("Profil bilgileri getirilemedi:", error));
  }, []);

  return (
    <div className="bodyBox">
      <form className="form">
        <h1 className="profileTitle">Profil Bilgileri</h1>
        <hr></hr>
        {formFields.map((field) => (
          <div key={field.key}>
            <label>{field.label}:</label>
            <input
              type={field.type}
              value={userData ? userData[field.key] : ""}
              disabled
            />
          </div>
        ))}
      </form>
    </div>
  );
}

export default MyProfile;
