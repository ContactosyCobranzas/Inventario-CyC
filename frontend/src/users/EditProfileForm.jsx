import React, { useState } from "react";
import { showToast } from '../common/toastNotify';
import "./user.css";

const EditProfileForm = ({ user, onSave, onCancel }) => {

  const [form, setForm] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    password: "",
    profilePic: user?.profilePic || null,
  });
  const [preview, setPreview] = useState(user?.profilePic || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, profilePic: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (form.profilePic) formData.append("profilePic", form.profilePic);
      onSave(formData);
      const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      showToast({
        message: 'Perfil guardado correctamente',
        type: 'success',
        theme
      });
    }
  };
  
  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>Editar Perfil</h2>
        <div className="input-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Nueva contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Dejar en blanco para no cambiar"
          />
        </div>
        <div className="form-actions">
          <button type="submit">Guardar</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
