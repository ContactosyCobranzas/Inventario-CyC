import React, { useState } from "react";
import EditProfileForm from "../users/EditProfileForm";
import { showToast } from "./toastNotify";
import { MdMonitor } from "react-icons/md";
import "./ModalConfig.css";

import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";

const ModalConfig = ({ open, onClose, fontSize, setFontSize, onLogout }) => {
  const [section, setSection] = useState("perfil");
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  if (!open) return null;

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    showToast({
      message: `Tamaño de interfaz cambiado a ${e.target.value}`,
      type: 'info',
      theme: 'dark',
    });
  };
  return (
    <div className="modal-config-backdrop">
      <div className="modal-config">
        <aside className="modal-config-menu">
          <button
            className={`modal-config-menu-btn${section === "perfil" ? " active" : ""}`}
            onClick={() => setSection("perfil")}
          >
            <span className="modal-config-menu-icon"><FaRegUserCircle size={20} /></span>
            <span>Perfil</span>
          </button>
          <button
            className={`modal-config-menu-btn${section === "logout" ? " active" : ""}`}
            onClick={() => setSection("logout")}
            style={{ color: section === "logout" ? '#c00' : undefined }}
          >
            <span className="modal-config-menu-icon"><FaSignOutAlt size={20} /></span>
            <span>Cerrar sesión</span>
          </button>
        </aside>
        <section className="modal-config-content">
          {section === "perfil" && (
            editandoPerfil ? (
              <div className="modal-config-section">
                <EditProfileForm onCancel={() => setEditandoPerfil(false)} />
                <div className="modal-config-actions">
                  <button className="modal-btn confirm" onClick={onClose}>Cerrar</button>
                </div>
              </div>
            ) : (
              <div>
                <header className="modal-config-header">
                  <h2>Perfil</h2>
                </header>
                <div className="modal-config-section perfil-card">
                  <div className="perfil-avatar">
                    <img src="https://ui-avatars.com/api/?name=Estariex&background=FFD600&color=23272b" alt="Avatar" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} />
                  </div>
                  <div className="perfil-info" style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:'0.3rem'}}>
                    <div className="perfil-nombre" style={{fontSize:'1.25rem',fontWeight:700}}>Estariex</div>
                    <div className="perfil-usuario" style={{fontSize:'1.05rem',opacity:0.8}}>@maicol1606</div>
                  </div>
                </div>
                <div className="modal-config-actions">
                  <button className="modal-btn edit" onClick={() => setEditandoPerfil(true)}>Editar</button>
                  <button className="modal-btn confirm" onClick={onClose}>Cerrar</button>
                </div>
              </div>
            )
          )}
          {section === "logout" && (
            <div>
              <header className="modal-config-header">
                <h2>Cerrar sesión</h2>
              </header>
              <div className="modal-config-section">
                <p>¿Seguro que deseas cerrar sesión?</p>
                <button className="modal-btn apply" style={{marginTop: '1rem', alignSelf: 'flex-start', background: '#c00', color: '#fff'}} onClick={() => {
                  showToast({
                    message: 'Sesión cerrada correctamente',
                    type: 'success',
                    theme: 'dark',
                  });
                  onLogout();
                }}>
                  <FaSignOutAlt style={{marginRight: '0.5rem'}} /> Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
export default ModalConfig;
