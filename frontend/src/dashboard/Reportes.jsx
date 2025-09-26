import React, { useState, useMemo } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import BackButton from "../common/BackButton";
import { showToast } from "../common/toastNotify";
import "./Reportes.css";

const reportesMock = [
  {
    id: 1,
    titulo: "Fallo en impresora de recepción",
    descripcion: "La impresora principal no responde desde el 25/08. Se solicitó soporte técnico.",
    fecha: "2025-08-26"
  },
  {
    id: 2,
    titulo: "Problema de acceso a red",
    descripcion: "Algunos usuarios reportan desconexión intermitente en la red WiFi.",
    fecha: "2025-08-22"
  },
  {
    id: 3,
    titulo: "Error en sistema de inventario",
    descripcion: "Se detectó un bug menor al registrar nuevos equipos. En revisión por desarrollo.",
    fecha: "2025-08-18"
  }
];

const PAGE_SIZE = 25;

function exportToCSV(data) {
  const header = ["Fecha", "Título", "Descripción"];
  const rows = data.map(r => [r.fecha, r.titulo, r.descripcion]);
  const csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n" + rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(",")).join("\n");
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.setAttribute("download", "reportes.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function exportToExcel(data) {
  const header = ["Fecha", "Título", "Descripción"];
  const rows = data.map(r => [r.fecha, r.titulo, r.descripcion]);
  const csvContent = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8," + header.join(",") + "\n" + rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(",")).join("\n");
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.setAttribute("download", "reportes.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const Reportes = ({ onBack }) => {
  const [reportes, setReportes] = useState(reportesMock);
  const [page, setPage] = useState(1);
  const [filtro, setFiltro] = useState("");

  const filtrados = useMemo(() => {
    if (!filtro.trim()) return reportes;
    const f = filtro.toLowerCase();
    return reportes.filter(r => r.titulo.toLowerCase().includes(f) || r.descripcion.toLowerCase().includes(f));
  }, [filtro, reportes]);

  const totalPages = Math.ceil(filtrados.length / PAGE_SIZE) || 1;
  const pageSafe = Math.min(page, totalPages);
  const paginados = filtrados.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  const handleVaciar = () => {
    if (window.confirm("¿Seguro que deseas eliminar todos los reportes visibles?")) {
      setReportes([]);
      showToast({ message: "Reportes eliminados", type: "success", theme: "dark" });
    }
  };

  const [eliminarVisible, setEliminarVisible] = useState(false);
  const [idEliminar, setIdEliminar] = useState(null);

  const handleEliminarUno = (id) => {
    setIdEliminar(id);
    setEliminarVisible(true);
  };

  const confirmarEliminar = () => {
    setReportes(prev => prev.filter(r => r.id !== idEliminar));
    setEliminarVisible(false);
    setIdEliminar(null);
    showToast({ message: "Reporte eliminado", type: "success", theme: "dark" });
  };

  const cancelarEliminar = () => {
    setEliminarVisible(false);
    setIdEliminar(null);
  };

  const [detalleVisible, setDetalleVisible] = useState(false);
  const [reporteDetalle, setReporteDetalle] = useState(null);

  const handleVerDetalle = (rep) => {
    setReporteDetalle(rep);
    setDetalleVisible(true);
  };
  const cerrarDetalle = () => {
    setDetalleVisible(false);
    setReporteDetalle(null);
  };

  return (
    <div className="reportes-wrapper">
      <div className="reportes-header-line">
        <div style={{display:'flex',alignItems:'center',gap:'0.9rem'}}>
          <BackButton onBack={onBack} />
          <FaRegCommentDots className="reportes-icon-inline" />
          <h2 className="reportes-title-inline">Reportes</h2>
        </div>
        <div className="reportes-actions">
          <input
            className="reportes-search"
            placeholder="Buscar..."
            value={filtro}
            onChange={e => { setFiltro(e.target.value); setPage(1); }}
          />
          <button onClick={() => exportToCSV(filtrados)} title="Exportar CSV">CSV</button>
          <button onClick={() => exportToExcel(filtrados)} title="Exportar Excel">Excel</button>
          <button className="danger" onClick={handleVaciar} title="Vaciar todos los reportes visibles">Vaciar</button>
        </div>
      </div>

      <div className="reportes-table-wrapper">
        {paginados.length > 0 ? (
          <table className="reportes-table">
            <thead>
              <tr>
                <th style={{minWidth:110}}>Fecha</th>
                <th style={{minWidth:220}}>Título</th>
                <th>Descripción</th>
                <th style={{minWidth:150}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginados.map(rep => (
                <tr key={rep.id}>
                  <td>{rep.fecha}</td>
                  <td>{rep.titulo}</td>
                  <td>{rep.descripcion}</td>
                  <td>
                    <div className="reportes-row-actions">
                      <button onClick={() => handleVerDetalle(rep)} className="primary-sm" title="Ver detalle">Ver</button>
                      <button onClick={() => handleEliminarUno(rep.id)} className="danger-sm" title="Eliminar">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="reportes-empty">No hay reportes registrados.</div>
        )}
        {detalleVisible && reporteDetalle && (
          <div className="licencias-modal-overlay">
            <div className="licencias-modal-detalle">
              <div className="licencias-modal-header">
                <span style={{fontWeight:700,fontSize:'1.2rem',color:'#FFD600'}}>Detalle del reporte</span>
                <button className="licencias-modal-close" onClick={cerrarDetalle}>&times;</button>
              </div>
              <div className="licencias-modal-body">
                <div className="licencias-modal-row" style={{color:'#fff'}}>
                  <div><b>Fecha:</b> {reporteDetalle.fecha}</div>
                  <div><b>Título:</b> {reporteDetalle.titulo}</div>
                  <div><b>Descripción:</b> {reporteDetalle.descripcion}</div>
                </div>
              </div>
              <div className="licencias-modal-footer">
                <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={cerrarDetalle}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
        {eliminarVisible && (
          <div className="licencias-modal-overlay">
            <div className="licencias-modal-detalle">
              <div className="licencias-modal-header">
                <span style={{fontWeight:700,fontSize:'1.2rem',color:'#FFD600'}}>¿Eliminar reporte?</span>
                <button className="licencias-modal-close" onClick={cancelarEliminar}>&times;</button>
              </div>
              <div className="licencias-modal-body">
                <div className="licencias-modal-row" style={{color:'#fff'}}>
                  ¿Seguro que deseas eliminar este reporte? Esta acción no se puede deshacer.
                </div>
              </div>
              <div className="licencias-modal-footer">
                <button style={{background:'rgba(2, 2, 2, 1)',color:'#FFD600',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={confirmarEliminar}>Eliminar</button>
                <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={cancelarEliminar}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {paginados.length > 0 && (
        <div className="reportes-pagination">
          <button disabled={pageSafe === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>{'<'} Anterior</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={p === pageSafe ? 'active' : ''}
              onClick={() => setPage(p)}
            >{p}</button>
          ))}
          <button disabled={pageSafe === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Siguiente {'>'}</button>
        </div>
      )}
    </div>
  );
};

export default Reportes;
