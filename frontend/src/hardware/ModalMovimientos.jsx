import React from "react";
import "./ModalMovimientos.css";

const ModalMovimientos = ({ open, onClose, equipos }) => {
  if (!open) return null;
  return (
    <div className="modalmov-overlay">
      <div className="modalmov-content">
        <h2>Movimientos Recientes</h2>
        <button className="modalmov-close" onClick={onClose}>X</button>
        <div className="modalmov-list">
          {equipos.map((eq, idx) => (
            <div key={idx} className="modalmov-equipo">
              <h4>{eq.nombre}</h4>
              <ul>
                {eq.movimientos.map((mov, mIdx) => (
                  <li key={mIdx}><b>{mov.fecha}:</b> {mov.descripcion}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalMovimientos;
