import React from "react";
import "./LicenciasModal.css";

const licencias = [
  { equipo: "PC-001", licencia: "OEM-12345", software: "Windows 10 Pro" },
  { equipo: "PC-002", licencia: "OEM-67890", software: "Office 2021" },
  { equipo: "PC-003", licencia: "OEM-54321", software: "Antivirus Plus" },
];

const LicenciasModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="licencias-modal-overlay">
      <div className="licencias-modal-content">
        <h2>Licencias de Software</h2>
        <button className="licencias-modal-close" onClick={onClose}>X</button>
        <table className="licencias-modal-table">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Software</th>
              <th>Licencia</th>
            </tr>
          </thead>
          <tbody>
            {licencias.map((l, idx) => (
              <tr key={idx}>
                <td>{l.equipo}</td>
                <td>{l.software}</td>
                <td>{l.licencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LicenciasModal;
