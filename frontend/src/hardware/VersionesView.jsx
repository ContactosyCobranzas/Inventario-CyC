import React from "react";
import BackButton from "../common/BackButton";
import "./VersionesModal.css";

const versiones = [
  { equipo: "PC-001", software: "Windows 10 Pro", version: "21H2" },
  { equipo: "PC-002", software: "Office 2021", version: "16.0.14326" },
  { equipo: "PC-003", software: "Antivirus Plus", version: "5.2.1" },
];

const VersionesView = ({ onBack }) => {
  return (
    <div className="versiones-modal-overlay" style={{ position: 'static', background: 'none', boxShadow: 'none', minHeight: '100vh' }}>
      <div className="versiones-modal-content" style={{ maxWidth: '700px', margin: '2rem auto', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <BackButton onBack={onBack} />
          <h2 style={{ margin: 0 }}>Versiones de Software</h2>
        </div>
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

export default VersionesView;
