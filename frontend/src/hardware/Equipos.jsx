import React, { useState } from "react";
import { FaLaptop } from "react-icons/fa";
import "./Hardware.css";
import EditPCItemModal from "./EditPCItemModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { toast } from 'react-toastify';

const initialEquipos = [
  {
    id: 1,
    entities_id: 1,
    name: "Equipo-001",
    serial: "SN123456",
    otherserial: "OSN654321",
    contact: "Juan Pérez",
    contact_num: "123456789",
    users_id_tech: 2,
    groups_id_tech: 1,
    comment: "Equipo en buen estado",
    date_mod: "2025-08-27",
    autoupdatesystems_id: 1,
    locations_id: 1,
    networks_id: 1,
    computermodels_id: 1,
    computertypes_id: 1,
    is_template: false,
    template_name: "",
    manufacturers_id: 1,
    is_deleted: false,
    is_dynamic: false,
    users_id: 3,
    groups_id: 2,
    states_id: 1,
    ticket_tco: "TCO-001",
    uuid: "uuid-001",
    date_creation: "2025-08-01",
    is_recursive: false
  }
];

const Equipos = () => {
  const [equipos, setEquipos] = useState(initialEquipos);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleDelete = (id) => {
    const item = equipos.find(i => i.id === id);
    setDeleteItem(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setEquipos(items => items.filter(item => item.id !== deleteItem.id));
    setDeleteModalOpen(false);
  toast.success('Equipo eliminado correctamente');
  };

  const handleEdit = (id) => {
    const item = equipos.find(i => i.id === id);
    setEditItem(item);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updated) => {
    setEquipos(items => items.map(i => i.id === updated.id ? updated : i));
    setEditModalOpen(false);
  toast.success('Equipo actualizado correctamente');
  };

  return (
    <div className="equipos-section-container equipos-full-width">
      <div className="equipos-section-header">
        <FaLaptop className="hardware-section-icon" />
        <h2>Equipos</h2>
      </div>
      <div className="equipos-table-wrapper">
      <table className="equipos-table-full">
        <thead>
          <tr>
            <th>id</th>
            <th>entities_id</th>
            <th>name</th>
            <th>serial</th>
            <th>otherserial</th>
            <th>contact</th>
            <th>contact_num</th>
            <th>users_id_tech</th>
            <th>groups_id_tech</th>
            <th>comment</th>
            <th>date_mod</th>
            <th>autoupdatesystems_id</th>
            <th>locations_id</th>
            <th>networks_id</th>
            <th>computermodels_id</th>
            <th>computertypes_id</th>
            <th>is_template</th>
            <th>template_name</th>
            <th>manufacturers_id</th>
            <th>is_deleted</th>
            <th>is_dynamic</th>
            <th>users_id</th>
            <th>groups_id</th>
            <th>states_id</th>
            <th>ticket_tco</th>
            <th>uuid</th>
            <th>date_creation</th>
            <th>is_recursive</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.entities_id}</td>
              <td>{item.name}</td>
              <td>{item.serial}</td>
              <td>{item.otherserial}</td>
              <td>{item.contact}</td>
              <td>{item.contact_num}</td>
              <td>{item.users_id_tech}</td>
              <td>{item.groups_id_tech}</td>
              <td>{item.comment}</td>
              <td>{item.date_mod}</td>
              <td>{item.autoupdatesystems_id}</td>
              <td>{item.locations_id}</td>
              <td>{item.networks_id}</td>
              <td>{item.computermodels_id}</td>
              <td>{item.computertypes_id}</td>
              <td>{item.is_template ? 'Sí' : 'No'}</td>
              <td>{item.template_name}</td>
              <td>{item.manufacturers_id}</td>
              <td>{item.is_deleted ? 'Sí' : 'No'}</td>
              <td>{item.is_dynamic ? 'Sí' : 'No'}</td>
              <td>{item.users_id}</td>
              <td>{item.groups_id}</td>
              <td>{item.states_id}</td>
              <td>{item.ticket_tco}</td>
              <td>{item.uuid}</td>
              <td>{item.date_creation}</td>
              <td>{item.is_recursive ? 'Sí' : 'No'}</td>
              <td>
                <button className="hardware-btn edit" onClick={() => handleEdit(item.id)}>Editar</button>
                <button className="hardware-btn delete" onClick={() => handleDelete(item.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Modales de edición y confirmación de borrado */}
      <EditPCItemModal open={editModalOpen} item={editItem} onSave={handleSaveEdit} onClose={() => setEditModalOpen(false)} />
      <ConfirmDeleteModal open={deleteModalOpen} onConfirm={confirmDelete} onCancel={() => setDeleteModalOpen(false)} />
    </div>
  );
};

export default Equipos;
