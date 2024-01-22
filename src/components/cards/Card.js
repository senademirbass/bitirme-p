import React from "react";

function Card({ title, description, finish }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
        padding: "10px",
        width: "200px",
        height: "200px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        ":hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <h3 style={{ margin: "10px 0 5px", color: "#333" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#555" }}>{description}</p>
      <p style={{ fontSize: "12px", color: "#777" }}>{finish}</p>
      <button className="button-24">Gönüllü Ol</button>
    </div>
  );
}

export default Card;
