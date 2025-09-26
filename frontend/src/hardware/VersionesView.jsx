import React, { useState } from "react";
import BackButton from "../common/BackButton";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import GlobalToastContainer from "../common/GlobalToastContainer";
import { showToast } from "../common/toastNotify";
import "./VersionesModal.css";

const versionesMock = [
  { equipo: "PC-001", software: "Windows 10 Pro", version: "21H2" },
  { equipo: "PC-002", software: "Office 2021", version: "16.0.14326" },
  { equipo: "PC-003", software: "Antivirus Plus", version: "5.2.1" },
];

const VersionesView = ({ onBack }) => {
  const [versiones, setVersiones] = useState(versionesMock);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ equipo: "", software: "", version: "" });

  const versionesFiltradas = versiones.filter(v =>
    v.equipo.toLowerCase().includes(search.toLowerCase()) ||
    v.software.toLowerCase().includes(search.toLowerCase()) ||
    v.version.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setForm({ equipo: "", software: "", version: "" });
    setShowAdd(true);
    setEditIdx(null);
  };
  const handleEdit = idx => {
    setForm(versiones[idx]);
    setEditIdx(idx);
    setShowAdd(true);
  };
  const handleDelete = idx => {
    setVersiones(versiones.filter((_, i) => i !== idx));
    showToast({ message: "Versión eliminada correctamente", type: "success", theme: "dark" });
  };
  const handleSave = e => {
    e.preventDefault();
    if (!form.equipo || !form.software || !form.version) return;
    if (editIdx !== null) {
      const arr = [...versiones];
      arr[editIdx] = form;
      setVersiones(arr);
      showToast({ message: "Versión editada correctamente", type: "success", theme: "dark" });
    } else {
      setVersiones([...versiones, form]);
      showToast({ message: "Versión agregada correctamente", type: "success", theme: "dark" });
    }
    setShowAdd(false);
    setForm({ equipo: "", software: "", version: "" });
    setEditIdx(null);
  };
//
  return (
    <div style={{width:'100%',margin:'0 auto',paddingTop:0,display:'block', position:'relative', top:0, minHeight:'100vh'}}>
      <GlobalToastContainer />
      <div className="licencias-wrapper" style={{maxWidth: '900px', width: '100%', margin: '2rem auto', background: 'var(--card-bg, #23272b)', borderRadius: '18px', boxShadow: '0 6px 32px rgba(0,0,0,0.18)', padding: '2.2rem 2.2rem 2.5rem 2.2rem', position: 'relative'}}>
        <div className="licencias-header-line" style={{marginBottom:'1.5rem',display:'flex',alignItems:'center',gap:'1.1rem'}}>
          <BackButton onBack={onBack} />
          <h2 style={{fontSize:'2.2rem',fontWeight:700,color:'#FFD600',margin:0}}>Versiones de Software</h2>
          <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer',marginLeft:'auto'}} onClick={handleAdd}><FaPlus style={{marginRight:4}} />Agregar versión</button>
        </div>
        <div style={{display:'flex',gap:'.7rem',alignItems:'center',marginBottom:'1.2rem'}}>
          <input
            style={{background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.5rem .9rem',fontSize:'.95rem',minWidth:160}}
            type="text"
            placeholder="Buscar por equipo, software o versión"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="licencias-table-wrapper" style={{width:'100%',overflow:'auto'}}>
          <table className="licencias-table" style={{width:'100%',borderCollapse:'collapse',fontSize:'.98rem'}}>
            <thead>
              <tr style={{background:'#181a1b'}}>
                <th style={{minWidth:110,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Equipo</th>
                <th style={{minWidth:220,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Software</th>
                <th style={{minWidth:120,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Versión</th>
                <th style={{color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {versionesFiltradas.map((v, idx) => (
                <tr key={idx} style={{borderBottom:'1px solid #333'}}>
                  <td style={{padding:'.7rem 1rem',color:'#fff'}}>{v.equipo}</td>
                  <td style={{padding:'.7rem 1rem',color:'#fff'}}>{v.software}</td>
                  <td style={{padding:'.7rem 1rem',color:'#fff'}}>{v.version}</td>
                  <td style={{padding:'.7rem 1rem'}}>
                    <div style={{display:'flex',gap:'.5rem'}}>
                      <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.38rem .75rem',fontWeight:700,cursor:'pointer'}} onClick={() => handleEdit(idx)} title="Editar"><FaEdit /></button>
                      <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.38rem .75rem',fontWeight:700,cursor:'pointer'}} onClick={() => handleDelete(idx)} title="Eliminar"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showAdd && (
          <div className="licencias-modal-overlay">
            <div className="licencias-modal-detalle">
              <div className="licencias-modal-header">
                <span style={{fontWeight:700,fontSize:'1.2rem'}}> {editIdx !== null ? "Editar versión" : "Agregar versión"}</span>
                <button className="licencias-modal-close" onClick={()=>setShowAdd(false)}>&times;</button>
              </div>
              <div className="licencias-modal-body">
                <div className="licencias-modal-row"><b>Equipo:</b> <input value={form.equipo} onChange={e => setForm({...form, equipo: e.target.value})} style={{width:'70%',background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.5rem .9rem',fontSize:'.95rem'}} /></div>
                <div className="licencias-modal-row"><b>Software:</b> <input value={form.software} onChange={e => setForm({...form, software: e.target.value})} style={{width:'70%',background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.5rem .9rem',fontSize:'.95rem'}} /></div>
                <div className="licencias-modal-row"><b>Versión:</b> <input value={form.version} onChange={e => setForm({...form, version: e.target.value})} style={{width:'70%',background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.5rem .9rem',fontSize:'.95rem'}} /></div>
              </div>
              <div className="licencias-modal-footer">
                <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer',opacity:(form.equipo && form.software && form.version)?1:0.6}} onClick={handleSave} disabled={!(form.equipo && form.software && form.version)}>{editIdx !== null ? "Guardar" : "Agregar"}</button>
                <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={()=>setShowAdd(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionesView;
