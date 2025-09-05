import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import BackButton from "../common/BackButton";
import "./Reportes.css";

const reportes = [
  {
    titulo: "Fallo en impresora de recepción",
    descripcion: "La impresora principal no responde desde el 25/08. Se solicitó soporte técnico.",
    fecha: "26/08/2025"
  },
  {
    titulo: "Problema de acceso a red",
    descripcion: "Algunos usuarios reportan desconexión intermitente en la red WiFi.",
    fecha: "22/08/2025"
  },
  {
    titulo: "Error en sistema de inventario",
    descripcion: "Se detectó un bug menor al registrar nuevos equipos. En revisión por desarrollo.",
    fecha: "18/08/2025"
  }
];

const Reportes = ({ onBack }) => {
  return (
    <div className="reportes-container">
      <div className="reportes-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <BackButton onBack={onBack} />
        <FaRegCommentDots className="reportes-icon" />
        <h2 className="reportes-title">Reportes</h2>
      </div>
      <div className="reportes-list">
        {reportes.map((item, idx) => (
          <div className="reporte-card" key={idx}>
            <div className="reporte-header">
              <h3>{item.titulo}</h3>
              <span className="reporte-fecha">{item.fecha}</span>
            </div>
            <p className="reporte-desc">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportes;
