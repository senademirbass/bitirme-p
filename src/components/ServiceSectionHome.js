import React from "react";
import ServiceBox from "./ServiceBox";

const ServiceSectionHome = () => {
  const main_title = "Burada Neler Yapabilirsin?";
  const titleClassName = "custom-title";
  const services = [
    {
      id: 0,
      imageSrc: "/yardım_icons/yardım_iste.png",
      title: "NEYE İHTİYACIN VAR?",
      description:
        "Yardıma ihtiyacın olan konu için bir ilan aç, gönüllülerle iletişime geç, sana en uygun çözümü bul!",
    },
    {
      id: 1,
      imageSrc: "/yardım_icons/yardım_et.png",
      title: "NASIL YARDIM EDEBİLİRİM?",
      description:
        "İnsanlara yardım etmek istiyorsan gönüllü olabilir, ilanlardan yapabileceğin yardımı seçebilirsin!",
    },
    {
      id: 2,
      imageSrc: "/yardım_icons/bagıs.png",
      title: "YARDIM KURULUŞU İSEK?",
      description:
        "Yardım kuruluşu ya da sivil toplum kuruluşu iseniz, burada bir bağış kampanyası oluşturmanız mümkün!",
    },
  ];

  return (
    <section className="service_section layout_padding">
      <div className="service_container">
        <div className="container">
          <div className="heading_container heading_center">
            <h2 className={titleClassName}>{main_title}</h2>
            <p></p>
          </div>
          <div className="row">
            {services.map((service, index) => (
              <ServiceBox
                key={index}
                id={service.id}
                imageSrc={service.imageSrc}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSectionHome;
