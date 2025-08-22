import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaCog, FaMoon, FaSun, FaUser, FaSignOutAlt, FaSearch, FaRegBell, FaRegUserCircle, FaRegSun, FaRegMoon } from "react-icons/fa";
import ModalConfirm from "./ModalConfirm";
import ModalConfig from "./ModalConfig";
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

  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);



  const handleTheme = () => {
    setDark(!dark);
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    setShowModal(false);
    onLogout && onLogout();
  };

  return (
    <nav className="navbar">
      <span className="navbar-title">Inventario CyC</span>
      <div className="navbar-actions">
        <button className="navbar-icon-btn" title="Buscar">
          <FaSearch />
        </button>
        <button className="navbar-icon-btn" title="Notificaciones">
          <FaRegBell />
        </button>
        <button className="navbar-icon-btn" title="Configuración" onClick={() => setShowConfig(true)}>
          <FaCog />
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