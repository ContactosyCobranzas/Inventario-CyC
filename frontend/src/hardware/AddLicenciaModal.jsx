import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./Hardware.css";

const initialForm = {
  equipo: "",
  software: "",
  licencia: "",
  acciones: ""
};
// 
const AddLicenciaModal = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(form);
    setForm(initialForm);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" style={{zIndex:9999}}>
  <div className="modal-content modal-animate" style={{minWidth:360, maxWidth:420, padding:'2.5rem 2.5rem', background:'#181818', border:'2.5px solid #ffe600', borderRadius:18, boxShadow:'0 8px 32px rgba(0,0,0,0.45)'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.8rem', justifyContent: 'flex-start' }}>
          <FaPlusCircle size={28} color="#ffd600" />
          <span style={{ fontWeight: 700, color: '#ffd600', fontSize: '1.35rem', letterSpacing: 0.5 }}>Añadir licencia</span>
        </div>
        <form onSubmit={handleSubmit} className="add-licencia-form">
          <div className="form-row" style={{marginBottom:'1.2rem', display:'flex', flexDirection:'column', gap:'0.7rem'}}>        
            <label style={{color:'#ffe600', fontWeight:600, fontSize:'1.08em', marginBottom:'0.3rem'}}>Equipo:</label>
            <input name="equipo" value={form.equipo} onChange={handleChange} required style={{padding:'0.9em 1em',borderRadius:8,fontSize:'1.08em',border:'1px solid #ffe600',width:'90%',background:'#181818',color:'#ffe600',fontWeight:700,marginTop:'0.1rem'}} />
          </div>
          <div className="form-row" style={{marginBottom:'1.2rem', display:'flex', flexDirection:'column', gap:'0.7rem'}}>
            <label style={{color:'#ffe600', fontWeight:600, fontSize:'1.08em', marginBottom:'0.3rem'}}>Software:</label>
            <input name="software" value={form.software} onChange={handleChange} required style={{padding:'0.9em 1em',borderRadius:8,fontSize:'1.08em',border:'1px solid #ffe600',width:'90%',background:'#181818',color:'#ffe600',fontWeight:700,marginTop:'0.1rem'}} />
          </div>
          <div className="form-row" style={{marginBottom:'1.2rem', display:'flex', flexDirection:'column', gap:'0.7rem'}}>
            <label style={{color:'#ffe600', fontWeight:600, fontSize:'1.08em', marginBottom:'0.3rem'}}>Licencia:</label>
            <input name="licencia" value={form.licencia} onChange={handleChange} required style={{padding:'0.9em 1em',borderRadius:8,fontSize:'1.08em',border:'1px solid #ffe600',width:'90%',background:'#181818',color:'#ffe600',fontWeight:700,marginTop:'0.1rem'}} />
          </div>

          <div style={{ marginTop: "2.2rem", display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <button type="button" className="hardware-btn" style={{background:'#181818',color:'#ffe600',border:'none',fontWeight:600,padding:'0.7em 2em',borderRadius:8,fontSize:'1.08em',boxShadow:'0 1px 8px #000'}} onClick={onClose}>Cancelar</button>
            <button type="submit" className="hardware-btn add" style={{background:'#ffe600',color:'#222',border:'none',fontWeight:700,padding:'0.7em 2em',borderRadius:8,fontSize:'1.08em',boxShadow:'0 1px 8px #ffe600'}}>
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLicenciaModal;
