
import React from "react";
import { FaArrowLeft, FaEdit, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./user.css";

const UserList = () => {
  const navigate = useNavigate();
  return (
    <div className="user-list">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }}
          title="Volver"
        >
          <FaArrowLeft size={22} />
        </button>
        <h2 style={{ margin: 0 }}><FaUsers style={{ marginRight: '0.5rem' }} />Lista de Usuarios</h2>
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
          <tr>
            <td>1</td>
            <td>Maicol</td>
            <td>Aux.ti@contactosycobranzas.com</td>
            <td>Admin</td>
            <td>
              <button title="Editar" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <FaEdit />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
