import React, { useState } from "react";
import ModalConfirm from "../common/ModalConfirm";
import { FaListOl } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import "./MovimientosRecientes.css";

// Mock de movimientos recientes (más de 300 para probar paginación)
const movimientosMock = Array.from({ length: 320 }, (_, i) => ({
  id: i + 1,
  tipo: ["Alta", "Cambio", "Baja"][i % 3],
  descripcion: `Movimiento ${i + 1} realizado en el sistema.`,
  usuario: ["Juan Pérez", "Ana Gómez", "Carlos Ruiz"][i % 3],
  fecha: `2025-09-${String(8 + (i % 3)).padStart(2, '0')} ${String(8 + (i % 12)).padStart(2, '0')}:23`
}));


function exportToCSV(data) {
  const header = ["Fecha", "Tipo", "Descripción", "Usuario"];
  const rows = data.map(mov => [mov.fecha, mov.tipo, mov.descripcion, mov.usuario]);
  let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "movimientos_recientes.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const PAGE_SIZE = 30;

const MovimientosRecientes = () => {
  const [historial, setHistorial] = useState([]);
  const [movimientos, setMovimientos] = useState(movimientosMock);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [movimientosAnteriores, setMovimientosAnteriores] = useState([]);

  React.useEffect(() => {
    if (movimientos.length >= 300) {
      const fechaInicio = movimientos[0]?.fecha || "";
      const fechaFin = movimientos[movimientos.length - 1]?.fecha || "";
      setHistorial(prev => [
        ...prev,
        {
          id: Date.now(),
          fechaInicio,
          fechaFin,
          cantidad: movimientos.length,
          movimientos: [...movimientos]
        }
      ]);
      setMovimientosAnteriores(movimientos);
      setMovimientos([]);
    }
  }, [movimientos]);

  // Paginación
  const totalPages = Math.ceil(movimientos.length / PAGE_SIZE);
  const paginated = movimientos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Handlers para historial
  const handleDescargarHistorial = (item) => {
    exportToCSV(item.movimientos);
  };
  const handleEliminarHistorial = (id) => {
    setHistorial(historial.filter(h => h.id !== id));
  };

  // Acción para ver detalle
  const handleVerDetalle = (mov) => {
    alert(`Detalle del movimiento:\n${mov.descripcion}`);
  };

  return (
    <div>
      <h2 style={{marginBottom: '1.5rem', color: '#FFD600', fontWeight: 700}}>Movimientos Recientes</h2>
      <div>
        <table className="movimientos-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((mov) => (
              <tr key={mov.id}>
                <td>{mov.fecha}</td>
                <td>{mov.tipo}</td>
                <td>{mov.descripcion}</td>
                <td>{mov.usuario}</td>
                <td>
                  <button onClick={() => handleVerDetalle(mov)} style={{background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.8rem', cursor: 'pointer'}}>Ver detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {movimientos.length > 0 && (
          <div className="movimientos-paginacion">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>&lt; Anterior</button>
            <span>Página {page} de {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Siguiente &gt;</button>
          </div>
        )}
        {movimientos.length === 0 && (
          <div className="movimientos-vacio">No hay movimientos recientes registrados.</div>
        )}
      </div>

      {/* Modal de historial de exportaciones */}
      {modalOpen && (
        <div className="modal-confirm-backdrop">
          <div className="modal-confirm">
            <h3 style={{marginBottom: '1.5rem'}}>Historial de exportaciones</h3>
            {historial.length > 0 ? (
              <div className="historial-exportaciones">
                <table className="historial-table">
                  <thead>
                    <tr>
                      <th>Fecha inicio</th>
                      <th>Fecha fin</th>
                      <th>N° movimientos</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historial.map(item => (
                      <tr key={item.id}>
                        <td>{item.fechaInicio}</td>
                        <td>{item.fechaFin}</td>
                        <td>{item.cantidad}</td>
                        <td style={{display: 'flex', gap: '0.5rem'}}>
                          <button title="Descargar" onClick={() => handleDescargarHistorial(item)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem'}}>⬇️</button>
                          <button title="Eliminar" onClick={() => handleEliminarHistorial(item.id)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem'}}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{color: '#ffd600', fontWeight: 'bold', textAlign: 'center', margin: '2rem 0'}}>No hay exportaciones registradas.</div>
            )}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
              <button className="modal-btn cancel" onClick={() => setModalOpen(false)} style={{minWidth: '180px', fontWeight: 'bold', fontSize: '1.1rem'}}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovimientosRecientes;

