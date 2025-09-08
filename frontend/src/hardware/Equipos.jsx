import React, { useState, useRef } from "react";
import { FaLaptop } from "react-icons/fa";
import BackButton from "../common/BackButton";
import "./Hardware.css";
import EditEquipoModal from "./EditEquipoModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AddEquipoModal from "./AddEquipoModal";
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

const Equipos = ({ onBack }) => {
  const [equipos, setEquipos] = useState(initialEquipos);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  // Eliminar confirmación modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const handleAddEquipo = (data) => {
    const newId = equipos.length ? Math.max(...equipos.map(e => e.id)) + 1 : 1;
    setEquipos([
      ...equipos,
      {
        id: newId,
        entities_id: 1,
        users_id_tech: 0,
        groups_id_tech: 0,
        autoupdatesystems_id: 0,
        locations_id: 0,
        networks_id: 0,
        computermodels_id: 0,
        computertypes_id: 0,
        is_template: false,
        template_name: "",
        manufacturers_id: 0,
        is_deleted: false,
        is_dynamic: false,
        users_id: 0,
        groups_id: 0,
        states_id: 0,
        ticket_tco: "",
        uuid: "",
        date_creation: new Date().toISOString().slice(0,10),
        is_recursive: false,
        date_mod: new Date().toISOString().slice(0,10),
        ...data
      }
    ]);
    setAddModalOpen(false);
    toast.success('Equipo añadido correctamente');
  };

  const handleDelete = (id) => {
    const item = equipos.find(i => i.id === id);
    // Ejecutar borrado directamente con toast
    confirmDelete(item);
  };

  const lastDeleted = useRef(null);
  const confirmDelete = (item) => {
    lastDeleted.current = item;
    setEquipos(items => items.filter(i => i.id !== item.id));
    const isDark = document.body.classList.contains('dark-theme');
    toast.warn(
      <div style={{
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minWidth:340,minHeight:110
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{marginBottom:8}}><path d="M12 8v4m0 4h.01M21 18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7l5 5v9Z" stroke={isDark ? '#ffd600' : '#181818'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v4m0 4h.01" stroke={isDark ? '#ffd600' : '#181818'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{fontWeight:700,fontSize:'1.15rem',marginBottom:6}}>Equipo eliminado</span>
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
            setEquipos(prev => [...prev, lastDeleted.current]);
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
    const item = equipos.find(i => i.id === id);
    setEditItem(item);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updated) => {
    setEquipos(items => items.map(i => i.id === updated.id ? updated : i));
    setEditModalOpen(false);
    setTimeout(() => {
      toast.success('Equipo actualizado correctamente');
    }, 100);
  };

  return (
    <div className="equipos-section-container equipos-full-width">
      <div className="equipos-section-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <BackButton onBack={onBack} />
        <FaLaptop className="hardware-section-icon" />
        <h2>Equipos</h2>
        <button className="hardware-btn add" style={{ marginLeft: 'auto' }} onClick={() => setAddModalOpen(true)}>Añadir</button>
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
  {/* Modales de edición, confirmación de borrado y añadir */}
  <EditEquipoModal open={editModalOpen} item={editItem} onSave={handleSaveEdit} onClose={() => setEditModalOpen(false)} />
  {/* Eliminado el modal de confirmación de borrado */}
  <AddEquipoModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddEquipo} />
    </div>
  );
};

export default Equipos;
