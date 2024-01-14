import React from "react";

function Card({ title, description, image }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
        padding: "10px",
        width: "200px",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <h3 style={{ margin: "10px 0 5px", color: "#333" }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#555" }}>{description}</p>
    </div>
  );
}

export default Card;
