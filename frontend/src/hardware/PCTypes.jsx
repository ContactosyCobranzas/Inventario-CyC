import React, { useState } from "react";
import "./Hardware.css";

const initialTypes = [
  { id: 1, name: "Desktop", comment: "PC de escritorio", date_mod: "2025-08-27", date_creation: "2025-08-01" },
  { id: 2, name: "Laptop", comment: "Portátil", date_mod: "2025-08-25", date_creation: "2025-08-02" },
  { id: 3, name: "All-in-One", comment: "Todo en uno", date_mod: "2025-08-20", date_creation: "2025-08-03" },
];


const PCTypes = () => {
  const [types, setTypes] = useState(initialTypes);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', comment: '' });
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (type) => {
    setEditId(type.id);
    setForm({ name: type.name, comment: type.comment });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setTypes(types.filter(t => t.id !== id));
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
    }
    setShowForm(false);
    setForm({ name: '', comment: '' });
    setEditId(null);
  };

  return (
    <div className="hardware-section-container hardware-section-container-lg">
      <div className="hardware-section-header">
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
        <div className="modal-bg" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <form className="hardware-section-container" style={{maxWidth:400}} onSubmit={handleSubmit}>
            <h3>{editId ? 'Editar Tipo' : 'Agregar Tipo'}</h3>
            <div style={{marginBottom:12}}>
              <label>Nombre</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{width:'100%'}} />
            </div>
            <div style={{marginBottom:12}}>
              <label>Comentario</label>
              <input type="text" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} style={{width:'100%'}} />
            </div>
            <div style={{display:'flex',gap:10,justifyContent:'flex-end'}}>
              <button type="button" className="pcitems-action-btn delete" onClick={()=>setShowForm(false)}>Cancelar</button>
              <button type="submit" className="pcitems-action-btn edit">Guardar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PCTypes;
