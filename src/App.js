import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Hakkımızda from "./components/About";
import Ekip from "./components/Team";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Signup from "./components/Signup";
import MyProfile from "./components/MyProfile";
import ToDo from "./components/ToDo";
import MyAds from "./components/MyAds";
import SliderModal from "./components/SliderModal";
import CreateAdPage from "./components/CreateAdPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Hakkımızda />} />
        <Route path="/team" element={<Ekip />} />
        <Route
          path="/login"
          element={
            <Login
              onLogin={() => setIsLoggedIn(true)} // Kullanıcı giriş yaptığında bu callback'i çağır
            />
          }
        />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/myads" element={<MyAds />} />
        <Route path="/sliderModal" element={<SliderModal />} />
        <Route path="/create-ad" element={<CreateAdPage />} />
        {/* Set the default route to "/home" */}
        <Route index element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
