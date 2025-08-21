import React, { useState, useEffect } from "react";
import { FaBell, FaCog, FaMoon, FaSun } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("dark-theme", dark);
  }, [dark]);

  const handleTheme = () => {
    setDark(!dark);
  };

  return (
    <nav className="navbar">
      <span className="navbar-title">Inventario CyC</span>
      <div className="navbar-actions">
        <button className="navbar-icon-btn" title="Notificaciones">
          <FaBell />
        </button>
        <button className="navbar-icon-btn" title="Configuración">
          <FaCog />
        </button>
        <button
          className="navbar-icon-btn"
          title="Cambiar tema"
          onClick={handleTheme}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
