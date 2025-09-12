import React, { useState } from "react";
import ModalIPs from "./ModalIPs";
import "./ModalIPs.css";
import { FaPlus } from "react-icons/fa";
import GlobalToastContainer from "../common/GlobalToastContainer";
import { showToast } from "../common/toastNotify";

const mockIPs = [
  { ip: "192.168.1.10", status: "libre" },
  { ip: "192.168.1.11", status: "en uso" },
  { ip: "192.168.1.12", status: "libre" },
  { ip: "192.168.1.13", status: "en uso" },
  { ip: "192.168.1.14", status: "libre" },
];

const IPsView = () => {

  const [ips, setIps] = useState(mockIPs);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");

  const handleAddIP = () => {
    setEditIndex(null);
    setShowModal(true);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };

  const handleSave = (ipData) => {
    if (editIndex === null) {
      setIps([...ips, ipData]);
      showToast({ message: "IP agregada correctamente.", type: "success" });
    } else {
      const updatedIps = [...ips];
      updatedIps[editIndex] = ipData;
      setIps(updatedIps);
      showToast({ message: "IP editada correctamente.", type: "success" });
    }
    setShowModal(false);
  };

  // Filtrado por búsqueda y estado
  const ipsFiltradas = ips.filter(ipObj => {
    const matchSearch =
      ipObj.ip.toLowerCase().includes(search.toLowerCase()) ||
      (ipObj.equipoId && ipObj.equipoId.toLowerCase().includes(search.toLowerCase()));
    let matchEstado = true;
    if (estadoFiltro !== "todos") {
      matchEstado = ipObj.status === estadoFiltro;
    }
    return matchSearch && matchEstado;
  });

  return (
    <div className="hardware-page-root" style={{ minHeight: '100vh', padding: '2rem 0' }}>
      <GlobalToastContainer />
  <section style={{ maxWidth: '950px', margin: '0 auto', background: '#23272b', borderRadius: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.45)', padding: '1.5rem 1.5rem 1.2rem 1.5rem', border: '1px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.7rem', justifyContent: 'flex-start' }}>
          <button className="hardware-btn add" style={{ background: '#ffd600', color: '#222', fontWeight: 700, boxShadow: 'none', border: 'none', borderRadius: 8, padding: '0.5em 1.5em' }} onClick={handleAddIP} title="Agregar IP">
            <FaPlus /> Agregar
          </button>
          <input type="text" placeholder="Buscar por IP o ID de equipo" value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: '0.7em 1em', borderRadius: 8, fontSize: '1.08em', border: '2px solid #ffd600', width: 220, background: '#111', color: '#ffd600', fontWeight: 600, marginLeft: '0.5rem' }} />
          <select value={estadoFiltro} onChange={e => setEstadoFiltro(e.target.value)}
            style={{ padding: '0.7em 1em', borderRadius: 8, fontSize: '1.08em', border: '2px solid #ffd600', background: '#111', color: '#ffd600', fontWeight: 600, marginLeft: '0.5rem' }}>
            <option value="todos">Todos los estados</option>
            <option value="libre">Libres</option>
            <option value="en uso">En uso</option>
          </select>
        </div>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table className="modalips-table" style={{ background: 'transparent', borderRadius: '12px', overflow: 'hidden', width: '100%' }}>
            <thead>
              <tr>
                <th>IP</th>
                <th>Estado</th>
                <th>ID Equipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ipsFiltradas.map(({ ip, status, equipoId }, idx) => (
                <tr key={ip} className={status === "libre" ? "ip-libre" : "ip-en-uso"}>
                  <td>{ip}</td>
                  <td>
                    {status === "libre" ? (
                      <span className="modalips-status modalips-status-libre">Libre</span>
                    ) : (
                      <span className="modalips-status modalips-status-uso">En uso</span>
                    )}
                  </td>
                  <td>{equipoId || ""}</td>
                  <td>
                    <button className="hardware-btn add" style={{ minWidth: 90 }} onClick={() => handleEditClick(idx)} title="Editar">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <ModalIPs
            ipData={editIndex !== null ? ips[editIndex] : null}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        )}
      </section>
    </div>
  );
};

export default IPsView;
