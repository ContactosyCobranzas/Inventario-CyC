import React, { useState, useMemo } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import BackButton from "../common/BackButton";
import { showToast } from "../common/toastNotify";
import "./LicenciasOffice.css";

const licenciasMock = [
  {
    id: 1,
    producto: "Office 365 Business",
    equipo: "PC-Juan",
    fechaExpiracion: "2026-08-25",
    estado: "En uso",
    detalles: "Licencia asignada correctamente."
  },
  {
    id: 2,
    producto: "Office 2019 Pro",
    equipo: "Laptop-Maria",
    fechaExpiracion: "2027-09-10",
    estado: "En uso",
    detalles: "Licencia perpetua instalada en equipo de María."
  },
  {
    id: 3,
    producto: "Office 365 E3",
    equipo: "Sin asignar",
    fechaExpiracion: "2026-01-15",
    estado: "Libre",
    detalles: "Licencia pendiente de asignar."
  }
];

const PAGE_SIZE = 25;

const LicenciasOffice = ({ onBack }) => {
  const [licencias, setLicencias] = useState(licenciasMock);
  const [page, setPage] = useState(1);
  const [filtro, setFiltro] = useState("");

  const filtrados = useMemo(() => {
    if (!filtro.trim()) return licencias;
    const f = filtro.toLowerCase();
    return licencias.filter(r =>
      r.producto.toLowerCase().includes(f) ||
      r.equipo.toLowerCase().includes(f) ||
      r.estado.toLowerCase().includes(f)
    );
  }, [filtro, licencias]);

  const totalPages = Math.ceil(filtrados.length / PAGE_SIZE) || 1;
  const pageSafe = Math.min(page, totalPages);
  const paginados = filtrados.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  const [addVisible, setAddVisible] = useState(false);
  const [newLic, setNewLic] = useState({
    producto: "",
    equipo: "",
    fechaExpiracion: "",
    estado: "Libre",
    detalles: ""
  });

  const handleAbrirAdd = () => {
    setNewLic({ producto: "", equipo: "", fechaExpiracion: "", estado: "Libre", detalles: "" });
    setAddVisible(true);
  };
  const handleCerrarAdd = () => {
    setAddVisible(false);
  };
  const handleGuardarAdd = () => {
    setLicencias(prev => [
      ...prev,
      { ...newLic, id: prev.length ? Math.max(...prev.map(l => l.id)) + 1 : 1 }
    ]);
    setAddVisible(false);
    showToast({ message: "Licencia añadida", type: "success", theme: "dark" });
  };

  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);

  const handleEliminarUno = (id) => {
    setIdEliminar(id);
    setEliminarVisible(true);
  };

  const confirmarEliminar = () => {
    setLicencias(prev => prev.filter(r => r.id !== idEliminar));
    setEliminarVisible(false);
    setIdEliminar(null);
    showToast({
      message: "Licencia eliminada correctamente",
      type: "success",
      theme: "dark",
    });
  };

  const cancelarEliminar = () => {
    setEliminarVisible(false);
    setIdEliminar(null);
  };

  const [editarVisible, setEditarVisible] = useState(false);
  const [licEdit, setLicEdit] = useState(null);

  const handleEditar = (lic) => {
    setLicEdit(lic);
    setEditarVisible(true);
  };

  const handleCerrarEditar = () => {
    setEditarVisible(false);
    setLicEdit(null);
  };

  const handleGuardarEdicion = () => {
    setLicencias(prev => prev.map(l => l.id === licEdit.id ? licEdit : l));
    setEditarVisible(false);
    setLicEdit(null);
    showToast({ message: "Licencia actualizada", type: "success", theme: "dark" });
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',minHeight:'calc(100vh - 40px)',paddingTop:'3.5rem'}}>
      <div className="licencias-wrapper" style={{maxWidth: '1100px', width: '100%', margin: '0 auto', background: 'var(--card-bg, #23272b)', borderRadius: '18px', boxShadow: '0 6px 32px rgba(0,0,0,0.18)', padding: '2.2rem 2.2rem 2.5rem 2.2rem', position: 'relative'}}>
        <div className="licencias-header-line" style={{marginBottom:'1.5rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'1.1rem'}}>
            <BackButton onBack={onBack} />
            <FaRegNewspaper className="licencias-icon-inline" style={{fontSize:'2.2rem',color:'#FFD600'}} />
            <h2 className="licencias-title-inline" style={{fontSize:'2.2rem',fontWeight:700,color:'#FFD600',margin:0}}>Licencias de Office</h2>
          </div>
          <div className="licencias-actions" style={{display:'flex',gap:'.7rem',alignItems:'center'}}>
            <input
              className="licencias-search"
              style={{background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.5rem .9rem',fontSize:'.95rem',minWidth:160}}
              placeholder="Buscar..."
              value={filtro}
              onChange={e => { setFiltro(e.target.value); setPage(1); }}
            />
            <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={handleAbrirAdd}>Añadir licencia</button>
          </div>
        {addVisible && (
          <div className="licencias-modal-overlay">
            <div className="licencias-modal-detalle">
              <div className="licencias-modal-header">
                <FaRegNewspaper size={28} style={{marginRight:8,color:'#FFD600'}} />
                <span style={{fontWeight:700,fontSize:'1.2rem'}}>Añadir licencia</span>
                <button className="licencias-modal-close" onClick={handleCerrarAdd}>&times;</button>
              </div>
              <div className="licencias-modal-body">
                <div className="licencias-modal-row"><b>Producto:</b> <input value={newLic.producto} onChange={e => setNewLic({ ...newLic, producto: e.target.value })} style={{width:'70%'}} /></div>
                <div className="licencias-modal-row"><b>Equipo:</b> <input value={newLic.equipo} onChange={e => setNewLic({ ...newLic, equipo: e.target.value })} style={{width:'70%'}} /></div>
                <div className="licencias-modal-row"><b>Fecha expiración:</b> <input type="date" value={newLic.fechaExpiracion} onChange={e => setNewLic({ ...newLic, fechaExpiracion: e.target.value })} style={{width:'70%'}} /></div>
                <div className="licencias-modal-row"><b>Estado:</b> <select value={newLic.estado} onChange={e => setNewLic({ ...newLic, estado: e.target.value })} style={{width:'70%'}}><option value="Libre">Libre</option><option value="En uso">En uso</option></select></div>
                <div className="licencias-modal-row"><b>Detalles:</b> <input value={newLic.detalles} onChange={e => setNewLic({ ...newLic, detalles: e.target.value })} style={{width:'70%'}} /></div>
              </div>
              <div className="licencias-modal-footer">
                <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={handleGuardarAdd}>Guardar</button>
                <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={handleCerrarAdd}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
        </div>
        <div className="licencias-table-wrapper" style={{width:'100%',overflow:'auto'}}>
          {paginados.length > 0 ? (
            <table className="licencias-table" style={{width:'100%',borderCollapse:'collapse',fontSize:'.98rem'}}>
              <thead>
                <tr style={{background:'#181a1b'}}>
                  <th style={{minWidth:110,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Producto</th>
                  <th style={{minWidth:220,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Equipo</th>
                  <th style={{minWidth:120,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Fecha expiración</th>
                  <th style={{minWidth:90,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Estado</th>
                  <th style={{color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginados.map(lic => (
                  <tr key={lic.id} style={{borderBottom:'1px solid #333'}}>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{lic.producto}</td>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{lic.equipo}</td>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{lic.fechaExpiracion}</td>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{lic.estado}</td>
                    <td style={{padding:'.7rem 1rem'}}>
                      <div className="licencias-row-actions" style={{display:'flex',gap:'.5rem'}}>
                        <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.38rem .75rem',fontWeight:700,cursor:'pointer'}} onClick={() => handleEditar(lic)} className="primary-sm" title="Editar licencia">Editar</button>
                        <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.38rem .75rem',fontWeight:700,cursor:'pointer'}} onClick={() => handleEliminarUno(lic.id)} className="danger-sm" title="Eliminar">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="licencias-empty" style={{padding:'1rem',textAlign:'center',fontWeight:500,color:'#FFD600'}}>No hay licencias registradas.</div>
          )}
        </div>

        {editarVisible && licEdit && (
          <div className="licencias-modal-overlay">
            <div className="licencias-modal-detalle">
              <div className="licencias-modal-header">
                <FaRegNewspaper size={28} style={{marginRight:8,color:'#FFD600'}} />
                <span style={{fontWeight:700,fontSize:'1.2rem'}}>Editar licencia</span>
                <button className="licencias-modal-close" onClick={handleCerrarEditar}>&times;</button>
              </div>
              <div className="licencias-modal-body">
                <div className="licencias-modal-row"><b>ID:</b> {licEdit.id}</div>
                <div className="licencias-modal-row"><b>Producto:</b> <input value={licEdit.producto} onChange={e => setLicEdit({ ...licEdit, producto: e.target.value })} style={{width:'70%'}} /></div>
                <div className="licencias-modal-row"><b>Equipo:</b> <input value={licEdit.equipo} onChange={e => setLicEdit({ ...licEdit, equipo: e.target.value })} style={{width:'70%'}} /></div>
                <div className="licencias-modal-row"><b>Fecha expiración:</b> <input type="date" value={licEdit.fechaExpiracion} onChange={e => setLicEdit({ ...licEdit, fechaExpiracion: e.target.value })} style={{width:'70%'}} /></div>
                <div className="licencias-modal-row"><b>Estado:</b> <select value={licEdit.estado} onChange={e => setLicEdit({ ...licEdit, estado: e.target.value })} style={{width:'70%'}}><option value="Libre">Libre</option><option value="En uso">En uso</option></select></div>
                <div className="licencias-modal-row"><b>Detalles:</b> <input value={licEdit.detalles} onChange={e => setLicEdit({ ...licEdit, detalles: e.target.value })} style={{width:'70%'}} /></div>
              </div>
              <div className="licencias-modal-footer">
                <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={handleGuardarEdicion}>Guardar</button>
                <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={handleCerrarEditar}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

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
        {paginados.length > 0 && (
          <div className="licencias-pagination" style={{display:'flex',gap:'.5rem',marginTop:'1.5rem',flexWrap:'wrap'}}>
            <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.35rem .75rem',fontWeight:700,cursor:'pointer',minWidth:36}} disabled={pageSafe === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>{'<'} Anterior</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                style={{background:p===pageSafe?'#FFD600':'#23272b',color:p===pageSafe?'#23272b':'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,fontWeight:700,padding:'.35rem .75rem',cursor:'pointer',minWidth:36}}
                className={p === pageSafe ? 'active' : ''}
                onClick={() => setPage(p)}
              >{p}</button>
            ))}
            <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.35rem .75rem',fontWeight:700,cursor:'pointer',minWidth:36}} disabled={pageSafe === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Siguiente {'>'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenciasOffice;