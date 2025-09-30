import React, { useState, useEffect, useRef } from 'react';
import { getMovimientosGlobal, setMovimientosGlobal, getMovimientosCount } from './common/MovimientosGlobal';
import { showToast } from './common/toastNotify';
import './App.css';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import GlobalToastContainer from './common/GlobalToastContainer';

function App() {
  const toastAlertShown = useRef({ warning: false, error: false });

  useEffect(() => {
    const movementCount = getMovimientosCount();
    
    // Alerta crítica si se superan 400 movimientos
    if (movementCount >= 400 && !toastAlertShown.current.error) {
      showToast({
        message: 'Se ha alcanzado el límite máximo de 400 movimientos. Es necesario vaciar la lista.',
        type: 'error',
        theme: 'dark',
      });
      toastAlertShown.current.error = true;
    } 
    // Advertencia si se acerca al límite
    else if (movementCount >= 300 && !toastAlertShown.current.warning) {
      showToast({
        message: 'Advertencia: Se está acercando al límite de movimientos (400). Considere limpiar la lista.',
        type: 'warning',
        theme: 'dark',
      });
      toastAlertShown.current.warning = true;
    }
    
    // Reset de alertas si el número baja
    if (movementCount < 300) {
      toastAlertShown.current.warning = false;
      toastAlertShown.current.error = false;
    }
  }, []);

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(() => {
    return localStorage.getItem('isLogged') === 'true';
  });

  const handleUserLogout = () => {
    setIsUserAuthenticated(false);
    localStorage.setItem('isLogged', 'false');
  };

  useEffect(() => {
    localStorage.setItem('isLogged', isUserAuthenticated ? 'true' : 'false');
  }, [isUserAuthenticated]);

  return (
    <>
      <GlobalToastContainer />
      {isUserAuthenticated ? (
        <Dashboard onLogout={handleUserLogout} />
      ) : (
        <Login onLogin={() => setIsUserAuthenticated(true)} />
      )}
    </>
  );
}

export default App;
