import React from "react";
import { FaDesktop, FaLaptop } from "react-icons/fa";
import "./Hardware.css";

const summaryData = [
  {
    icon: <FaDesktop className="hardware-icon hardware-icon-unified" />,
    title: "PC Items",
    value: 12,
    desc: "Total de ítems de PC registrados.",
    link: "Ver PC Items"
  },
  {
    icon: <FaLaptop className="hardware-icon hardware-icon-unified" />,
    title: "Equipos",
    value: 20,
    desc: "Total de equipos registrados.",
    link: "Ver Equipos"
  },
  {
    icon: <FaLaptop className="hardware-icon hardware-icon-unified" />,
    title: "PC Tipos",
    value: 8,
    desc: "Tipos de PC configurados en el sistema.",
    link: "Ver PC Tipos"
  }
];

const Computers = () => {
  return (
    <div>
      <h2 style={{marginBottom: '2rem'}}>Computers</h2>
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

export default Computers;
