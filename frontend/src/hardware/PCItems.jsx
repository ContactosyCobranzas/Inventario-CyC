import React, { useState } from "react";
import { FaDesktop, FaEdit, FaTrash } from "react-icons/fa";
import BackButton from "../common/BackButton";
import "./Hardware.css";

import EditPCItemModal from "./EditPCItemModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AddPCItemModal from "./AddPCItemModal";
import { toast } from 'react-toastify';
// los datos son simulados
const PCItems = ({ onBack }) => {
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
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleAddPCItem = (data) => {
    const newId = pcItems.length ? Math.max(...pcItems.map(e => e.id)) + 1 : 1;
    setPcItems([
      ...pcItems,
      {
        id: newId,
        ...data
      }
    ]);
    setAddModalOpen(false);
    toast.success('PC Item añadido correctamente', {
      theme: document.body.classList.contains('dark-theme') ? 'dark' : 'light',
    });
  };


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
        <div className="hardware-section-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <BackButton onBack={onBack} />
          <FaDesktop className="hardware-section-icon" />
          <h2 style={{ marginRight: '0.5rem' }}>PC Items</h2>
          <button className="hardware-btn add" style={{ marginRight: '0.5rem' }} onClick={() => setAddModalOpen(true)}>Añadir</button>
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
                <button className="pcitems-action-btn edit" onClick={() => handleEdit(item.id)} title="Editar">
                  <FaEdit style={{marginRight: '6px', fontSize: '1.15em'}} /> Editar
                </button>
                <button className="pcitems-action-btn delete" onClick={() => handleDelete(item.id)} title="Borrar">
                  <FaTrash style={{marginRight: '6px', fontSize: '1.15em'}} /> Borrar
                </button>
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
      <AddPCItemModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddPCItem}
      />
    </div>
  );
};

export default PCItems;
