import React from "react";
import "./ModalConfirm.css";

const ModalConfirm = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="modal-confirm-backdrop">
      <div className="modal-confirm">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-confirm-actions">
          <button className="modal-btn cancel" onClick={onCancel}>Cancelar</button>
          <button className="modal-btn confirm" onClick={onConfirm}>Sí, cerrar sesión</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
