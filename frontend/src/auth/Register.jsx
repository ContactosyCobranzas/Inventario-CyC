import React, { useState } from "react";

const Register = ({ onBack }) => {
  const [nombre, setNombre] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [password2Reg, setPassword2Reg] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-left">
      <h2>REGISTRARSE</h2>
      <form className="login-form-static" onSubmit={handleRegister} autoComplete="off">
        <div className="input-group">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre completo"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="emailReg">Correo electrónico</label>
          <input
            type="email"
            id="emailReg"
            placeholder="Correo electrónico"
            value={emailReg}
            onChange={e => setEmailReg(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="passwordReg">Contraseña</label>
          <input
            type="password"
            id="passwordReg"
            placeholder="Contraseña"
            value={passwordReg}
            onChange={e => setPasswordReg(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password2Reg">Confirmar contraseña</label>
          <input
            type="password"
            id="password2Reg"
            placeholder="Confirmar contraseña"
            value={password2Reg}
            onChange={e => setPassword2Reg(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Registrarse</button>
        </form>
    </div>
  );
};

export default Register;