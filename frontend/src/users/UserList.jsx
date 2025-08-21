import React from "react";
import "./user.css";

const UserList = () => {
  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
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
          {/* Ejemplo de fila */}
          <tr>
            <td>1</td>
            <td>Maicol</td>
            <td>Aux.ti@contactosycobranzas.com</td>
            <td>Admin</td>
            <td><button>Editar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
