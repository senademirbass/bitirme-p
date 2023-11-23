import React from "react";

const teamMembers = [
  {
    id: 1,
    name: "Sena Demirbaş",
    role: "Founder and Developer",
    image: "team/member.jpeg",
    socialLinks: [
      { icon: "fa fa-twitter", url: "https://twitter.com/?lang=en" },
      {
        icon: "fa fa-linkedin",
        url: "https://www.linkedin.com/in/senaademirbas/",
      },
      { icon: "fa fa-instagram", url: "https://www.instagram.com/" },
      { icon: "fa fa-youtube-play", url: "https://www.youtube.com/" },
    ],
  },
  // Diğer takım üyeleri
];

export default function Ekip() {
  const title = "Ekip";

  return (
    <section className="team_section layout_padding">
      <div className="container-fluid">
        <div className="heading_container heading_center">
          <h2>{title}</h2>
        </div>
        <div className="team_container">
          <div className="row">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-lg-12">
                <div className="box">
                  <div className="img-box">
                    <img
                      src={member.image}
                      className="img1"
                      alt={member.name}
                    />
                  </div>
                  <div className="detail-box">
                    <h5>{member.name}</h5>
                    <p>{member.role}</p>
                  </div>
                  <div className="social_box">
                    {member.socialLinks.map((link, index) => (
                      <a key={index} href={link.url} target="_blank">
                        <i className={link.icon} aria-hidden="true"></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
