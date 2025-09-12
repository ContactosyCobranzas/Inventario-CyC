import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { getMovimientosGlobal, setMovimientosGlobal, getMovimientosCount } from './common/MovimientosGlobal';
import { showToast } from './common/toastNotify';
import './App.css';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import GlobalToastContainer from './common/GlobalToastContainer';

function App() {
  const toastShownRef = React.useRef({ warning: false, error: false });
  useEffect(() => {
    const count = getMovimientosCount();
    if (count >= 400 && !toastShownRef.current.error) {
      showToast({
        message: `¡Has superado el límite de 400 movimientos! Debes vaciar la lista para evitar problemas.`,
        type: 'error',
        theme: 'dark',
      });
      toastShownRef.current.error = true;
    } else if (count >= 300 && !toastShownRef.current.warning) {
      showToast({
        message: `¡Advertencia! Estás cerca del límite (400) de movimientos. Considera vaciar la lista pronto.`,
        type: 'warning',
        theme: 'dark',
      });
      toastShownRef.current.warning = true;
    }
    if (count < 300) {
      toastShownRef.current.warning = false;
      toastShownRef.current.error = false;
    }
  }, [getMovimientosCount()]);
  const [isLogged, setIsLogged] = useState(() => {
    return localStorage.getItem('isLogged') === 'true';
  });
  const handleLogout = () => {
    setIsLogged(false);
    localStorage.setItem('isLogged', 'false');
  };
  useEffect(() => {
    localStorage.setItem('isLogged', isLogged ? 'true' : 'false');
  }, [isLogged]);

  return (
    <>
      <GlobalToastContainer />
      {isLogged ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={() => {
          setIsLogged(true);
          localStorage.setItem('isLogged', 'true');
        }} />
      )}
    </>
  );
}

export default App;
