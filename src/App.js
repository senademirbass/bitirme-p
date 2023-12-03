import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Hakkımızda from "./components/Hakkımızda";
import Ekip from "./components/Ekip";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, [navigate]);
  return (
    <div className="App">
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
