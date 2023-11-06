import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hakkımızda from "./components/Hakkımızda";
import Hizmetler from "./components/Hizmetler";
import Ekip from "./components/Ekip";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Hakkımızda />} />
        <Route path="/services" element={<Hizmetler />} />
        <Route path="/team" element={<Ekip />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
