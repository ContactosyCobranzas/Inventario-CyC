import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
// import GlobalSearchModal from "./GlobalSearchModal";

import ModalNotifications from "./ModalNotifications";
import ModalConfirm from "./ModalConfirm";
import ModalConfig from "./ModalConfig";
import { showToast } from "./toastNotify";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [fontSize, setFontSizeState] = useState(() => localStorage.getItem("uiFontSize") || "100%");
  const setFontSize = (val) => {
    setFontSizeState(val);
    if (window.setGlobalFontSize) window.setGlobalFontSize(val);
  };
  // Tema oscuro global fijo
  const dark = true;
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  }, []);
  const handleTheme = () => {
    showToast({
      message: 'Solo está disponible el tema oscuro',
      type: 'info',
      theme: 'dark',
    });
  };
  const handleLogoutClick = () => {
    setShowModal(true);
  };
  const handleConfirmLogout = () => {
    setShowModal(false);
    showToast({
      message: 'Sesión cerrada correctamente',
      type: 'success',
      theme: 'dark',
    });
    onLogout && onLogout();
  };
  // Notificaciones para el modal
  const notifications = [
    { id: 1, text: "Nuevo usuario registrado" },
    { id: 2, text: "Equipo asignado" },
    { id: 3, text: "Inventario actualizado" },
  ];
  return (
    <nav className="navbar">
      <span className="navbar-title">Inventario CyC</span>
      <div className="navbar-actions" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
        {/* Botón de búsqueda eliminado */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="navbar-icon-btn"
            title="Notificaciones"
            onClick={() => setShowNotifications(true)}
            aria-haspopup="true"
            aria-expanded={showNotifications}
          >
            <FaBell size={22} />
          </button>
          {/* Modal de notificaciones alineado justo debajo del icono */}
          <ModalNotifications
            open={showNotifications}
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            dark={dark}
            fontSize={fontSize}
          />
        </div>
        <button className="navbar-icon-btn" title="Configuración" onClick={() => setShowConfig(true)}>
          <FaCog size={22} />
        </button>
      </div>
      <ModalConfirm
        open={showModal}
        title="Cerrar sesión"
        message="¿Desea cerrar la sesión de la cuenta?"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowModal(false)}
      />
      <ModalConfig
        open={showConfig}
        onClose={() => setShowConfig(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        onLogout={handleLogoutClick}
      />
  {/* Modal de búsqueda global eliminado */}
    </nav>
  );
};

export default Navbar;