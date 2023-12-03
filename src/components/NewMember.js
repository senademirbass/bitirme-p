import React, { useState } from "react";
import "../css/proje.css";

const Signup = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    // Burada üye olma işlemleri gerçekleştirilebilir
    console.log("New Username:", newUsername);
    console.log("New Email:", newEmail);
    console.log("New Password:", newPassword);
  };

  return (
    <div>
      {/* Üye Ol Formu */}
      <div style={{ marginTop: 30, marginBottom: 20 }}>
        <h2>Üye Ol</h2>
        <form className="uyeOl" onSubmit={handleSignup}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Kullanıcı Adı:</label>
            <input
              className="uyeOl input"
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>E-posta:</label>
            <input
              className="uyeOl input"
              type="email"
              value={newEmail}
              placeholder="example@....com"
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <label>Şifre:</label>
            <input
              className="uyeOl input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
