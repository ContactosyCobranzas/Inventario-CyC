import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./BackButton.css";

const BackButton = ({ onBack, to }) => {
  const handleClick = () => {
    if (onBack) {
      onBack();
    } else if (to) {
      // Si se especifica una ruta específica
      window.history.pushState({}, '', to);
    } else {
      // Ir a la página anterior
      window.history.back();
    }
  };

  return (
    <button className="back-btn" onClick={handleClick} title="Volver">
      <FaArrowLeft size={18} color="#FFD600" />
    </button>
  );
};

export default BackButton;
