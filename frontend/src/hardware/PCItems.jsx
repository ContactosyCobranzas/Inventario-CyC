import React, { useState } from "react";
import { FaDesktop } from "react-icons/fa";
import "./Hardware.css";
// 
import EditPCItemModal from "./EditPCItemModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { toast } from 'react-toastify';
// los datos son simulados
const PCItems = () => {
  const [pcItems, setPcItems] = useState([
    {
      id: 1,
      items_id: 101,
      computers_id: 201,
      itemtype: 'Computer',
      is_deleted: false,
      is_dynamic: false
    },
    {
      id: 2,
      items_id: 102,
      computers_id: 202,
      itemtype: 'Printer',
      is_deleted: false,
      is_dynamic: true
    },
    {
      id: 3,
      items_id: 103,
      computers_id: 203,
      itemtype: 'Monitor',
      is_deleted: true,
      is_dynamic: false
    },
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);


  const handleDelete = (id) => {
    const item = pcItems.find(i => i.id === id);
    setDeleteItem(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setPcItems(items => items.filter(item => item.id !== deleteItem.id));
    setDeleteModalOpen(false);
    toast.success('PC Item eliminado correctamente', {
      theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
    });
  };

  const handleEdit = (id) => {
    const item = pcItems.find(i => i.id === id);
    setEditItem(item);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updated) => {
    setPcItems(items => items.map(i => i.id === updated.id ? updated : i));
    setEditModalOpen(false);
    toast.success('PC Item actualizado correctamente', {
      theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
    });
  };

  return (
    <div className="hardware-section-container hardware-section-container-lg">
      <div className="hardware-section-header">
        <FaDesktop className="hardware-section-icon" />
        <h2>PC Items</h2>
      </div>
      <div className="pcitems-table-wrapper">
        <table className="hardware-table hardware-table-lg pcitems-table-full">
          <thead>
            <tr>
            <th>ID</th>
            <th>items_id</th>
            <th>computers_id</th>
            <th>itemtype</th>
            <th>is_deleted</th>
            <th>is_dynamic</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pcItems.map((item) => (
            <tr key={item.id}>
              <td style={{fontSize:'1.15rem'}}>{item.id}</td>
              <td style={{fontSize:'1.15rem'}}>{item.items_id}</td>
              <td style={{fontSize:'1.15rem'}}>{item.computers_id}</td>
              <td style={{fontSize:'1.15rem'}}>{item.itemtype}</td>
              <td style={{fontSize:'1.15rem'}}>{item.is_deleted ? 'Sí' : 'No'}</td>
              <td style={{fontSize:'1.15rem'}}>{item.is_dynamic ? 'Sí' : 'No'}</td>
              <td>
                <button className="pcitems-action-btn edit" onClick={() => handleEdit(item.id)}>Editar</button>
                <button className="pcitems-action-btn delete" onClick={() => handleDelete(item.id)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      <EditPCItemModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        item={editItem}
        onSave={handleSaveEdit}
      />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        item={deleteItem}
      />
    </div>
  );
};

export default PCItems;
