import React, { useState } from "react";
import { showToast } from "../common/toastNotify";
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

const PAGE_SIZE = 50;

const MovimientosRecientes = () => {
  const [movimientos, setMovimientos] = useState(movimientosMock);
  const [page, setPage] = useState(1);

  // Alerta si hay más de 400 movimientos
  React.useEffect(() => {
    if (movimientos.length > 400) {
      showToast({
        message: `¡Demasiados movimientos recientes! Considera exportar o vaciar la lista.`,
        type: 'error',
        theme: 'dark',
      });
    }
  }, [movimientos]);
function exportToExcel(data) {
  // Exportación simple a Excel usando formato xlsx
  // Solo crea un archivo CSV con extensión xlsx para compatibilidad básica
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
  // Solo alerta si hay más de 400 movimientos
  }, [movimientos]);

  // Paginación
  const totalPages = Math.ceil(movimientos.length / PAGE_SIZE);
  const paginated = movimientos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Handlers para historial
  // ...eliminar lógica de historial...

  // Acción para ver detalle
  const handleVerDetalle = (mov) => {
    alert(`Detalle del movimiento:\n${mov.descripcion}`);
  };

   // Vaciar solo la página actual
   const handleVaciarPagina = () => {
     if (window.confirm('¿Seguro que deseas eliminar los movimientos de esta página?')) {
       const start = (page - 1) * PAGE_SIZE;
       const end = start + PAGE_SIZE;
       const nuevos = [...movimientos.slice(0, start), ...movimientos.slice(end)];
       setMovimientos(nuevos);
       showToast({
         message: 'Movimientos de la página actual eliminados.',
         type: 'success',
         theme: 'dark',
       });
       // Si la página actual queda vacía, retroceder a la anterior si existe
       if (nuevos.length > 0 && start >= nuevos.length) {
         setPage(Math.max(1, Math.ceil(nuevos.length / PAGE_SIZE)));
       }
     }
   };

  // Vaciar todos los movimientos
  const handleVaciarTodo = () => {
    if (window.confirm('¿Seguro que deseas eliminar todos los movimientos recientes? Esta acción no se puede deshacer.')) {
      setMovimientos([]);
      showToast({
        message: 'Todos los movimientos recientes han sido eliminados.',
        type: 'success',
        theme: 'dark',
      });
    }
  };

  return (
    <div>
      <h2 style={{marginBottom: '1.5rem', color: '#FFD600', fontWeight: 700}}>Movimientos Recientes</h2>
      <div style={{display:'flex',gap:'1rem',marginBottom:'1.2rem'}}>
        <button onClick={() => exportToCSV(movimientos)} style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'0.5rem 1.2rem',fontWeight:700,cursor:'pointer'}}>
          Exportar CSV
        </button>
        <button onClick={() => exportToExcel(movimientos)} style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'0.5rem 1.2rem',fontWeight:700,cursor:'pointer'}}>
          Exportar Excel
        </button>
        <button onClick={handleVaciarTodo} style={{background:'#FFD600',color:'#fff',border:'none',borderRadius:6,padding:'0.5rem 1.2rem',fontWeight:700,cursor:'pointer'}}>
          Vaciar todo
        </button>
        <button onClick={handleVaciarPagina} style={{background:'#FFD600',color:'#fff',border:'none',borderRadius:6,padding:'0.5rem 1.2rem',fontWeight:700,cursor:'pointer'}}>
          Vaciar página
        </button>
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
                  <button onClick={() => handleVerDetalle(mov)} style={{background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.8rem', cursor: 'pointer'}}>Ver detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

  {/* ...eliminado historial y modal... */}
    </div>
  );
}

export default MovimientosRecientes;

