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

  return (
    <div className="hardware-page-root" style={{ background: '#181818', minHeight: '100vh', padding: '2rem 0' }}>
      <GlobalToastContainer />
      <section style={{ maxWidth: '950px', margin: '0 auto', background: '#23272b', borderRadius: '18px', boxShadow: '0 6px 32px rgba(0,0,0,0.85)', padding: '2.5rem 2.5rem 2rem 2.5rem', border: '1.5px solid #222' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h2 style={{ color: '#FFD600', fontWeight: 700, fontSize: '2.1rem', margin: 0, letterSpacing: '0.01em' }}>Listado de IPs</h2>
          <button className="hardware-btn add" onClick={handleAddIP} title="Agregar IP">
            <FaPlus /> Agregar
          </button>
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
              {ips.map(({ ip, status, equipoId }, idx) => (
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
