import React, { useState, useEffect } from "react";
import "./EditPCItemModal.css";

const EditPCItemModal = ({ open, onClose, item, onSave }) => {
  const [form, setForm] = useState(item || {});

  useEffect(() => {
    setForm(item || {});
  }, [item]);

  if (!open) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
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
            Nombre:
            <input name="nombre" value={form.nombre || ''} onChange={handleChange} required />
          </label>
          <label>
            Tipo:
            <input name="tipo" value={form.tipo || ''} onChange={handleChange} required />
          </label>
          <label>
            Estado:
            <input name="estado" value={form.estado || ''} onChange={handleChange} required />
          </label>
          <label>
            Usuario:
            <input name="usuario" value={form.usuario || ''} onChange={handleChange} required />
          </label>
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
