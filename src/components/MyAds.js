import React, { useState } from "react";
import Card from "./cards/Card";
import AdDetailModal from "./AdDetailModal.js"; // Örnek bir modal bileşeni
import CreateAdModal from "./CreateAdModal";
import ads from "../photos/ads.png";
import ads2 from "../photos/ads2.png";
import "../css/proje.css";

const images = [ads, ads2];

const adsData = [
  {
    id: 1,
    title: "Ödevler İçin Yardım",
    description:
      "Ben [''], ['' / ''] öğrencisiyim. Bu dönem aldığım [Ders Adı] dersinin ödevi için yardıma ihtiyacım var. Konuyla ilgili detaylı bilgiye ve ödevin gereksinimlerine hakim olan birinden yardım almak istiyorum. Ödevde işlenen konular arasında [Konu 1], [Konu 2], ve [Konu 3] bulunmaktadır. Yardımcı olabilecek, bu konularda deneyim sahibi olan birini bekliyorum. Özellikle [Özel bir talep / ''] konusunda destek sağlamak önemlidir. Eğer konuyla ilgili bilgi sahibi ve yardıma hazırsanız, lütfen bana [İletişim Bilgileri] üzerinden ulaşın. Ayrıca, öğrencilere yardım etmekten keyif alan, bu konuda deneyimli olan herkesin başvurusu beni memnun eder.",
    image: images[0],
  },
  {
    id: 2,
    title: "Alışveriş Yardımı",
    description:
      "Merhaba, Ben [''], [''] yaşında biriyim. Bu zorlu zamanlarda, alışveriş yapmam gerekiyor ancak kendi başıma bu görevi yerine getiremiyorum. Sağlık sorunlarından dolayı alışveriş konusunda destek arıyorum. Eğer alışveriş yapmak ve benim için temel ihtiyaçları temin etmek konusunda yardımcı olabilecek birini bulabilirsem çok mutlu olurum. Temel gıda ürünleri, ilaçlar veya diğer günlük ihtiyaçlarım konusunda yardım bekliyorum. Eğer bu konuda yardımcı olabilecek bir kişi varsa, lütfen bana [''] üzerinden ulaşın. Sağlıklı ve güvende kalmanız dileğiyle.",
    image: images[1],
  },
];

function MyAds() {
  const [isCreateAdModalOpen, setIsCreateAdModalOpen] = useState(false);
  const [isAdDetailModalOpen, setIsAdDetailModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const openCreateAdModal = () => {
    console.log("Yeni İlan Oluştur Modal Açılıyor...");
    setIsCreateAdModalOpen(true);
  };

  const openAdDetailModal = (ad) => {
    console.log("İlan Detay Modal Açılıyor...");
    setSelectedAd(ad);
    setIsAdDetailModalOpen(true);
  };

  const closeCreateAdModal = () => {
    console.log("Yeni İlan Oluştur Modal Kapanıyor...");
    setIsCreateAdModalOpen(false);
  };

  const closeAdDetailModal = () => {
    console.log("İlan Detay Modal Kapanıyor...");
    setSelectedAd(null);
    setIsAdDetailModalOpen(false);
  };

  const handleSaveAd = (newAd) => {
    console.log("Yeni İlan:", newAd);
    // Yeni ilanı adsData dizisine eklemek gibi işlemler yapabilirsiniz
    // ...
    closeCreateAdModal();
  };

  return (
    <>
      <div className="adsBox">
        {adsData.map((ad) => (
          <div key={ad.id}>
            <Card title={ad.title} image={ad.image} />
            <button className="button-80" onClick={() => openAdDetailModal(ad)}>
              İncele
            </button>
          </div>
        ))}
      </div>
      <div>
        <button className="button-ads" onClick={openCreateAdModal}>
          Yeni İlan Oluştur
        </button>
      </div>

      {isCreateAdModalOpen && (
        <CreateAdModal onClose={closeCreateAdModal} onSave={handleSaveAd} />
      )}

      {isAdDetailModalOpen && (
        <AdDetailModal ad={selectedAd} onClose={closeAdDetailModal} />
      )}
    </>
  );
}

export default MyAds;
