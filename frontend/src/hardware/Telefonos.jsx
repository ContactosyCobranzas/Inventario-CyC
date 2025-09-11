import React, { useState } from 'react';
import { showToast } from '../common/toastNotify';
import './Hardware.css';

const initialTelefonos = [
  {
    id: 1,
    equipo: 'iPhone',
    linea1: { numero: '999-1111', estado: 'activa' },
    linea2: { numero: '999-2222', estado: 'bloqueada' },
  },
  {
    id: 2,
    equipo: 'Samsung',
    linea1: { numero: '888-3333', estado: 'bloqueada' },
    linea2: { numero: '888-4444', estado: 'activa' },
  },
];

const Telefonos = () => {
  const [telefonos, setTelefonos] = useState(initialTelefonos);
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLinea, setSelectedLinea] = useState('linea1');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTel, setNewTel] = useState({ equipo: '', linea1: { numero: '', estado: 'activa' }, linea2: { numero: '', estado: 'activa' } });
  const [search, setSearch] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');

  const handleEdit = (id, linea) => {
    setEditId(id);
  setEditId(id);
  setSelectedLinea('linea1');
  setModalOpen(true);
  };
  // lastDeleted ya está declarado, no volver a declararlo
  const lastDeleted = React.useRef(null);
  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDeleteTelefono = () => {
    const deletedTel = telefonos.find(t => t.id === confirmDeleteId);
    setTelefonos(telefonos.filter(t => t.id !== confirmDeleteId));
    setEditId(null);
    setModalOpen(false);
    lastDeleted.current = deletedTel;
    setConfirmDeleteId(null);
    const isDark = document.body.classList.contains('dark-theme');
    window.toast && window.toast.warn ? window.toast.warn(
      <div style={{
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minWidth:340,minHeight:110
      }}>
        <span style={{fontWeight:700,fontSize:'1.15rem',marginBottom:6,color:'#c62828'}}>Teléfono eliminado</span>
        <span style={{fontSize:'1rem',marginBottom:12}}>¿Deseas deshacer?</span>
        <button
          style={{
            background: isDark ? '#c62828' : '#fff',
            color: isDark ? '#fff' : '#c62828',
            border:'none',
            borderRadius:8,
            padding:'0.6rem 1.5rem',
            fontWeight:'bold',
            fontSize:'1.08rem',
            cursor:'pointer',
            boxShadow:'0 2px 8px rgba(0,0,0,0.18)'
          }}
          onClick={() => {
            setTelefonos(prev => [...prev, lastDeleted.current]);
            window.toast.dismiss();
          }}
        >Deshacer</button>
      </div>,
      {
        autoClose: 10000,
        closeOnClick: false,
        position: 'top-center',
        icon: false,
        style: {
          background: isDark ? '#c62828' : '#fff',
          color: isDark ? '#fff' : '#c62828',
          fontWeight: 500,
          borderRadius: '16px',
          minWidth: '340px',
          minHeight: '110px',
          boxShadow: '0 6px 32px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }
    ) : showToast({
      message: 'Teléfono eliminado correctamente',
      type: 'error',
      theme: isDark ? 'dark' : 'light',
      icon: null
    });
  };

  // Filtrado por búsqueda y estado
  const telefonosFiltrados = telefonos.filter(t => {
    const matchSearch =
      t.equipo.toLowerCase().includes(search.toLowerCase()) ||
      t.linea1.numero.toLowerCase().includes(search.toLowerCase()) ||
      t.linea2.numero.toLowerCase().includes(search.toLowerCase());
    let matchEstado = true;
    if (estadoFiltro !== 'todos') {
      matchEstado =
        t.linea1.estado === estadoFiltro || t.linea2.estado === estadoFiltro;
    }
    return matchSearch && matchEstado;
  });

  // Añadir teléfono
  const handleAddTelefono = () => {
    if (!newTel.equipo.trim() || !newTel.linea1.numero.trim()) {
      showToast({ message: 'Equipo y línea 1 son obligatorios', type: 'error' });
      return;
    }
    const nuevo = {
      id: Date.now(),
      equipo: newTel.equipo,
      linea1: { ...newTel.linea1 },
      linea2: newTel.linea2.numero ? { ...newTel.linea2 } : { numero: '', estado: '' }
    };
    setTelefonos([...telefonos, nuevo]);
    setAddModalOpen(false);
    setNewTel({ equipo: '', linea1: { numero: '', estado: 'activa' }, linea2: { numero: '', estado: 'activa' } });
    showToast({ message: 'Teléfono añadido', type: 'success' });
  };
  const handleEstadoChange = (id, lineaKey, nuevoEstado) => {
    setTelefonos(telefonos => telefonos.map(t => {
      if (t.id !== id) return t;
      return {
        ...t,
        [lineaKey]: {
          ...t[lineaKey],
          estado: nuevoEstado
        }
      };
    }));
    setEditId(null);
    setModalOpen(false);
    let toastType = 'info';
    let toastMsg = '';
    if (nuevoEstado === 'activa') {
      toastType = 'success';
      toastMsg = `${lineaKey === 'linea1' ? 'Línea 1' : 'Línea 2'} activada`;
    } else if (nuevoEstado === 'bloqueada') {
      toastType = 'error';
      toastMsg = `${lineaKey === 'linea1' ? 'Línea 1' : 'Línea 2'} bloqueada`;
    } else if (nuevoEstado === 'restringida') {
      toastType = 'info';
      toastMsg = `${lineaKey === 'linea1' ? 'Línea 1' : 'Línea 2'} restringida`;
    }
    showToast({
      message: toastMsg,
      type: toastType,
      theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
      icon: null
    });
  };

  return (
    <div className="hardware-container">
      <h2>Teléfonos</h2>
      <div style={{display:'flex',gap:'1.5rem',marginBottom:'1.5rem',alignItems:'center'}}>
        <button className="hardware-btn" style={{background:'#ffd600',color:'#222',fontWeight:700}} onClick={()=>setAddModalOpen(true)}>Añadir</button>
        <input type="text" placeholder="Buscar por equipo o número" value={search} onChange={e=>setSearch(e.target.value)} 
          style={{padding:'0.5em 1em',borderRadius:8,fontSize:'1em',border:'2px solid #ffd600',width:220,background:'#222',color:'#ffd600',fontWeight:700}} />
        <select value={estadoFiltro} onChange={e=>setEstadoFiltro(e.target.value)} 
          style={{padding:'0.5em 1em',borderRadius:8,fontSize:'1em',border:'2px solid #ffd600',background:'#222',color:'#ffd600',fontWeight:700}}>
          <option value="todos">Todas las líneas</option>
          <option value="activa">Activas</option>
          <option value="bloqueada">Bloqueadas</option>
          <option value="restringida">Restringidas</option>
        </select>
      </div>
      <table className="hardware-table" style={{width:'100%',marginTop:'2rem'}}>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Línea 1</th>
            <th>Línea 2</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {telefonosFiltrados.map(t => (
            <tr key={t.id}>
              <td>{t.equipo}</td>
              <td>
                <span className="hardware-tag">{t.linea1.numero}</span>
                {t.linea1.numero && (
                  <span style={{
                    display: 'inline-block',
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: t.linea1.estado === 'activa' ? '#00ff3c' : t.linea1.estado === 'restringida' ? '#ffe600' : '#ff2a2a',
                    marginLeft: 8,
                    verticalAlign: 'middle',
                    border: t.linea1.estado === 'restringida' ? '2px solid #ffe600' : 'none',
                    boxShadow: `0 0 6px 2px ${t.linea1.estado === 'activa' ? '#00ff3c' : t.linea1.estado === 'restringida' ? '#ffe600' : '#ff2a2a'}`,
                  }} title={t.linea1.estado === 'activa' ? 'Activa' : t.linea1.estado === 'restringida' ? 'Restringida' : 'Bloqueada'}></span>
                )}
              </td>
              <td>
                <span className="hardware-tag">{t.linea2.numero}</span>
                {t.linea2.numero && (
                  <span style={{
                    display: 'inline-block',
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: t.linea2.estado === 'activa' ? '#00ff3c' : t.linea2.estado === 'restringida' ? '#ffe600' : '#ff2a2a',
                    marginLeft: 8,
                    verticalAlign: 'middle',
                    border: t.linea2.estado === 'restringida' ? '2px solid #ffe600' : 'none',
                    boxShadow: `0 0 6px 2px ${t.linea2.estado === 'activa' ? '#00ff3c' : t.linea2.estado === 'restringida' ? '#ffe600' : '#ff2a2a'}`,
                  }} title={t.linea2.estado === 'activa' ? 'Activa' : t.linea2.estado === 'restringida' ? 'Restringida' : 'Bloqueada'}></span>
                )}
              </td>
              <td>
                <button className="hardware-btn" onClick={() => handleEdit(t.id)}>Editar</button>
                <button className="hardware-btn" onClick={() => handleDelete(t.id)} style={{marginLeft:8}}>Borrar</button>
      {/* Modal de confirmación de borrado */}
      {confirmDeleteId !== null && (
        <div className="modal-overlay" style={{zIndex:10000}}>
          <div className="modal-content" style={{minWidth:340, maxWidth:400, padding:'2rem 2.5rem'}}>
            <h3 style={{marginBottom:'1.2rem', fontWeight:700, fontSize:'1.25rem', color:'#c62828'}}>¿Eliminar teléfono?</h3>
            <p style={{marginBottom:'1.5rem'}}>¿Estás seguro que deseas eliminar este teléfono?</p>
            <div style={{display:'flex', justifyContent:'flex-end', gap:'1rem'}}>
              <button className="hardware-btn" onClick={() => setConfirmDeleteId(null)}>Cancelar</button>
              <button className="hardware-btn" style={{background:'#c62828',color:'#fff'}} onClick={confirmDeleteTelefono}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de añadir */}
      {addModalOpen && (
        <div className="modal-overlay" style={{zIndex:10000,background:'rgba(0,0,0,0.7)'}}>
          <div className="modal-content" style={{minWidth:360, maxWidth:420, padding:'2.5rem 2.5rem', background:'#222', border:'2.5px solid #ffd600', borderRadius:18, boxShadow:'0 8px 32px rgba(0,0,0,0.35)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'0.7rem',marginBottom:'1.2rem'}}>
              <span style={{fontSize:'2.1rem',color:'#ffd600'}}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" stroke="#ffd600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <h3 style={{fontWeight:700, fontSize:'1.35rem', color:'#ffd600',margin:0}}>Añadir teléfono</h3>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
              <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                <label style={{fontWeight:600,color:'#ffd600',marginBottom:2}}>Equipo:</label>
                <input type="text" value={newTel.equipo} onChange={e=>setNewTel({...newTel,equipo:e.target.value})} 
                  style={{padding:'0.7em 1em',borderRadius:8,fontSize:'1.08em',border:'2px solid #ffd600',background:'#111',color:'#ffd600',fontWeight:600}} />
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                <label style={{fontWeight:600,color:'#ffd600',marginBottom:2}}>Línea 1:</label>
                <div style={{display:'flex',gap:'0.7rem'}}>
                  <input type="text" value={newTel.linea1.numero} onChange={e=>setNewTel({...newTel,linea1:{...newTel.linea1,numero:e.target.value}})} 
                    style={{padding:'0.7em 1em',borderRadius:8,fontSize:'1.08em',border:'2px solid #ffd600',background:'#111',color:'#ffd600',fontWeight:600}} />
                  <select value={newTel.linea1.estado} onChange={e=>setNewTel({...newTel,linea1:{...newTel.linea1,estado:e.target.value}})} 
                    style={{padding:'0.7em 1em',borderRadius:8,fontSize:'1.08em',border:'2px solid #ffd600',background:'#111',color:'#ffd600',fontWeight:600}}>
                    <option value="activa">Activa</option>
                    <option value="bloqueada">Bloqueada</option>
                    <option value="restringida">Restringida</option>
                  </select>
                </div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                <label style={{fontWeight:600,color:'#ffd600',marginBottom:2}}>Línea 2:</label>
                <div style={{display:'flex',gap:'0.7rem'}}>
                  <input type="text" value={newTel.linea2.numero} onChange={e=>setNewTel({...newTel,linea2:{...newTel.linea2,numero:e.target.value}})} 
                    style={{padding:'0.7em 1em',borderRadius:8,fontSize:'1.08em',border:'2px solid #ffd600',background:'#111',color:'#ffd600',fontWeight:600}} />
                  <select value={newTel.linea2.estado} onChange={e=>setNewTel({...newTel,linea2:{...newTel.linea2,estado:e.target.value}})} 
                    style={{padding:'0.7em 1em',borderRadius:8,fontSize:'1.08em',border:'2px solid #ffd600',background:'#111',color:'#ffd600',fontWeight:600}} disabled={!newTel.linea2.numero}>
                    <option value="activa">Activa</option>
                    <option value="bloqueada">Bloqueada</option>
                    <option value="restringida">Restringida</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{marginTop:'2.5rem', textAlign:'right',display:'flex',gap:'1rem',justifyContent:'flex-end'}}>
              <button className="hardware-btn" style={{background:'#333',color:'#ffd600',fontWeight:700}} onClick={()=>setAddModalOpen(false)}>Cancelar</button>
              <button className="hardware-btn" style={{background:'#ffd600',color:'#222',fontWeight:700}} onClick={handleAddTelefono}>Añadir</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {modalOpen && editId !== null && (
        <div className="modal-overlay" style={{zIndex:10000}}>
          <div className="modal-content" style={{minWidth:340, maxWidth:400, padding:'2rem 2.5rem'}}>
            <h3 style={{marginBottom:'1.2rem', fontWeight:700, fontSize:'1.25rem', color:'#ffd600'}}>Editar estado de línea</h3>
            <div style={{display:'flex', flexDirection:'column', gap:'1.2rem'}}>
              <div>
                <label htmlFor="linea-select" style={{fontWeight:600, color:'#ffd600'}}>Línea a editar:</label>
                <select id="linea-select" value={selectedLinea} onChange={e => setSelectedLinea(e.target.value)} style={{marginLeft:12, padding:'0.5em 1em', borderRadius:8, fontSize:'1.08em', background:'#222', color:'#ffd600', border:'1.5px solid #333'}}>
                  <option value="linea1">Línea 1 ({telefonos.find(t => t.id === editId)?.linea1.numero})</option>
                  <option value="linea2">Línea 2 ({telefonos.find(t => t.id === editId)?.linea2.numero})</option>
                </select>
              </div>
              <div>
                <label htmlFor="estado-select" style={{fontWeight:600, color:'#ffd600'}}>Estado:</label>
                <select id="estado-select" value={telefonos.find(t => t.id === editId)[selectedLinea].estado} onChange={e => handleEstadoChange(editId, selectedLinea, e.target.value)} style={{marginLeft:12, padding:'0.5em 1em', borderRadius:8, fontSize:'1.08em', background:'#222', color:'#ffd600', border:'1.5px solid #333'}}>
                  <option value="activa">Activa</option>
                  <option value="bloqueada">Bloqueada</option>
                  <option value="restringida">Restringida</option>
                </select>
              </div>
            </div>
            <div style={{marginTop:'2rem', textAlign:'right'}}>
              <button className="hardware-btn" onClick={() => {setModalOpen(false);setEditId(null);}}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Telefonos;
