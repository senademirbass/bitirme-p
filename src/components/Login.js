import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/proje.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nickname, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Giriş Başarılı:", data.message);

        // Kullanıcı bilgilerini onLogin fonksiyonuna iletiliyor
        onLogin({
          userId: data.userId, // Örnek: Burada sunucudan gelen kullanıcı ID'sini kullanmalısınız
          username: nickname, // Örnek: Kullanıcı adını nickname olarak varsayıyoruz
        });
        // Navigate to profile page
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.error("Giriş Hatası:", errorData.message);
        toast.error("Giriş başarısız! Kullanıcı adı veya şifre hatalı.");
      }
    } catch (error) {
      console.error("İstek Hatası:", error.message);
      toast.error("İstek hatası oluştu. Lütfen tekrar deneyin.");
    }
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
              <label>Kullanıcı Adı</label>
              <input
                className="giris input"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
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
      {/*<ToastContainer position="bottom-right" />*/}
    </>
  );
};

export default Login;
