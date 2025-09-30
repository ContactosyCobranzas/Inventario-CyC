import React, { useState } from "react";
import ModalIPs from "./ModalIPs";
import "./ModalIPs.css";
import { FaPlus } from "react-icons/fa";
import GlobalToastContainer from "../common/GlobalToastContainer";
import { showToast } from "../common/toastNotify";
import BackButton from "../common/BackButton";

// Datos iniciales de direcciones IP - en producción vendrían de un backend
const initialIPAddresses = [
  { id: 1, ip: "192.168.1.10", status: "libre", assignedTo: null, lastUpdated: "2024-03-15" },
  { id: 2, ip: "192.168.1.11", status: "en uso", assignedTo: "PC-001", lastUpdated: "2024-03-10" },
  { id: 3, ip: "192.168.1.12", status: "libre", assignedTo: null, lastUpdated: "2024-03-12" },
  { id: 4, ip: "192.168.1.13", status: "en uso", assignedTo: "PC-003", lastUpdated: "2024-03-08" },
  { id: 5, ip: "192.168.1.14", status: "libre", assignedTo: null, lastUpdated: "2024-03-14" },
];

const IPsView = ({ onBack }) => {
  const [ipAddressList, setIpAddressList] = useState(initialIPAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  const openAddModal = () => {
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleAddIP = () => {
    openAddModal();
  };

  const handleEditClick = (index) => {
    openEditModal(index);
  };
// los datos de los usuarios 
  const handleIPSave = (ipData) => {
    if (editingIndex === null) {
      const newIP = {
        ...ipData,
        id: Date.now(),
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setIpAddressList([...ipAddressList, newIP]);
      showToast({ 
        message: "Dirección IP agregada exitosamente", 
        type: "success" 
      });
    } else {
      // Actualizar IP existente
      const updatedIPs = [...ipAddressList];
      updatedIPs[editingIndex] = {
        ...updatedIPs[editingIndex],
        ...ipData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setIpAddressList(updatedIPs);
      showToast({ message: "IP editada correctamente.", type: "success" });
    }
    setIsModalOpen(false);
  };

  const ipsFiltradas = ipAddressList.filter(ipObj => {
    const matchSearch =
      ipObj.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ipObj.assignedTo && ipObj.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()));
    let matchEstado = true;
    if (statusFilter !== "todos") {
      matchEstado = ipObj.status === statusFilter;
    }
    return matchSearch && matchEstado;
  });

  return (
  <div style={{width:'100%',margin:'0 auto',paddingTop:0,display:'block', position:'relative', top:0, minHeight:'100vh'}}>
        <GlobalToastContainer />
        <div className="licencias-wrapper" style={{maxWidth: '1100px', width: '100%', margin: '0 auto', background: 'var(--card-bg, #23272b)', borderRadius: '18px', boxShadow: '0 6px 32px rgba(0,0,0,0.18)', padding: '2.2rem 2.2rem 2.5rem 2.2rem', position: 'relative'}}>
          <div className="licencias-header-line" style={{marginBottom:'1.5rem'}}>
            <div style={{display:'flex',alignItems:'center',gap:'1.1rem'}}>
              <BackButton onBack={onBack} />
              <span style={{ fontSize: '2.2rem',fontWeight:700,color:'#FFD600',margin:0}}>IPs</span>
              <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={handleAddIP} title="Agregar IP"><FaPlus style={{marginRight:4}} />Agregar</button>
            </div>
            <div style={{display:'flex',gap:'.7rem',alignItems:'center'}}>
              <input
                style={{background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.5rem .9rem',fontSize:'.95rem',minWidth:160}}
                type="text"
                placeholder="Buscar por IP o ID de equipo"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.5rem .9rem',fontSize:'.95rem'}}
              >
                <option value="todos">Todos los estados</option>
                <option value="libre">Libres</option>
                <option value="en uso">En uso</option>
              </select>
            </div>
          </div>
          <div className="licencias-table-wrapper" style={{width:'100%',overflow:'auto'}}>
            <table className="licencias-table" style={{width:'100%',borderCollapse:'collapse',fontSize:'.98rem'}}>
              <thead>
                <tr style={{background:'#181a1b'}}>
                  <th style={{minWidth:110,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>IP</th>
                  <th style={{minWidth:90,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Estado</th>
                  <th style={{minWidth:120,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>ID Equipo</th>
                  <th style={{color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ipsFiltradas.map(({ ip, status, assignedTo }, idx) => (
                  <tr key={ip} style={{borderBottom:'1px solid #333'}}>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{ip}</td>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>
                      {status === "libre" ? (
                        <span style={{background:'#FFD600',color:'#23272b',borderRadius:'8px',padding:'0.3em 1em',fontWeight:700}}>Libre</span>
                      ) : (
                        <span style={{background:'#686262',color:'#fff',borderRadius:'8px',padding:'0.3em 1em',fontWeight:700}}>En uso</span>
                      )}
                    </td>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{assignedTo || ""}</td>
                    <td style={{padding:'.7rem 1rem'}}>
                      <div style={{display:'flex',gap:'.5rem'}}>
                        <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.38rem .75rem',fontWeight:700,cursor:'pointer'}} onClick={() => handleEditClick(idx)} title="Editar">Ver</button>
                        <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.38rem .75rem',fontWeight:700,cursor:'pointer',marginLeft:'0.5em'}} title="Eliminar">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',marginTop:'1.5em',gap:'0.5em'}}>
            <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.35rem .75rem',fontWeight:700,cursor:'pointer',minWidth:90}}>Anterior</button>
            <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.35rem .75rem',fontWeight:700,cursor:'pointer',minWidth:40}}>1</button>
            <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.35rem .75rem',fontWeight:700,cursor:'pointer',minWidth:90}}>Siguiente</button>
          </div>
          {isModalOpen && (
            <ModalIPs
              ipData={editingIndex !== null ? ipAddressList[editingIndex] : null}
              onSave={handleIPSave}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
  );
};

export default IPsView;
