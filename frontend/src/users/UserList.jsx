import React, { useState } from "react";
import { FaArrowLeft, FaEdit, FaUsers, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import BackButton from '../common/BackButton';
import UserModal from "./UserModal";
import "./user.css";
import ModalConfirm from '../common/ModalConfirm';
import { showToast } from '../common/toastNotify';
const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, nombre: "Maicol", correo: "Aux.ti@contactosycobranzas.com", rol: "Admin" },
    { id: 2, nombre: "Aka", correo: "aka@contactosycobranzas.com", rol: "Usuario" }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, user: null });

  const handleAdd = () => {
    setEditUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const user = users.find(u => u.id === id);
  setConfirmDelete({ open: true, user });
  };

  const handleModalSubmit = (form) => {
    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...form } : u));
      showToast({
        message: 'Usuario editado correctamente',
        type: 'success',
      });
    } else {
      setUsers([...users, { ...form, id: users.length + 1 }]);
      showToast({
        message: 'Usuario añadido correctamente',
        type: 'success',
      });
    }
    setModalOpen(false);
  };
// 
  return (
    <div className="user-list-container">
      <BackButton />
      <div className="user-list">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }}
              title="Volver"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft size={22} />
            </button>
            <h2 style={{ margin: 0 }}><FaUsers style={{ marginRight: '0.5rem' }} />Lista de Usuarios</h2>
          </div>
          <button
            style={{ background: '#FFD600', color: '#23272b', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            title="Agregar usuario"
            onClick={handleAdd}
          >
            <FaUserPlus /> Agregar usuario
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.correo}</td>
                <td>{user.rol}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button title="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFD600' }} onClick={() => handleEdit(user)}>
                    <FaEdit />
                  </button>
                  <button title="Borrar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d32f2f' }} onClick={() => handleDelete(user.id)}>
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        user={editUser}
        isEdit={!!editUser}
      />
      <ModalConfirm
        open={confirmDelete.open}
        title="Eliminar usuario"
        message={confirmDelete.user ? `¿Estás seguro que deseas eliminar al usuario "${confirmDelete.user.nombre}" con correo "${confirmDelete.user.correo}"? Esta acción no se puede deshacer.` : ''}
        onCancel={() => setConfirmDelete({ open: false, user: null })}
        onConfirm={() => {
          setUsers(users.filter(u => u.id !== confirmDelete.user.id));
          showToast({
            message: 'Usuario borrado correctamente',
            type: 'error',
          });
          setConfirmDelete({ open: false, user: null });
        }}
      />
    </div>
  );
};

export default UserList;
