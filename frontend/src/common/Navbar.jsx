import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaCog, FaMoon, FaSun, FaSignOutAlt, FaSearch } from "react-icons/fa";

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
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  const handleTheme = () => {
    setDark((prev) => {
      const newTheme = !prev;
      setTimeout(() => {
        showToast({
          message: `Tema cambiado a ${!prev ? 'oscuro' : 'claro'}`,
          type: 'success',
          theme: !prev ? 'dark' : 'light',
        });
      }, 100);
      return newTheme;
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
      theme: dark ? 'dark' : 'light',
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
        <button className="navbar-icon-btn" title="Buscar">
          <FaSearch size={22} />
        </button>
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
        dark={dark}
        handleTheme={handleTheme}
        onLogout={handleLogoutClick}
      />
    </nav>
  );
};

export default Navbar;