import React, { useState, useEffect } from "react";
import Card from "./cards/Card";
import "../css/proje.css";
import { useNavigate } from "react-router-dom";

// Kullanıcı oturum bilgilerini almak için
async function fetchSessionUser() {
  try {
    const response = await fetch("http://localhost:3001/api/session-user", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      console.error("Oturum bilgileri alınamadı.");
      return null;
    }
  } catch (error) {
    console.error("Oturum bilgileri alınamadı. Hata:", error);
    return null;
  }
}

function MyAds() {
  const navigate = useNavigate();
  const navigateToCreateAdPage = () => {
    navigate("/create-ad");
  };

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const sessionUser = await fetchSessionUser();
      setLoggedInUser(sessionUser);

      try {
        const response = await fetch("http://localhost:3001/api/cards");
        if (response.ok) {
          const data = await response.json();
          setCards(data);
        } else {
          console.error("Cards alınamadı.");
        }
      } catch (error) {
        console.error("Cards alınamadı. Hata:", error);
      }
    }

    fetchData();
  }, []);

  const handleVolunteer = async (userId, adId) => {
    try {
      // 1. Yardım ilanını güncelle, gönüllüyü ata ve durumu 'in progress' olarak değiştir
      const response = await fetch("http://localhost:3001/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userId, helpId: adId }),
      });

      if (response.ok) {
        console.log("Gönüllü atanması başarılı.");

        // 2. State'i güncelle ve ilanın durumunu 'in progress' olarak işaretle
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === adId
              ? { ...card, status: "in progress", volunteerId: userId }
              : card
          )
        );

        // Gerekirse başka bir işlem yapabilirsiniz
      } else {
        console.error("Gönüllü atanması başarısız.");
      }
    } catch (error) {
      console.error("Gönüllü atanması hatası:", error);
    }
  };

  return (
    <>
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.ad_title}
            description={card.ad_desc}
            finish={card.ad_finish}
          >
            {loggedInUser && card.status === "open" && (
              <button
                className="button-24"
                onClick={() => handleVolunteer(loggedInUser.userId, card.id)}
              >
                Gönüllü Ol
              </button>
            )}
          </Card>
        ))}
      </div>
      <div className="button-container">
        <button className="button-24" onClick={navigateToCreateAdPage}>
          Yeni İlan Oluştur
        </button>
      </div>
    </>
  );
}

export default MyAds;
