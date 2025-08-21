import React from "react";
import "./inventory.css";

const InventoryList = () => {
  return (
    <div className="inventory-list">
      <h2>Lista de Inventario</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Ejemplo de fila */}
          <tr>
            <td>1</td>
            <td>
                pc
            </td>
            <td>General</td>
            <td>10</td>
            <td>
              <button>Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
