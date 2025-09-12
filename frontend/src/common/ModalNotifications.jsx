import React from "react";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./ModalNotifications.css";

const ModalNotifications = ({ open, notifications, onClose, dark, fontSize }) => {
  if (!open) return null;
  return (
    <div className="modal-notifications-dropdown" style={{
      right: 0,
      top: 56,
      position: 'absolute',
      zIndex: 2000,
      fontSize: fontSize || '100%',
    }}>
      <div className={`modal-notifications${dark ? ' dark' : ''}`}> 
        <div className="modal-notifications-header">
          <span className="modal-notifications-title">
            <FaBell style={{ marginRight: 8 }} /> Notificaciones
          </span>
          <button className="modal-notifications-close" onClick={onClose} aria-label="Cerrar">
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="modal-notifications-divider" />
        <div className="modal-notifications-list">
          {notifications.length === 0 ? (
            <div className="modal-notifications-empty">Sin notificaciones</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="modal-notifications-item">
                <div className="modal-notifications-icon">
                  <FaBell />
                </div>
                <span className="modal-notifications-text">{n.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalNotifications;
