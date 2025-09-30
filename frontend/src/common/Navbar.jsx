import React, { useState, useEffect } from "react";
import { FaBell, FaCog } from "react-icons/fa";
import ModalNotifications from "./ModalNotifications";
import ModalConfirm from "./ModalConfirm";
import ModalConfig from "./ModalConfig";
import { showToast } from "./toastNotify";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(() => 
    localStorage.getItem("uiFontSize") || "100%"
  );
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const isDarkTheme = true;

  useEffect(() => {
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  }, []);

  const handleFontSizeChange = (newFontSize) => {
    setCurrentFontSize(newFontSize);
    if (window.setGlobalFontSize) {
      window.setGlobalFontSize(newFontSize);
    }
  };

  const handleThemeToggle = () => {
    showToast({
      message: 'El tema claro no está disponible en esta versión',
      type: 'info',
      theme: 'dark',
    });
  };

  const handleLogoutRequest = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    showToast({
      message: 'Sesión cerrada exitosamente',
      type: 'success',
      theme: 'dark',
    });
    
    if (onLogout) {
      onLogout();
    }
  };

  const sampleNotifications = [
    { id: 1, text: "Nuevo usuario registrado", timestamp: "Hace 5 min" },
    { id: 2, text: "Equipo PC-001 asignado", timestamp: "Hace 15 min" },
    { id: 3, text: "Inventario actualizado", timestamp: "Hace 1 hora" },
  ];
  return (
    <nav className="navbar">
      <span className="navbar-title">Sistema de Inventario CyC</span>
      
      <div className="navbar-actions">
        <div className="notifications-container">
          <button
            className="navbar-icon-btn"
            title="Ver notificaciones"
            onClick={() => setIsNotificationsOpen(true)}
            aria-haspopup="true"
            aria-expanded={isNotificationsOpen}
          >
            <FaBell size={20} />
          </button>
          
          <ModalNotifications
            open={isNotificationsOpen}
            notifications={sampleNotifications}
            onClose={() => setIsNotificationsOpen(false)}
            dark={isDarkTheme}
            fontSize={currentFontSize}
          />
        </div>
        
        <button 
          className="navbar-icon-btn" 
          title="Configuración de la aplicación" 
          onClick={() => setIsConfigModalOpen(true)}
        >
          <FaCog size={20} />
        </button>
      </div>

      <ModalConfirm
        open={isLogoutModalOpen}
        title="Confirmar cierre de sesión"
        message="¿Está seguro que desea cerrar la sesión actual?"
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
      
      <ModalConfig
        open={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        fontSize={currentFontSize}
        setFontSize={handleFontSizeChange}
        onLogout={handleLogoutRequest}
      />
    </nav>
  );
};

export default Navbar;