import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import "./Hardware.css";

const EditEquipoModal = ({ open, onClose, item, onSave }) => {
  const [form, setForm] = useState(item || {});

  useEffect(() => {
    setForm(item || {});
  }, [item]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content modal-animate">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
          <FaEdit size={28} color="#ffd600" />
          <h2 style={{ margin: 0, color: '#ffd600', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>Editar Equipo</h2>
        </div>
        <form onSubmit={handleSubmit} className="add-equipo-form">
          <div className="form-row">
            <label>Nombre:
              <input name="name" value={form.name || ''} onChange={handleChange} required />
            </label>
          </div>
          <div className="form-row">
            <label>Serial:
              <input name="serial" value={form.serial || ''} onChange={handleChange} required />
            </label>
          </div>
          <div className="form-row">
            <label>Otro Serial:
              <input name="otherserial" value={form.otherserial || ''} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>Contacto:
              <input name="contact" value={form.contact || ''} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>Teléfono Contacto:
              <input name="contact_num" value={form.contact_num || ''} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>Comentario:
              <input name="comment" value={form.comment || ''} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row" style={{display:'flex',gap:'2rem'}}>
            <label style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <input type="checkbox" name="is_deleted" checked={!!form.is_deleted} onChange={handleChange} /> Eliminado
            </label>
            <label style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <input type="checkbox" name="is_dynamic" checked={!!form.is_dynamic} onChange={handleChange} /> Dinámico
            </label>
          </div>
          <div style={{ marginTop: "1.5rem", display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button type="submit" className="hardware-btn add">Guardar</button>
            <button type="button" className="hardware-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEquipoModal;
