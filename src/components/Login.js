import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/proje.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nickname, password }),
      });

      if (response.ok) {
        // Giriş başarılı olduğunda
        const data = await response.json();
        console.log(data.message);

        onLogin({
          userId: data.userId,
          username: nickname,
        });

        // Giriş başarılı olduğunda anasayfaya yönlendirme
        navigate("/home");
      } else {
        // Giriş başarısız olduğunda
        const errorData = await response.json();
        console.error(errorData.message);
        toast.error("Giriş başarısız! Kullanıcı adı veya şifre hatalı.");
      }
    } catch (error) {
      console.error("İstek Hatası:", error.message);
      toast.error("İstek hatası oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            marginTop: 30,
          }}
        >
          <h2>Giriş Yap</h2>
          <form className="giris" onSubmit={handleLogin}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label>Kullanıcı Adı:</label>
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
            <button className="button-24" type="submit">
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
