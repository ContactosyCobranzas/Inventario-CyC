import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogged, setKeepLogged] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de autenticación
  };

  return (
    <div className="login-container card-layout">
      <div className="login-card">
        <div className="login-left">
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
            <div className="forgot">
              <a href="#" tabIndex={-1}>¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
        <div className="login-right">
          <div className="register-box">
            <span>¿No tienes una cuenta?</span>
            <button className="register-btn" disabled>REGISTRARSE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;