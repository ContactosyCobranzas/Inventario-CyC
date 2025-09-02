import React from "react";
import "./VersionesModal.css";

const versiones = [
  { equipo: "PC-001", software: "Windows 10 Pro", version: "21H2" },
  { equipo: "PC-002", software: "Office 2021", version: "16.0.14326" },
  { equipo: "PC-003", software: "Antivirus Plus", version: "5.2.1" },
];

const VersionesModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="versiones-modal-overlay">
      <div className="versiones-modal-content">
        <h2>Versiones de Software</h2>
        <button className="versiones-modal-close" onClick={onClose}>X</button>
        <table className="versiones-modal-table">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Software</th>
              <th>Versión</th>
            </tr>
          </thead>
          <tbody>
            {versiones.map((v, idx) => (
              <tr key={idx}>
                <td>{v.equipo}</td>
                <td>{v.software}</td>
                <td>{v.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VersionesModal;
