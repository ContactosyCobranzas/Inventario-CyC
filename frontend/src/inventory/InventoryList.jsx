
import React from "react";
import { FaArrowLeft, FaEdit, FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./inventory.css";
import BackButton from "../common/BackButton";

const InventoryList = () => {
  const navigate = useNavigate();
  return (
    <div className="inventory-list">
  <BackButton />
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }}
          title="Volver"
        >
          <FaArrowLeft size={22} />
        </button>
        <h2 style={{ margin: 0 }}><FaBox style={{ marginRight: '0.5rem' }} />Lista de Inventario</h2>
      </div>
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
            <td>pc</td>
            <td>General</td>
            <td>10</td>
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

export default InventoryList;
