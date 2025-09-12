import React, { useState, useMemo } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import BackButton from "../common/BackButton";
import { showToast } from "../common/toastNotify";
import "./Novedades.css";

const novedadesMock = [
  {
    id: 1,
    titulo: "Nuevo módulo de inventario",
    descripcion: "Ahora puedes gestionar inventario de hardware y usuarios desde una sola vista.",
    fecha: "2025-08-25"
  },
  {
    id: 2,
    titulo: "Mejoras en seguridad",
    descripcion: "Se implementó autenticación reforzada y notificaciones de acceso.",
    fecha: "2025-08-20"
  },
  {
    id: 3,
    titulo: "Actualización de interfaz",
    descripcion: "La interfaz del dashboard fue renovada para una mejor experiencia de usuario.",
    fecha: "2025-08-15"
  }
];

const PAGE_SIZE = 25;

function exportToCSV(data) {
  const header = ["Fecha", "Título", "Descripción"];
  const rows = data.map(r => [r.fecha, r.titulo, r.descripcion]);
  const csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n" + rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(",")).join("\n");
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.setAttribute("download", "novedades.csv");
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
  link.setAttribute("download", "novedades.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const Novedades = ({ onBack }) => {
  const [novedades, setNovedades] = useState(novedadesMock);
  const [page, setPage] = useState(1);
  const [filtro, setFiltro] = useState("");

  const filtrados = useMemo(() => {
    if (!filtro.trim()) return novedades;
    const f = filtro.toLowerCase();
    return novedades.filter(r => r.titulo.toLowerCase().includes(f) || r.descripcion.toLowerCase().includes(f));
  }, [filtro, novedades]);

  const totalPages = Math.ceil(filtrados.length / PAGE_SIZE) || 1;
  const pageSafe = Math.min(page, totalPages);
  const paginados = filtrados.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  const handleVaciar = () => {
    if (window.confirm("¿Seguro que deseas eliminar todas las novedades visibles?")) {
      setNovedades([]);
      showToast({ message: "Novedades eliminadas", type: "success", theme: "dark" });
    }
  };

  const handleEliminarUno = (id) => {
    if (window.confirm("¿Eliminar esta novedad?")) {
      setNovedades(prev => prev.filter(r => r.id !== id));
    }
  };

  const handleVerDetalle = (nov) => {
    showToast({
      message: `Título: ${nov.titulo}\nFecha: ${nov.fecha}\n${nov.descripcion}`,
      type: 'info',
      theme: 'dark',
    });
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'flex-start',minHeight:'calc(100vh - 40px)',paddingTop:'3.5rem'}}>
      <div className="novedades-wrapper" style={{maxWidth: '1100px', width: '100%', margin: '0 auto', background: 'var(--card-bg, #23272b)', borderRadius: '18px', boxShadow: '0 6px 32px rgba(0,0,0,0.18)', padding: '2.2rem 2.2rem 2.5rem 2.2rem', position: 'relative'}}>
        <div className="novedades-header-line" style={{marginBottom:'1.5rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'1.1rem'}}>
            <BackButton onBack={onBack} />
            <FaRegNewspaper className="novedades-icon-inline" style={{fontSize:'2.2rem',color:'#FFD600'}} />
            <h2 className="novedades-title-inline" style={{fontSize:'2.2rem',fontWeight:700,color:'#FFD600',margin:0}}>Novedades</h2>
          </div>
          <div className="novedades-actions" style={{display:'flex',gap:'.7rem',alignItems:'center'}}>
            <input
              className="novedades-search"
              style={{background:'#181a1b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.5rem .9rem',fontSize:'.95rem',minWidth:160}}
              placeholder="Buscar..."
              value={filtro}
              onChange={e => { setFiltro(e.target.value); setPage(1); }}
            />
            <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={() => exportToCSV(filtrados)} title="Exportar CSV">CSV</button>
            <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={() => exportToExcel(filtrados)} title="Exportar Excel">Excel</button>
            <button className="danger" style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.45rem .9rem',fontWeight:700,cursor:'pointer'}} onClick={handleVaciar} title="Vaciar todas las novedades visibles">Vaciar</button>
          </div>
        </div>
        <div className="novedades-table-wrapper" style={{width:'100%',overflow:'auto'}}>
          {paginados.length > 0 ? (
            <table className="novedades-table" style={{width:'100%',borderCollapse:'collapse',fontSize:'.98rem'}}>
              <thead>
                <tr style={{background:'#181a1b'}}>
                  <th style={{minWidth:110,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Fecha</th>
                  <th style={{minWidth:220,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Título</th>
                  <th style={{color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Descripción</th>
                  <th style={{minWidth:150,color:'#FFD600',background:'#181a1b',fontWeight:700,padding:'.8rem 1rem'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginados.map(nov => (
                  <tr key={nov.id} style={{borderBottom:'1px solid #333'}}>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{nov.fecha}</td>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{nov.titulo}</td>
                    <td style={{padding:'.7rem 1rem',color:'#fff'}}>{nov.descripcion}</td>
                    <td style={{padding:'.7rem 1rem'}}>
                      <div className="novedades-row-actions" style={{display:'flex',gap:'.5rem'}}>
                        <button style={{background:'#FFD600',color:'#23272b',border:'none',borderRadius:6,padding:'.38rem .75rem',fontWeight:700,cursor:'pointer'}} onClick={() => handleVerDetalle(nov)} className="primary-sm" title="Ver detalle">Ver</button>
                        <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.38rem .75rem',fontWeight:700,cursor:'pointer'}} onClick={() => handleEliminarUno(nov.id)} className="danger-sm" title="Eliminar">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="novedades-empty" style={{padding:'1rem',textAlign:'center',fontWeight:500,color:'#FFD600'}}>No hay novedades registradas.</div>
          )}
        </div>
        {paginados.length > 0 && (
          <div className="novedades-pagination" style={{display:'flex',gap:'.5rem',marginTop:'1.5rem',flexWrap:'wrap'}}>
            <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.35rem .75rem',fontWeight:700,cursor:'pointer',minWidth:36}} disabled={pageSafe === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>{'<'} Anterior</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                style={{background:p===pageSafe?'#FFD600':'#23272b',color:p===pageSafe?'#23272b':'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,fontWeight:700,padding:'.35rem .75rem',cursor:'pointer',minWidth:36}}
                className={p === pageSafe ? 'active' : ''}
                onClick={() => setPage(p)}
              >{p}</button>
            ))}
            <button style={{background:'#23272b',color:'#FFD600',border:'1.5px solid #FFD600',borderRadius:6,padding:'.35rem .75rem',fontWeight:700,cursor:'pointer',minWidth:36}} disabled={pageSafe === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Siguiente {'>'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Novedades;
