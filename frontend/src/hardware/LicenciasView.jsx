import React from "react";
import BackButton from "../common/BackButton";
import "./LicenciasModal.css";

const licencias = [
  { equipo: "PC-001", licencia: "OEM-12345", software: "Windows 10 Pro" },
  { equipo: "PC-002", licencia: "OEM-67890", software: "Office 2021" },
  { equipo: "PC-003", licencia: "OEM-54321", software: "Antivirus Plus" },
];

const LicenciasView = ({ onBack }) => {
  return (
    <div className="licencias-modal-overlay" style={{ position: 'static', background: 'none', boxShadow: 'none', minHeight: '100vh' }}>
      <div className="licencias-modal-content" style={{ maxWidth: '700px', margin: '2rem auto', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <BackButton onBack={onBack} />
          <h2 style={{ margin: 0 }}>Licencias de Software</h2>
        </div>
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

export default LicenciasView;
