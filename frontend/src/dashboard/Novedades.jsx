import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import BackButton from "../common/BackButton";
import "./Novedades.css";

const novedades = [
  {
    titulo: "Nuevo módulo de inventario",
    descripcion: "Ahora puedes gestionar inventario de hardware y usuarios desde una sola vista.",
    fecha: "25/08/2025"
  },
  {
    titulo: "Mejoras en seguridad",
    descripcion: "Se implementó autenticación reforzada y notificaciones de acceso.",
    fecha: "20/08/2025"
  },
  {
    titulo: "Actualización de interfaz",
    descripcion: "La interfaz del dashboard fue renovada para una mejor experiencia de usuario.",
    fecha: "15/08/2025"
  }
];

const Novedades = ({ onBack }) => {
  return (
    <div className="novedades-container">
      <div className="novedades-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <BackButton onBack={onBack} />
        <FaRegNewspaper className="novedades-icon" />
        <h2 className="novedades-title">Novedades</h2>
      </div>
      <div className="novedades-timeline">
        {novedades.map((item, idx) => (
          <div className="novedad-timeline-item" key={idx}>
            <div className="novedad-timeline-dot" />
            <div className="novedad-timeline-content">
              <div className="novedad-header">
                <h3>{item.titulo}</h3>
                <span className="novedad-fecha">{item.fecha}</span>
              </div>
              <p className="novedad-desc">{item.descripcion}</p>
            </div>
          </div>
        ))}
        <div className="novedades-timeline-line" />
      </div>
    </div>
  );
};

export default Novedades;
