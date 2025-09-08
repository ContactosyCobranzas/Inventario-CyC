//. -. / . .-.. / -.-. --- -.. .. --. --- / .... .- -.-- / ...- .- .-. .. .- -... .-.. . ... / --.- ..- . / -. --- / ... . / -.. . ..-. .. -. . -. / .--. --- .-. --.- ..- . / -. --- / . ... / -. . -.-. . ... .- .-. .. ---
import React, { useState } from "react";
import EditProfileForm from "../users/EditProfileForm";
import { showToast } from "./toastNotify";
import { MdMonitor } from "react-icons/md";
import "./ModalConfig.css";

import { FaRegUserCircle, FaRegSun, FaRegMoon, FaSignOutAlt } from "react-icons/fa";

const ModalConfig = ({ open, onClose, fontSize, setFontSize, dark, handleTheme, onLogout }) => {
  const [section, setSection] = useState("pantalla");
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  if (!open) return null;

  // Toast para cambio de pantalla
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
    showToast({
      message: `Tamaño de interfaz cambiado a ${e.target.value}`,
      type: 'info',
      theme: dark ? 'dark' : 'light',
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
            className={`modal-config-menu-btn${section === "tema" ? " active" : ""}`}
            onClick={() => setSection("tema")}
          >
            <span className="modal-config-menu-icon">{dark ? <FaRegSun size={20} /> : <FaRegMoon size={20} />}</span>
            <span>Tema</span>
          </button>
          <button
            className={`modal-config-menu-btn${section === "pantalla" ? " active" : ""}`}
            onClick={() => setSection("pantalla")}
          >
            <span className="modal-config-menu-icon"><MdMonitor size={20} /></span>
            <span>Pantalla</span>
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
              <>
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
              </>
            )
          )}
          {section === "tema" && (
            <>
              <header className="modal-config-header">
                <h2>Tema</h2>
              </header>
              <div className="modal-config-section">
                <button className="modal-btn apply" onClick={handleTheme}>
                  {dark ? <FaRegSun style={{marginRight: '0.5rem'}} /> : <FaRegMoon style={{marginRight: '0.5rem'}} />}
                  Cambiar a tema {dark ? "claro" : "oscuro"}
                </button>
              </div>
            </>
          )}
          {section === "pantalla" && (
            <>
              <header className="modal-config-header">
                <h2>Configuración de pantalla</h2>
              </header>
              <div className="modal-config-section">
                <label htmlFor="font-size-select">Tamaño de la interfaz:</label>
                <select
                  id="font-size-select"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                >
                  <option value="80%">80%</option>
                  <option value="85%">85%</option>
                  <option value="90%">90%</option>
                  <option value="95%">95%</option>
                  <option value="100%">100% (Normal)</option>
                  <option value="105%">105%</option>
                  <option value="110%">110%</option>
                  <option value="115%">115%</option>
                  <option value="120%">120%</option>
                  <option value="130%">130%</option>
                  <option value="140%">140%</option>
                  <option value="150%">150%</option>
                </select>
              </div>
            </>
          )}
          {section === "logout" && (
            <>
              <header className="modal-config-header">
                <h2>Cerrar sesión</h2>
              </header>
              <div className="modal-config-section">
                <p>¿Seguro que deseas cerrar sesión?</p>
                <button className="modal-btn apply" style={{marginTop: '1rem', alignSelf: 'flex-start', background: '#c00', color: '#fff'}} onClick={() => {
                  showToast({
                    message: 'Sesión cerrada correctamente',
                    type: 'success',
                    theme: dark ? 'dark' : 'light',
                  });
                  onLogout();
                }}>
                  <FaSignOutAlt style={{marginRight: '0.5rem'}} /> Cerrar sesión
                </button>
              </div>
            </>
          )}
          <div className="modal-config-actions">
            <button className="modal-btn confirm" onClick={onClose}>Cerrar</button>
          </div>
        </section>
      </div>
    </div>
  );
};
//
export default ModalConfig;
