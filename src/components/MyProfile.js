import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    fetch("http://localhost:3001/api/profile", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kullanıcı bilgileri alınamadı."); // 401 hatası kontrolü
        }
        return response.json();
      })
      .then((data) => {
        console.log("Gelen kullanıcı bilgileri:", data);
        setUserData(data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  return (
    <>
      <h1>PROFİLİM</h1>
      <form>
        {formFields.map((field) => (
          <div key={field.key}>
            <label>{field.label}:</label>
            <input type={field.type} value={userData[field.key]} disabled />
          </div>
        ))}
      </form>
    </>
  );
}

export default MyProfile;
