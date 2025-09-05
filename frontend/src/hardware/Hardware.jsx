import React from "react";
import { FaDesktop, FaLaptop, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
    icon: <FaLaptop className="hardware-icon hardware-itodas perrascon-unified" />,
    title: "PC Tipos",
    value: 8,
    desc: "Tipos de PC configurados en el sistema.",
    link: "Ver PC Tipos"
  }
];
// - --- -.. .- ... / .--. . .-. .-. .- ...

const Hardware = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }}
          title="Volver"
        >
          <FaArrowLeft size={24} />
        </button>
        <h2 style={{ margin: 0 }}>Hardware</h2>
      </div>
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
