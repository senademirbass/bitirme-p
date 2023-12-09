import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Hakkımızda from "./components/Hakkımızda";
import Ekip from "./components/Ekip";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  const [backendData, setBackEndData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackEndData(data);
      });
  }, []);
  /*const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, [navigate]);*/
  return (
    <div className="App">
      {typeof backendData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Hakkımızda />} />
        <Route path="/team" element={<Ekip />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
