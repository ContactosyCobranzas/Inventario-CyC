import React, { useState } from "react";
import { FaDesktop, FaEdit, FaTrash } from "react-icons/fa";
import BackButton from "../common/BackButton";
import "./Hardware.css";

import EditPCItemModal from "./EditPCItemModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AddPCItemModal from "./AddPCItemModal";
import { toast } from 'react-toastify';
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
    confirmDelete(item);
  };

  const lastDeleted = React.useRef(null);
  const confirmDelete = (item) => {
    lastDeleted.current = item;
    setPcItems(items => items.filter(i => i.id !== item.id));
    const isDark = document.body.classList.contains('dark-theme');
    toast.warn(
      <div style={{
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minWidth:340,minHeight:110
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{marginBottom:8}}><path d="M12 8v4m0 4h.01M21 18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7l5 5v9Z" stroke={isDark ? '#ffd600' : '#181818'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v4m0 4h.01" stroke={isDark ? '#ffd600' : '#181818'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{fontWeight:700,fontSize:'1.15rem',marginBottom:6}}>PC Item eliminado</span>
        <span style={{fontSize:'1rem',marginBottom:12}}>¿Deseas deshacer?</span>
        <button
          style={{
            background: isDark ? '#ffd600' : '#181818',
            color: isDark ? '#181818' : '#ffd600',
            border:'none',
            borderRadius:8,
            padding:'0.6rem 1.5rem',
            fontWeight:'bold',
            fontSize:'1.08rem',
            cursor:'pointer',
            boxShadow:'0 2px 8px rgba(0,0,0,0.18)'
          }}
          onClick={() => {
            setPcItems(prev => [...prev, lastDeleted.current]);
            toast.dismiss();
          }}
        >Deshacer</button>
      </div>,
      {
        autoClose: 10000,
        closeOnClick: false,
        position: 'top-center',
        icon: false,
        style: {
          background: isDark ? '#181818' : '#ffd600',
          color: isDark ? '#ffd600' : '#181818',
          fontWeight: 500,
          borderRadius: '16px',
          minWidth: '340px',
          minHeight: '110px',
          boxShadow: '0 6px 32px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }
    );
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
      <AddPCItemModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddPCItem}
      />
    </div>
  );
};

export default PCItems;
