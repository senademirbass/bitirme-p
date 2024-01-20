import React from "react";
import ServiceBox from "./ServiceBox";

const ServiceSectionHome = () => {
  const main_title = "Burada Neler Yapabilirsin?";
  const titleClassName = "custom-title";

  const services = [
    {
      id: 0,
      title: "NEYE İHTİYACIN VAR?",
      description:
        "Yardıma ihtiyacın olan konu için bir ilan aç, gönüllülerle iletişime geç, sana en uygun çözümü bul!",
      content:
        "Eğer yardıma ihtiyacın olan bir konu varsa, çözüm bulmaya yönelik adımlar atabilirsin. İhtiyacın olan yardımı almak için bir ilan açabilir ve gönüllülerle iletişime geçebilirsin. Hangi konuda destek aradığını belirtmek, yardım isteğini netleştirmek ve beklentilerini ifade etmek, senin için en uygun çözümü bulman açısından önemlidir. Bu sayede, çevrendeki insanlar ya da ilgili platformlardaki gönüllüler, senin talebine uygun yardım sağlayabilir.",
    },
    {
      id: 1,
      title: "NASIL YARDIM EDEBİLİRİM?",
      description:
        "İnsanlara yardım etmek istiyorsan gönüllü olabilir, ilanlardan yapabileceğin yardımı seçebilirsin!",
      content:
        "Eğer insanlara yardım etmek istiyorsan, gönüllü olmak harika bir yol olabilir. Toplum içinde ihtiyaç duyan insanlara destek sağlamak, birçok insan için anlam dolu bir deneyim olabilir. Gönüllülük, kişisel gelişimine katkıda bulunmanın yanı sıra, toplumda pozitif bir etki yaratma fırsatı da sunar. İlanlardan yapabileceğin yardımı seçmek, yeteneklerini ve ilgi alanlarını göz önünde bulundurarak kendine en uygun görevi bulmana yardımcı olabilir. Örneğin, bir çocuğa okuma yardımı yapabilir, yaşlı bir komşuna alışverişte yardımcı olabilir ya da toplum etkinliklerinde görev alabilirsin. Hangi alanda yardım etmek istediğine karar vererek, ihtiyaç sahipleriyle bağlantı kurabilir ve onlara destek olabilirsin. ÜYE OL ve aramıza katıl!",
    },
    {
      id: 2,

      title: "YARDIM KURULUŞU İSEK?",
      description:
        "Yardım kuruluşu ya da sivil toplum kuruluşu iseniz, burada bir bağış kampanyası oluşturmanız mümkün!",
      content:
        "Eğer bir yardım kuruluşu ya da sivil toplum kuruluşu olarak faaliyet gösteriyorsanız, topluma daha fazla katkıda bulunmak ve destek almak adına etkili bir bağış kampanyası düzenlemek harika bir fırsattır. Bağış kampanyası oluşturarak, misyonunuz ve hedefleriniz doğrultusunda toplumun geniş bir kesimine ulaşabilir ve daha fazla destek elde edebilirsiniz. Kampanya metni, kuruluşunuzun vizyonunu, gerçekleştirmeyi hedeflediği projeleri ve bu projelerin toplum üzerindeki olumlu etkilerini vurgulayarak bağış yapmak isteyenleri bilgilendirebilirsiniz. Ayrıca, bağış yapmanın ne kadar büyük bir fark yaratabileceğini vurgulayarak insanların duygusal bağ kurmalarına da olanak tanıyabilirsiniz. Online platformlardan sosyal medya mecralarına kadar geniş bir iletişim ağı kullanarak kampanyanızı duyurabilir ve bağışçılardan destek talep edebilirsiniz. Unutulmamalıdır ki, şeffaflık ve güvenilirlik, bağışçıların daha istekli ve güçlü bir şekilde katılmasını sağlayabilir.",
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
                title={service.title}
                description={service.description}
                content={service.content}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSectionHome;
