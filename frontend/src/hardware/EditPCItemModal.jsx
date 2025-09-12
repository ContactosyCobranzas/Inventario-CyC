import React, { useState, useEffect } from "react";
import "./EditPCItemModal.css";

const EditPCItemModal = ({ open, onClose, item, onSave }) => {
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

  // Detectar tema oscuro
  const isDark = document.body.classList.contains('dark-theme');
  // Cancelar: gris en oscuro, rojo en claro
  const cancelClass = isDark ? "pcitems-action-btn" : "pcitems-action-btn delete";

  return (
    <div className="editpcitem-modal-overlay">
      <div className="editpcitem-modal-content">
        <h3 style={{marginBottom: '0.7rem', fontWeight: 800, fontSize: '1.25rem'}}>Editar PC Item</h3>
        <button className="editpcitem-modal-close" onClick={onClose}>×</button>
        <form onSubmit={handleSubmit} className="editpcitem-form">
          <label>
            ID Item:
            <input name="items_id" type="number" min="1" value={form.items_id || ''} onChange={handleChange} required />
          </label>
          <label>
            ID Computadora:
            <input name="computers_id" type="number" min="1" value={form.computers_id || ''} onChange={handleChange} required />
          </label>
          <label>
            Tipo:
            <input name="itemtype" value={form.itemtype || ''} onChange={handleChange} required placeholder="Ej: Computer, Printer, Monitor" />
          </label>
          <div style={{display:'flex',gap:'2rem',margin:'1rem 0'}}>
            <label style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <input type="checkbox" name="is_deleted" checked={!!form.is_deleted} onChange={handleChange} /> Eliminado
            </label>
            <label style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
              <input type="checkbox" name="is_dynamic" checked={!!form.is_dynamic} onChange={handleChange} /> Dinámico
            </label>
          </div>
          <div className="editpcitem-modal-actions">
            <button type="button" onClick={onClose} className={cancelClass}>Cancelar</button>
            <button type="submit" className="pcitems-action-btn edit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPCItemModal;