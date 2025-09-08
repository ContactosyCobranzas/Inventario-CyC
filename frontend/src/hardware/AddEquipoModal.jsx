import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import "./Hardware.css";

const initialForm = {
  name: "",
  serial: "",
  otherserial: "",
  contact: "",
  contact_num: "",
  comment: ""
};

const AddEquipoModal = ({ open, onClose, onAdd }) => {
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
    <div className="modal-overlay">
      <div className="modal-content modal-animate">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
          <FaPlusCircle size={28} color="#ffd600" />
          <h2 style={{ margin: 0, color: '#ffd600', fontWeight: 700, fontSize: '1.5rem', textAlign: 'center' }}>Añadir Equipo</h2>
        </div>
        <form onSubmit={handleSubmit} className="add-equipo-form">
          <div className="form-row">
            <label>Nombre:
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
          </div>
          <div className="form-row">
            <label>Serial:
              <input name="serial" value={form.serial} onChange={handleChange} required />
            </label>
          </div>
          <div className="form-row">
            <label>Otro Serial:
              <input name="otherserial" value={form.otherserial} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>Contacto:
              <input name="contact" value={form.contact} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>Teléfono Contacto:
              <input name="contact_num" value={form.contact_num} onChange={handleChange} />
            </label>
          </div>
          <div className="form-row">
            <label>Comentario:
              <input name="comment" value={form.comment} onChange={handleChange} />
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

export default AddEquipoModal;
