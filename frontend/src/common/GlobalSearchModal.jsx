import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GlobalSearchModal.css';

const GlobalSearchModal = ({ isOpen, onClose, dataSources }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  React.useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const allResults = [];
    Object.entries(dataSources).forEach(([key, items]) => {
      if (Array.isArray(items)) {
        items.forEach(item => {
          let ipMatch = null;
          Object.entries(item).forEach(([field, value]) => {
            if (typeof value === 'string' && value.toLowerCase().includes(query.toLowerCase())) {
              if (/^(\d{1,3}\.){3}\d{1,3}$/.test(value)) {
                ipMatch = value;
              }
            }
          });
          const match = Object.values(item).some(
            v => typeof v === 'string' && v.toLowerCase().includes(query.toLowerCase())
          );
          if (match) {
            allResults.push({ ...item, type: key, ipMatch });
          }
        });
      }
    });
    const directRoutes = [
      { type: 'dashboard', name: 'Dashboard', route: '/dashboard' },
      { type: 'hardware', name: 'Hardware', route: '/hardware' },
      { type: 'reportes', name: 'Reportes', route: '/reportes' },
    ];
    directRoutes.forEach(opt => {
      if (opt.name.toLowerCase().includes(query.toLowerCase()) || opt.type.toLowerCase().includes(query.toLowerCase())) {
        allResults.push(opt);
      }
    });
    setResults(allResults);
  }, [query, dataSources]);

  if (!isOpen) return null;

  const isDark = !!dataSources.dark;
  return (
    <div className="global-search-modal-overlay">
      <div className={`global-search-modal${isDark ? ' dark' : ''}`}>
        <button className="close-btn" onClick={onClose}>×</button>
        <input
          autoFocus
          type="text"
          className="search-input"
          placeholder="Buscar en todo el sistema..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="results-list">
          {results.length === 0 && query && <div className="no-results">Sin resultados</div>}
          {results.map((result, idx) => {
            let route = null;
            if (result.route) {
              route = result.route;
            } else if (result.type === 'equipos' && result.id) {
              route = `/hardware/equipos/${result.id}`;
            } else if (result.type === 'usuarios' && result.nombre) {
              route = `/users/${result.nombre}`;
            } else if (result.type === 'licencias' && result.producto) {
              route = `/hardware/licencias/${result.producto}`;
            } else if (result.type === 'ips' && result.id) {
              route = `/hardware/ips/${result.id}`;
            }
            return (
              <div
                key={idx}
                className="result-item"
                style={{ cursor: route ? 'pointer' : 'default', color: route ? '#1976d2' : undefined }}
                onClick={() => {
                  if (route) {
                    onClose();
                    navigate(route);
                  }
                }}
              >
                <strong>{result.type}</strong>
                {result.ipMatch ? (
                  <> — <span style={{color:'#388e3c', fontWeight:'bold'}}>IP: {result.ipMatch}</span></>
                ) : null}
                : {JSON.stringify(result)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;