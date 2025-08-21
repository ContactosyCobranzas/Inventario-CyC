
import { useState } from 'react';
import './App.css';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <>
      {isLogged ? (
        <Dashboard />
      ) : (
        <Login onLogin={() => setIsLogged(true)} />
      )}
    </>
  );
}

export default App;
