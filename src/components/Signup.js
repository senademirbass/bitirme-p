import React, { useState } from "react";
import axios from "axios";
import "../css/proje.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [userNickName, setUserNickName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/register", {
        userName,
        userSurname,
        userMail,
        userPhone,
        userAddress,
        userPassword,
        userType,
        userNickName,
      });

      console.log("Kayıt başarılı", response.data);

      // Başarı "toast" mesajını göster
      toast.success("Kayıt başarılı");
    } catch (error) {
      console.log("Kayıt sırasında bir hata oluştu.", error.message);

      // Hata "toast" mesajını göster
      toast.error("Kayıt sırasında bir hata oluştu.");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <ToastContainer />
      {/* Üye Ol Formu */}
      <div style={{ marginTop: 30, marginBottom: 20 }}>
        <h2>Üye Ol</h2>
        <form className="uyeOl" onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Kullanıcı isim:</label>
            <input
              className="uyeOl input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Kullanıcı soyisim:</label>
            <input
              className="uyeOl input"
              type="text"
              value={userSurname}
              onChange={(e) => setUserSurname(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>E-posta:</label>
            <input
              className="uyeOl input"
              type="email"
              value={userMail}
              placeholder="example@....com"
              onChange={(e) => setUserMail(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Telefon No:</label>
            <input
              className="uyeOl input"
              type="number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Adres:</label>
            <input
              className="uyeOl input"
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Şifre:</label>
            <input
              className="uyeOl input"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Kullanıcı Türü:</label>
            <input
              className="uyeOl input"
              type="text"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Kullanıcı Adı:</label>
            <input
              className="uyeOl input"
              type="text"
              value={userNickName}
              onChange={(e) => setUserNickName(e.target.value)}
              required
            />
          </div>
          <button className="button-form" type="submit">
            Üye Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
