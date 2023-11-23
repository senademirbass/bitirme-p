import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import "../css/bootstrap.css";

export default function Header() {
  const pageName = "İyilik Denizi";
  const pageNameStyle = {
    fontSize: "40px",
    fontFamily: "Agbalumo",
    color: "#fff3cd",
  };
  return (
    <>
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <h1 className="navbar-brand" style={pageNameStyle}>
              {pageName}
            </h1>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/home">Ana Sayfa</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/about">Hakkımızda</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/team">Ekibimiz</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <Link to="/login">Giriş Yap | Üye Ol</Link>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
