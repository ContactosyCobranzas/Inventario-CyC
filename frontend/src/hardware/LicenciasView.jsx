import React, { useState } from "react";
import BackButton from "../common/BackButton";
import "./LicenciasModal.css";
import AddLicenciaModal from "./AddLicenciaModal";
import EditLicenciaModal from "./EditLicenciaModal";
import { showToast } from "../common/toastNotify";

const initialLicencias = [
  { equipo: "PC-001", licencia: "OEM-12345", software: "Windows 10 Pro" },
  { equipo: "PC-002", licencia: "OEM-67890", software: "Office 2021" },
  { equipo: "PC-003", licencia: "OEM-54321", software: "Antivirus Plus" },
];

const LicenciasView = ({ onBack }) => {
  const [licencias, setLicencias] = useState(initialLicencias);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [licenciaEdit, setLicenciaEdit] = useState(null);

  const handleAddLicencia = (nuevaLicencia) => {
    setLicencias([...licencias, nuevaLicencia]);
    setModalOpen(false);
    showToast({
      type: "success",
      message: "Licencia añadida correctamente",
      icon: "success"
    });
  };

  const handleEditLicencia = (licenciaActualizada) => {
    setLicencias(licencias.map((l, idx) => idx === licenciaEdit.idx ? licenciaActualizada : l));
    setEditModalOpen(false);
    setLicenciaEdit(null);
    showToast({
      type: "success",
      message: "Licencia editada correctamente",
      icon: "success"
    });
  };

  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [idxEliminar, setIdxEliminar] = useState(null);

  const handleDeleteLicencia = (idx) => {
    setIdxEliminar(idx);
    setEliminarVisible(true);
  };

  const confirmarEliminar = () => {
    setLicencias(prev => prev.filter((_, i) => i !== idxEliminar));
    setEliminarVisible(false);
    setIdxEliminar(null);
    showToast({
      type: "success",
      message: "Licencia eliminada correctamente",
      icon: "success"
    });
  };

  const cancelarEliminar = () => {
    setEliminarVisible(false);
    setIdxEliminar(null);
  };

  return (
    <div className="licencias-modal-overlay" style={{ position: 'static', background: 'none', boxShadow: 'none' }}>
  <div className="licencias-modal-content" style={{ maxWidth: '800px', margin: '1rem auto 0 auto', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <BackButton onBack={onBack} />
            <h2 style={{ margin: 0 }}>Licencias de Software</h2>
          </div>
          <button
            style={{ padding: '0.5rem 1.2rem', background: '#ffd600', color: '#222', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
            onClick={() => setModalOpen(true)}
          >
            Añadir Licencia
          </button>
        </div>
        <table className="licencias-modal-table">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Software</th>
              <th>Licencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {licencias.map((l, idx) => (
              <tr key={idx}>
                <td>{l.equipo}</td>
                <td>{l.software}</td>
                <td>{l.licencia}</td>
                <td>
                  <button
                    style={{background:'#ffd600',color:'#222',border:'none',borderRadius:6,padding:'0.3em 1em',fontWeight:600,cursor:'pointer',marginRight:6}}
                    onClick={() => { setLicenciaEdit({ ...l, idx }); setEditModalOpen(true); }}
                  >Editar</button>
                  <button
                    style={{background:'#222',color:'#ffd600',border:'1.5px solid #ffd600',borderRadius:6,padding:'0.3em 1em',fontWeight:600,cursor:'pointer'}}
                    onClick={() => handleDeleteLicencia(idx)}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {eliminarVisible && (
          <div className="licencias-modal-overlay">
            <div className="licencias-modal-detalle">
              <div className="licencias-modal-header">
                <span style={{fontWeight:700,fontSize:'1.2rem',color:'#FFD600'}}>¿Eliminar licencia?</span>
                <button className="licencias-modal-close" onClick={cancelarEliminar}>&times;</button>
              </div>
              <div className="licencias-modal-body">
                <div className="licencias-modal-row" style={{color:'#fff'}}>
                  ¿Seguro que deseas eliminar esta licencia? Esta acción no se puede deshacer.
                </div>
              </div>
              <div className="licencias-modal-footer">
                <button style={{background:'rgba(2, 2, 2, 1)',color:'#FFD600',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={confirmarEliminar}>Eliminar</button>
                <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={cancelarEliminar}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
  <AddLicenciaModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddLicencia} />
  <EditLicenciaModal open={editModalOpen} onClose={() => { setEditModalOpen(false); setLicenciaEdit(null); }} onEdit={handleEditLicencia} licencia={licenciaEdit} />
    </div>
  );
};

export default LicenciasView;
