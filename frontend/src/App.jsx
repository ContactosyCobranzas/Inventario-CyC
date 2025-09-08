import { useState, useEffect } from 'react';
import './App.css';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';

function App() {
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
