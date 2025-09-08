import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./Hardware.css";

const initialForm = {
  items_id: "",
  computers_id: "",
  itemtype: "",
  is_deleted: false,
  is_dynamic: false
};

const AddPCItemModal = ({ open, onClose, onAdd }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAdd({
      ...form,
      items_id: Number(form.items_id),
      computers_id: Number(form.computers_id)
    });
    setForm(initialForm);
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-animate">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
          <FaPlusCircle size={28} color="#ffd600" />
          <h2 style={{ margin: 0, color: '#ffd600', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>Añadir PC Item</h2>
        </div>
        <form onSubmit={handleSubmit} className="add-equipo-form">
          <div className="form-row">
            <label>ID Item:
              <input name="items_id" value={form.items_id} onChange={handleChange} required type="number" min="1" />
            </label>
          </div>
          <div className="form-row">
            <label>ID Computadora:
              <input name="computers_id" value={form.computers_id} onChange={handleChange} required type="number" min="1" />
            </label>
          </div>
          <div className="form-row">
            <label>Tipo:
              <input name="itemtype" value={form.itemtype} onChange={handleChange} required placeholder="Ej: Computer, Printer, Monitor" />
            </label>
          </div>
          <div className="form-row" style={{display:'flex',gap:'2rem'}}>
            <label style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <input type="checkbox" name="is_deleted" checked={form.is_deleted} onChange={handleChange} /> Eliminado
            </label>
            <label style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <input type="checkbox" name="is_dynamic" checked={form.is_dynamic} onChange={handleChange} /> Dinámico
            </label>
          </div>
          <div style={{ marginTop: "1.5rem", display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button type="submit" className="hardware-btn add">Añadir</button>
            <button type="button" className="hardware-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPCItemModal;
