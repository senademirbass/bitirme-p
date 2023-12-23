import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/proje.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMail, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Giriş Başarılı:", data.message);
        // Kullanıcı durumunu güncelleme, yönlendirme yapma vb. işlemler
        onLogin();
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.error("Giriş Hatası:", errorData.message);
        // Hata mesajını kullanıcıya gösterme veya başka işlemler
      }
    } catch (error) {
      console.error("İstek Hatası:", error.message);
      // İstek hatası durumunda başka işlemler
    }

    // Burada giriş yapma işlemleri gerçekleştirilebilir
    console.log("Email:", userMail);
    console.log("Password:", password);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div style={{ marginTop: 30 }}>
          <h2>Giriş Yap</h2>
          <form className="giris" onSubmit={handleLogin}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label>E-posta:</label>
              <input
                className="giris input"
                type="text"
                value={userMail}
                onChange={(e) => setUserMail(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label>Şifre:</label>
              <input
                className="giris input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button-form" type="submit">
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
