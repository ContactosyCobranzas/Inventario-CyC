import React from "react";
import { FaDesktop, FaLaptop } from "react-icons/fa";
import "./Hardware.css";

const summaryData = [
  {
    icon: <FaDesktop className="hardware-icon hardware-icon-unified" />,
    title: "PCs de Escritorio",
    value: 12,
    desc: "Equipos de escritorio activos en la empresa.",
    link: "Ver PCs"
  },
  {
    icon: <FaLaptop className="hardware-icon hardware-icon-unified" />,
    title: "Laptops",
    value: 8,
    desc: "Laptops asignadas y disponibles.",
    link: "Ver Laptops"
  }
];

const Hardware = () => {
  return (
    <div>
      <h2 style={{marginBottom: '2rem'}}>Hardware</h2>
      <div className="hardware-summary-grid">
        {summaryData.map((item, idx) => (
          <div className="hardware-summary-card" key={idx}>
            {item.icon}
            <div className="hardware-summary-title">{item.title}</div>
            <div className="hardware-summary-value">{item.value}</div>
            <div className="hardware-summary-desc">{item.desc}</div>
            <div className="hardware-summary-link">{item.link}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hardware;
