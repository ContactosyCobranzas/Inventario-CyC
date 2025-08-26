import React, { useState, useEffect } from "react";
import { showToast } from '../common/toastNotify';
import "./Login.css";
import Register from "./Register";  

const getSystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogged, setKeepLogged] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  useEffect(() => {
    const theme = localStorage.getItem('theme') || getSystemTheme();
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Detectar tema actual
    const theme = localStorage.getItem('theme') || getSystemTheme();
    showToast({
      message: '¡Bienvenido! Has iniciado sesión correctamente.',
      type: 'success',
      theme
    });
    if (onLogin) onLogin();
  };

  return (
    <div className="login-container card-layout">
      <div className={`login-card${isRegister ? ' show-register' : ''}`}> 
        <div className="login-left" style={{display: 'flex', transition: 'all 0.4s'}}>
          {!isRegister ? (
            <>
              <h2>INICIAR SESIÓN</h2>
              <form className="login-form-static" onSubmit={handleSubmit} autoComplete="off">
                <div className="input-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <div className="login-options">
                  <label className="keep-logged">
                    <input
                      type="checkbox"
                      checked={keepLogged}
                      onChange={e => setKeepLogged(e.target.checked)}
                    />
                    <span>Mantener sesión iniciada</span>
                  </label>
                </div>
                <button type="submit" className="login-btn">Ingresar</button>
              </form>
            </>
          ) : (
            <Register onBack={() => setIsRegister(false)} />
          )}
        </div>
        <div className="login-right">
          <div className="register-box">
            {isRegister ? (
              <>
                <span>¿Ya tienes una cuenta?</span>
                <button className="register-btn" type="button" onClick={() => setIsRegister(false)}>INICIAR SESIÓN</button>
              </>
            ) : (
              <>
                <span>¿No tienes una cuenta?</span>
                <button className="register-btn" type="button" onClick={() => setIsRegister(true)}>REGISTRARSE</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// 
export default Login;