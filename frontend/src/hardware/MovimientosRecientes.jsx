import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaInfoCircle, FaIdBadge, FaDesktop, FaNetworkWired } from "react-icons/fa";
import { showToast } from "../common/toastNotify";
import ModalConfirm from "../common/ModalConfirm";
import { FaListOl } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import BackButton from "../common/BackButton";
import "./MovimientosRecientes.css";

const movimientosMock = Array.from({ length: 320 }, (_, i) => ({
  id: i + 1,
  tipo: ["Alta", "Cambio", "Baja"][i % 3],
  descripcion: `Movimiento ${i + 1} realizado en el sistema.`,
  usuario: ["Juan Pérez", "Ana Gómez", "Carlos Ruiz"][i % 3],
  fecha: `2025-09-${String(8 + (i % 3)).padStart(2, '0')} ${String(8 + (i % 12)).padStart(2, '0')}:23`,
  ip: `192.168.1.${(i % 50) + 1}`,
  dispositivo: ["PC", "Laptop", "Servidor"][i % 3],
  cambios: i % 3 === 1 ? "Actualización de software" : (i % 3 === 2 ? "Eliminación de usuario" : "Registro inicial"),
  detallesExtra: `Detalle extendido del movimiento ${i + 1}.`,
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

const PAGE_SIZE = 50;

const MovimientosRecientes = ({ onBack }) => {
  const [movimientos, setMovimientos] = useState(movimientosMock);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");

  React.useEffect(() => {
    if (movimientos.length >= 400) {
      showToast({
        message: `¡Has superado el límite de 400 movimientos! Debes vaciar la lista para evitar problemas.`,
        type: 'error',
        theme: 'dark',
      });
    } else if (movimientos.length >= 300 && movimientos.length < 400) {
      showToast({
        message: `¡Advertencia! Estás cerca del límite (400) de movimientos. Considera vaciar la lista pronto.`,
        type: 'warning',
        theme: 'dark',
      });
    }
  }, []);
function exportToExcel(data) {
  const header = ["Fecha", "Tipo", "Descripción", "Usuario"];
  const rows = data.map(mov => [mov.fecha, mov.tipo, mov.descripcion, mov.usuario]);
  let csvContent = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8," + header.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "movimientos_recientes.xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  React.useEffect(() => {
  }, [movimientos]);

  const movimientosFiltrados = movimientos.filter(mov => {
    const texto = `${mov.fecha} ${mov.tipo} ${mov.descripcion} ${mov.usuario}`.toLowerCase();
    const coincideBusqueda = texto.includes(search.toLowerCase());
    const coincideTipo = tipoFiltro ? mov.tipo === tipoFiltro : true;
    return coincideBusqueda && coincideTipo;
  });
  const totalPages = Math.ceil(movimientosFiltrados.length / PAGE_SIZE);
  const paginated = movimientosFiltrados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const [detalleVisible, setDetalleVisible] = useState(false);
  const [movDetalle, setMovDetalle] = useState(null);

  const handleVerDetalle = (mov) => {
    setMovDetalle(mov);
    setDetalleVisible(true);
  };

  const handleCerrarDetalle = () => {
    setDetalleVisible(false);
    setMovDetalle(null);
  };

  const [vaciarVisible, setVaciarVisible] = useState(false);
  const [vaciarTipo, setVaciarTipo] = useState(null);

  const handleVaciarPagina = () => {
    setVaciarTipo('pagina');
    setVaciarVisible(true);
  };


  const handleVaciarTodo = () => {
    setVaciarTipo('todo');
    setVaciarVisible(true);
  };

  const confirmarVaciar = () => {
    if (vaciarTipo === 'todo') {
      setMovimientos([]);
      showToast({
        message: 'Todos los movimientos recientes han sido eliminados.',
        type: 'success',
        theme: 'dark',
      });
    } else if (vaciarTipo === 'pagina') {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const nuevos = [...movimientos.slice(0, start), ...movimientos.slice(end)];
      setMovimientos(nuevos);
      showToast({
        message: 'Movimientos de la página actual eliminados.',
        type: 'success',
        theme: 'dark',
      });
      if (nuevos.length > 0 && start >= nuevos.length) {
        setPage(Math.max(1, Math.ceil(nuevos.length / PAGE_SIZE)));
      }
    }
    setVaciarVisible(false);
    setVaciarTipo(null);
  };

  const cancelarVaciar = () => {
    setVaciarVisible(false);
    setVaciarTipo(null);
  };

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem'}}>
        <BackButton onBack={onBack} />
        <h2 className="movimientos-titulo" style={{margin:0}}>Movimientos Recientes</h2>
      </div>
      <div className="movimientos-flex-row">
        <div className="movimientos-flex-left">
          <div className="movimientos-botones">
            <button className="mov-btn" onClick={() => exportToCSV(movimientosFiltrados)}>
              Exportar CSV
            </button>
            <button className="mov-btn" onClick={() => exportToExcel(movimientosFiltrados)}>
              Exportar Excel
            </button>
            <button className="mov-btn" onClick={handleVaciarTodo}>
              Vaciar todo
            </button>
            <button className="mov-btn" onClick={handleVaciarPagina}>
              Vaciar página
            </button>
            {vaciarVisible && (
              <div className="licencias-modal-overlay">
                <div className="licencias-modal-detalle">
                  <div className="licencias-modal-header">
                    <span style={{fontWeight:700,fontSize:'1.2rem',color:'#FFD600'}}>
                      {vaciarTipo === 'todo' ? '¿Vaciar todos los movimientos?' : '¿Vaciar movimientos de la página?'}
                    </span>
                    <button className="licencias-modal-close" onClick={cancelarVaciar}>&times;</button>
                  </div>
                  <div className="licencias-modal-body">
                    <div className="licencias-modal-row" style={{color:'#fff'}}>
                      {vaciarTipo === 'todo'
                        ? '¿Seguro que deseas eliminar todos los movimientos recientes? Esta acción no se puede deshacer.'
                        : '¿Seguro que deseas eliminar los movimientos de esta página?'}
                    </div>
                  </div>
                  <div className="licencias-modal-footer">
                    <button style={{background:'rgba(2, 2, 2, 1)',color:'#FFD600',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={confirmarVaciar}>Eliminar</button>
                    <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={cancelarVaciar}>Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="movimientos-filtros">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="mov-input"
            />
            <select
              value={tipoFiltro}
              onChange={e => { setTipoFiltro(e.target.value); setPage(1); }}
              className="mov-select"
            >
              <option value="">Todos los tipos</option>
              <option value="Alta">Alta</option>
              <option value="Cambio">Cambio</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
        </div>
        <div className="movimientos-flex-right">
          <div className="mov-card-box mov-card-visible">
            <div className="mov-card-icon">
              <FaListOl size={44} style={{color:'#FFD600',marginBottom:'0.5rem'}} />
            </div>
            <div className="mov-card-count">{movimientos.length}</div>
            <div className="mov-card-label">Movimientos registrados</div>
          </div>
        </div>
      </div>
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
                  <button className="mov-btn" onClick={() => handleVerDetalle(mov)}>Ver detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {detalleVisible && movDetalle && (
          <div className="mov-modal-overlay">
            <div className="mov-modal-detalle">
              <div className="mov-modal-header">
                <FaInfoCircle size={28} style={{marginRight:8,color:'#FFD600'}} />
                <span style={{fontWeight:700,fontSize:'1.2rem'}}>Detalle del Movimiento</span>
                <button className="mov-modal-close" onClick={handleCerrarDetalle}>&times;</button>
              </div>
              <div className="mov-modal-body">
                <div className="mov-modal-row">
                  <FaIdBadge style={{marginRight:6}} /> <b>ID:</b> {movDetalle.id}
                </div>
                <div className="mov-modal-row">
                  <FaCalendarAlt style={{marginRight:6}} /> <b>Fecha:</b> {movDetalle.fecha}
                </div>
                <div className="mov-modal-row">
                  <FaUser style={{marginRight:6}} /> <b>Usuario:</b> {movDetalle.usuario}
                </div>
                <div className="mov-modal-row">
                  <b>Tipo:</b> {movDetalle.tipo}
                </div>
                <div className="mov-modal-row">
                  <b>Descripción:</b> {movDetalle.descripcion}
                </div>
                <div className="mov-modal-row">
                  <FaNetworkWired style={{marginRight:6}} /> <b>IP:</b> {movDetalle.ip}
                </div>
                <div className="mov-modal-row">
                  <FaDesktop style={{marginRight:6}} /> <b>Dispositivo:</b> {movDetalle.dispositivo}
                </div>
                <div className="mov-modal-row">
                  <b>Cambios realizados:</b> {movDetalle.cambios}
                </div>
                <div className="mov-modal-row">
                  <b>Detalle extendido:</b> {movDetalle.detallesExtra}
                </div>
              </div>
              <div className="mov-modal-footer">
                <button className="mov-btn" onClick={handleCerrarDetalle}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
        {movimientos.length > 0 && (
          <div className="movimientos-paginacion" style={{display:'flex',alignItems:'center',gap:'0.5rem',margin:'1.2rem 0'}}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>&lt; Anterior</button>
            {Array.from({length: totalPages}, (_, i) => (
              <button
                key={i+1}
                onClick={() => setPage(i+1)}
                style={{
                  background: page === (i+1) ? '#FFD600' : '#23272b',
                  color: page === (i+1) ? '#23272b' : '#FFD600',
                  border: '1.5px solid #FFD600',
                  borderRadius: 6,
                  fontWeight: 700,
                  padding: '0.3rem 0.8rem',
                  cursor: 'pointer',
                  minWidth: 36
                }}
              >
                {i+1}
              </button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Siguiente &gt;</button>
          </div>
        )}
        {movimientos.length === 0 && (
          <div className="movimientos-vacio">No hay movimientos recientes registrados.</div>
        )}
      </div>
    </div>
  );
}

export default MovimientosRecientes;

