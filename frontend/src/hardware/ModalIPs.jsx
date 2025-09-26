import React, { useState, useEffect } from "react";
import "./ModalIPs.css";

const ModalIPs = ({ ipData, onSave, onClose }) => {
  const [ip, setIP] = useState("");
  const [status, setStatus] = useState("libre");
  const [equipoId, setEquipoId] = useState("");

  useEffect(() => {
    if (ipData) {
      setIP(ipData.ip || "");
      setStatus(ipData.status || "libre");
      setEquipoId(ipData.equipoId || "");
    } else {
      setIP("");
      setStatus("libre");
      setEquipoId("");
    }
  }, [ipData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ip, status, equipoId });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-animate modalips-modal" style={{
        maxWidth: 420,
        background: '#23272b',
        color: '#FFD600',
        borderRadius: '18px',
        boxShadow: '0 6px 32px rgba(0,0,0,0.85)',
        border: '1.5px solid #222',
        padding: '2.2rem 2.5rem 2rem 2.5rem',
      }}>
        <div className="modalips-header" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#FFD600', fontWeight: 700, fontSize: '2rem', margin: 0, letterSpacing: '0.01em' }}>{ipData ? "Editar IP" : "Agregar IP"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="modalips-form">
          <div className="modalips-form-group">
            <label>IP</label>
            <input value={ip} onChange={e => setIP(e.target.value)} required placeholder="Ej: 192.168.1.10" style={{width:'100%',background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:7,padding:'0.55rem 0.7rem',fontSize:'1.08rem',marginTop:'0.15rem',marginBottom:'0.1rem'}} />
          </div>
          <div className="modalips-form-group">
            <label>Estado</label>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{width:'100%',background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:7,padding:'0.55rem 0.7rem',fontSize:'1.08rem',marginTop:'0.15rem',marginBottom:'0.1rem'}}>
              <option value="libre">Libre</option>
              <option value="en uso">En uso</option>
            </select>
          </div>
          <div className="modalips-form-group">
            <label>ID Equipo</label>
            <input value={equipoId} onChange={e => setEquipoId(e.target.value)} placeholder="ID Equipo" style={{width:'100%',background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:7,padding:'0.55rem 0.7rem',fontSize:'1.08rem',marginTop:'0.15rem',marginBottom:'0.1rem'}} />
          </div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="submit" className="hardware-btn add">{ipData ? "Guardar" : "Agregar"}</button>
            <button type="button" className="hardware-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalIPs;
