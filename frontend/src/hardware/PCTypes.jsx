import React, { useState, useRef } from "react";
import { toast } from 'react-toastify';
import { FaExclamationTriangle } from 'react-icons/fa';
import BackButton from "../common/BackButton";
import "./Hardware.css";

const initialTypes = [
  { id: 1, name: "Desktop", comment: "PC de escritorio", date_mod: "2025-08-27", date_creation: "2025-08-01" },
  { id: 2, name: "Laptop", comment: "Portátil", date_mod: "2025-08-25", date_creation: "2025-08-02" },
  { id: 3, name: "All-in-One", comment: "Todo en uno", date_mod: "2025-08-20", date_creation: "2025-08-03" },
];

const PCTypes = ({ onBack }) => {
  const [types, setTypes] = useState(initialTypes);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', comment: '' });
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (type) => {
    setEditId(type.id);
    setForm({ name: type.name, comment: type.comment });
    setShowForm(true);
  };

  const lastDeleted = useRef(null);
  const handleDelete = (id) => {
    const deletedType = types.find(t => t.id === id);
    setTypes(types.filter(t => t.id !== id));
    lastDeleted.current = deletedType;
    const isDark = document.body.classList.contains('dark-theme');
    toast.warn(
      <div style={{
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minWidth:340,minHeight:110
      }}>
        <FaExclamationTriangle size={32} color={isDark ? '#ffd600' : '#181818'} style={{marginBottom:8}} />
        <span style={{fontWeight:700,fontSize:'1.15rem',marginBottom:6}}>Tipo eliminado</span>
        <span style={{fontSize:'1rem',marginBottom:12}}>¿Deseas deshacer?</span>
        <button
          style={{
            background: isDark ? '#ffd600' : '#181818',
            color: isDark ? '#181818' : '#ffd600',
            border:'none',
            borderRadius:8,
            padding:'0.6rem 1.5rem',
            fontWeight:'bold',
            fontSize:'1.08rem',
            cursor:'pointer',
            boxShadow:'0 2px 8px rgba(0,0,0,0.18)'
          }}
          onClick={() => {
            setTypes(prev => [...prev, lastDeleted.current]);
            toast.dismiss();
          }}
        >Deshacer</button>
      </div>,
      {
        autoClose: 10000,
        closeOnClick: false,
        position: 'top-center',
        icon: false,
        style: {
          background: isDark ? '#181818' : '#ffd600',
          color: isDark ? '#ffd600' : '#181818',
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
    );
  };

  const handleAdd = () => {
    setEditId(null);
    setForm({ name: '', comment: '' });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setTypes(types.map(t => t.id === editId ? { ...t, name: form.name, comment: form.comment, date_mod: new Date().toISOString().slice(0,10) } : t));
      setTimeout(() => {
        toast.success('Tipo actualizado correctamente');
      }, 100);
    } else {
      setTypes([
        ...types,
        {
          id: types.length ? Math.max(...types.map(t => t.id)) + 1 : 1,
          name: form.name,
          comment: form.comment,
          date_mod: new Date().toISOString().slice(0,10),
          date_creation: new Date().toISOString().slice(0,10)
        }
      ]);
      setTimeout(() => {
        toast.success('Tipo añadido correctamente');
      }, 100);
    }
    setShowForm(false);
    setForm({ name: '', comment: '' });
    setEditId(null);
  };

  return (
    <div className="hardware-section-container hardware-section-container-lg">
      <div className="hardware-section-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <BackButton onBack={onBack} />
        <h2>PC Tipos</h2>
        <button className="pcitems-action-btn edit" onClick={handleAdd}>Agregar Tipo</button>
      </div>
      <div className="pcitems-table-wrapper">
        <table className="hardware-table hardware-table-lg pcitems-table-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Comentario</th>
              <th>Fecha Modificación</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td>{type.id}</td>
                <td>{type.name}</td>
                <td>{type.comment}</td>
                <td>{type.date_mod}</td>
                <td>{type.date_creation}</td>
                <td>
                  <button className="pcitems-action-btn edit" onClick={() => handleEdit(type)}>Editar</button>
                  <button className="pcitems-action-btn delete" onClick={() => handleDelete(type.id)}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content modal-animate" style={{maxWidth:420}}>
            <h2 style={{color:'#ffd600',fontWeight:700,marginBottom:'1.2rem',textAlign:'center'}}>{editId ? 'Editar Tipo' : 'Agregar Tipo'}</h2>
            <form onSubmit={handleSubmit} className="add-equipo-form">
              <div className="form-row">
                <label>Nombre:
                  <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </label>
              </div>
              <div className="form-row">
                <label>Comentario:
                  <input type="text" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
                </label>
              </div>
              <div style={{display:'flex',gap:'1rem',justifyContent:'center',marginTop:'1.5rem'}}>
                <button type="button" className="hardware-btn" onClick={()=>setShowForm(false)}>Cancelar</button>
                <button type="submit" className="hardware-btn add">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PCTypes;
