import React from 'react';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ open, onClose, onConfirm, item }) => {
  if (!open) return null;
  return (
    <div className="confirmdelete-modal-overlay">
      <div className="confirmdelete-modal-content">
        <h3>¿Eliminar este PC Item?</h3>
        <p style={{marginBottom: '1.2rem'}}>¿Estás seguro que deseas eliminar <b>{item?.nombre}</b>?</p>
        <div className="confirmdelete-modal-actions">
          <button className="pcitems-action-btn" onClick={onClose}>Cancelar</button>
          <button className="pcitems-action-btn delete" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
