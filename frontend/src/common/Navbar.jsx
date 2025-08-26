import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBell, FaCog, FaMoon, FaSun, FaSignOutAlt, FaSearch } from "react-icons/fa";
import NotificationDropdown from "./NotificationDropdown";
import ModalConfirm from "./ModalConfirm";
import ModalConfig from "./ModalConfig";
import "./Navbar.css";  
//  
const Navbar = ({ onLogout }) => {
  const [showConfig, setShowConfig] = useState(false);

  const [fontSize, setFontSizeState] = useState(() => localStorage.getItem("uiFontSize") || "100%");
// 
  const setFontSize = (val) => {
    setFontSizeState(val);
    if (window.setGlobalFontSize) window.setGlobalFontSize(val);
  };
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [showModal, setShowModal] = useState(false);
  const notifBtnRef = useRef(null);

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

  // Notificaciones tipo Steam
  const notifications = [
    { id: 1, text: "Nuevo usuario registrado" },
    { id: 2, text: "Equipo asignado" },
    { id: 3, text: "Inventario actualizado" },
  ];

  const showSteamToasts = () => {
    notifications.forEach(n => {
      toast.info(n.text, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: <FaBell style={{ color: '#c62828' }} />,
        style: {
          background: '#23272b',
          color: '#fff',
          fontWeight: 500,
          fontSize: '1.08rem',
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.22)',
          borderRadius: '14px',
        }
      });
    });
  };

  return (
    <nav className="navbar">
      <span className="navbar-title">Inventario CyC</span>
      <div className="navbar-actions" style={{ position: 'relative' }}>
        <button className="navbar-icon-btn" title="Buscar">
          <FaSearch size={22} />
        </button>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            className="navbar-icon-btn"
            title="Notificaciones"
            ref={notifBtnRef}
            onClick={showSteamToasts}
            aria-haspopup="true"
            aria-expanded={false}
          >
            <FaBell size={22} />
          </button>
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
      <ToastContainer />
    </nav>
  );
};

export default Navbar;