import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaCog, FaMoon, FaSun, FaUser, FaSignOutAlt, FaSearch, FaRegBell, FaRegUserCircle, FaRegSun, FaRegMoon } from "react-icons/fa";
import ModalConfirm from "./ModalConfirm";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

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
        <button className="navbar-icon-btn" title="Buscar" onClick={() => setShowSearch((v) => !v)}>
          <FaSearch />
        </button>
        {showSearch && (
          <input
            ref={searchInputRef}
            className="navbar-search-input"
            type="text"
            placeholder="Buscar..."
            onBlur={() => setShowSearch(false)}
          />
        )}
        <button className="navbar-icon-btn" title="Notificaciones">
          <FaRegBell />
        </button>
        <div className="navbar-menu-wrapper" ref={menuRef}>
          <button className="navbar-icon-btn" title="Configuración" onClick={() => setShowMenu((v) => !v)}>
            <FaCog />
          </button>
          {showMenu && (
            <div className="navbar-dropdown">
              <button className="navbar-dropdown-item">
                <FaRegUserCircle style={{marginRight: '0.5rem'}} /> Perfil
              </button>
              <button className="navbar-dropdown-item" onClick={handleTheme}>
                {dark ? <FaRegSun style={{marginRight: '0.5rem'}} /> : <FaRegMoon style={{marginRight: '0.5rem'}} />}
                Tema {dark ? "Claro" : "Oscuro"}
              </button>
              <button className="navbar-dropdown-item">
                <FaCog style={{marginRight: '0.5rem'}} /> Configuración
              </button>
              <button className="navbar-dropdown-item" onClick={handleLogoutClick}>
                <FaSignOutAlt style={{marginRight: '0.5rem'}} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
      <ModalConfirm
        open={showModal}
        title="Cerrar sesión"
        message="¿Seguro que deseas cerrar sesión?"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowModal(false)}
      />
    </nav>
  );
};

export default Navbar;
