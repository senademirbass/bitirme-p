import React, { useState } from "react";
import Signup from "./NewMember";
import "../css/proje.css";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Burada giriş yapma işlemleri gerçekleştirilebilir
    console.log("Username/Email:", usernameOrEmail);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
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
              <label>Kullanıcı Adı veya E-posta:</label>
              <input
                className="giris input"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
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
            <div
              style={{
                display: "flex",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label>Beni Hatırla</label>
            </div>
            <button className="button-form" type="submit">
              Giriş Yap
            </button>
          </form>
        </div>
        <Signup />
      </div>
    </>
  );
};

export default Login;
