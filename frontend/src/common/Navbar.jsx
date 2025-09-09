import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaCog, FaSignOutAlt, FaSearch } from "react-icons/fa";
import GlobalSearchModal from "./GlobalSearchModal";

import ModalNotifications from "./ModalNotifications";
import ModalConfirm from "./ModalConfirm";
import ModalConfig from "./ModalConfig";
import { showToast } from "./toastNotify";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
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
        <button className="navbar-icon-btn" title="Buscar" onClick={() => setShowSearchModal(true)}>
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
        onLogout={handleLogoutClick}
      />
      {/* Modal de búsqueda global */}
      <GlobalSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        dataSources={{
          equipos: [
            { id: 1, nombre: "PC Juan", usuario: "Juan", serie: "1234", ip: "192.168.1.10" },
            { id: 2, nombre: "PC Ana", usuario: "Ana", serie: "5678", ip: "192.168.1.11" }
          ],
          usuarios: [
            { nombre: "Juan", email: "juan@correo.com", rol: "admin" },
            { nombre: "Ana", email: "ana@correo.com", rol: "user" }
          ],
          licencias: [
            { producto: "Office", clave: "OFF-1234", usuario: "Juan" },
            { producto: "Windows", clave: "WIN-5678", usuario: "Ana" }
          ],
          ips: [
            { id: 1, ip: "192.168.1.10", equipo: "PC Juan" },
            { id: 2, ip: "192.168.1.11", equipo: "PC Ana" }
          ],
          dark: true
        }}
      />
    </nav>
  );
};

export default Navbar;