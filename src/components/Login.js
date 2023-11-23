import React, { useState } from "react";
import Signup from "./NewMember";

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
            <div>
              <label>Kullanıcı Adı veya E-posta:</label>
              <input
                className="giris input"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="example@....com"
              />
            </div>
            <div>
              <label>Şifre:</label>
              <input
                className="giris input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Beni Hatırla
              </label>
            </div>
            <button className="giris button" type="submit">
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
