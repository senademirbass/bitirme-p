import React, { useState, useEffect } from "react";
import "../css/proje.css";

function MyProfile() {
  const [userData, setUserData] = useState({
    userName: "",
    userSurName: "",
    userMail: "",
    userPhone: "",
    userAddress: "",
    userType: "",
    userNickName: "",
  });

  const formFields = [
    { label: "Ad", key: "userName", type: "text" },
    { label: "Soyad", key: "userSurName", type: "text" },
    { label: "Email", key: "userMail", type: "text" },
    { label: "Telefon Numarası", key: "userPhone", type: "number" },
    { label: "Adres", key: "userAddress", type: "text" },
    { label: "Üyelik Türü", key: "userType", type: "text" },
    { label: "Kullanıcı Adı", key: "userNickName", type: "text" },
  ];

  return (
    <div className="bodyBox">
      <form className="form">
        <h1 className="profileTitle">Profil Bilgileri</h1>
        <hr></hr>
        {formFields.map((field) => (
          <div key={field.key}>
            <label>{field.label}:</label>
            <input type={field.type} value={userData[field.key]} disabled />
          </div>
        ))}
      </form>
    </div>
  );
}

export default MyProfile;
