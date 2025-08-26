import React from "react";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./NotificationDropdown.css";

const notifications = [
  { id: 1, text: "Nuevo usuario registrado" },
  { id: 2, text: "Equipo asignado" },
  { id: 3, text: "Inventario actualizado" },
];

const NotificationDropdown = ({ open, onClose }) => {
  const [visible, setVisible] = React.useState(open);
  React.useEffect(() => {
    if (open) setVisible(true);
    else {
      const timeout = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [open]);
  if (!visible) return null;
  return (
    <div className={`navbar-dropdown notification-dropdown${open ? '' : ' hide'}`}>
      <div className="navbar-dropdown-header">
        <span className="navbar-dropdown-title">Notificaciones</span>
        <button className="notification-close-btn" onClick={onClose} aria-label="Cerrar">
          <IoMdClose size={22} />
        </button>
      </div>
      <div className="notification-divider" />
      {notifications.length === 0 ? (
        <div className="navbar-dropdown-empty">Sin notificaciones</div>
      ) : (
        <div className="notification-list">
          {notifications.map((n) => (
            <div key={n.id} className="navbar-dropdown-item">
              <div className="notification-icon">
                <FaBell />
              </div>
              <span className="notification-text">{n.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
