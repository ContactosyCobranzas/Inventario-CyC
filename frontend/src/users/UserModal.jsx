import React from 'react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, onSubmit, user, isEdit }) => {
  if (!isOpen) return null;

  const [form, setForm] = React.useState({
    nombre: user?.nombre || '',
    correo: user?.correo || '',
    rol: user?.rol || '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="user-modal-dark-backdrop">
      <div className="user-modal-dark">
        <h2 className="user-modal-dark-title">{isEdit ? 'Editar usuario' : 'Agregar usuario'}</h2>
        <form onSubmit={handleSubmit} className="user-modal-dark-form">
          <label className="user-modal-dark-label">Nombre:</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required className="user-modal-dark-input" />
          <label className="user-modal-dark-label">Correo:</label>
          <input name="correo" type="email" value={form.correo} onChange={handleChange} required className="user-modal-dark-input" />
          <label className="user-modal-dark-label">Rol:</label>
          <select name="rol" value={form.rol} onChange={handleChange} required className="user-modal-dark-input">
            <option value="">Seleccione...</option>
            <option value="admin">Admin</option>
            <option value="user">Usuario</option>
          </select>
          {!isEdit && (
            <>
              <label className="user-modal-dark-label">Contraseña:</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required className="user-modal-dark-input" />
            </>
          )}
          <div className="user-modal-dark-actions">
            <button type="submit" className="user-modal-dark-btn">{isEdit ? 'Guardar' : 'Agregar'}</button>
            <button type="button" className="user-modal-dark-btn" onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
