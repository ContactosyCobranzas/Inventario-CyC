import React, { useState } from "react";
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
    }
  };

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>Editar Perfil</h2>
        <div className="input-group" style={{ alignItems: 'center' }}>
          <label style={{ width: '100%' }}>Foto de perfil</label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 72 }}>
              <img
                src={preview || 'https://ui-avatars.com/api/?name=Usuario&background=cccccc&color=222'}
                alt="Foto de perfil"
                width={72}
                height={72}
                style={{ objectFit: 'cover', borderRadius: '50%', border: '2px solid #c62828', background: '#eee' }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {/* Botón para borrar foto */}
                <button
                  type="button"
                  title="Borrar foto"
                  onClick={() => { setPreview(null); setForm((prev) => ({ ...prev, profilePic: null })); }}
                  style={{
                    background: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 4px #0002',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {/* Icono SVG de papelera */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                </button>
                {/* Botón para subir foto */}
                <label
                  htmlFor="profilePic"
                  title="Subir foto"
                  style={{
                    background: '#c62828',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 4px #0002',
                    cursor: 'pointer',
                    fontSize: 16,
                    border: '2px solid #fff',
                    padding: 0,
                  }}
                >
                  {/* Icono SVG de cámara */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.17a2 2 0 0 0 1.41-.59l1.83-1.83A2 2 0 0 1 10.83 2h2.34a2 2 0 0 1 1.42.59l1.83 1.83A2 2 0 0 0 17.83 5H21a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
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
