import React, { useState } from "react";
import BackButton from "../common/BackButton";
import Navbar from "../common/Navbar";
import MovimientosRecientes from "../hardware/MovimientosRecientes";  
import Sidebar from "../common/Sidebar";
import EquiposView from "../hardware/EquiposView";
import IPsView from "../hardware/IPsView";
import InventoryList from "../inventory/InventoryList";
import UserList from "../users/UserList";
import KpiGrid from "./KpiGrid";
import LicenciasOffice from "./LicenciasOffice";
import Reportes from "./Reportes";
import PCTypes from "../hardware/PCTypes";
import Telefonos from "../hardware/Telefonos";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [currentView, setCurrentView] = useState("dashboard");

  const handleNavigationClick = (selectedItem) => {
    switch (selectedItem) {
      case "Inventario":
        // Mantenemos la vista actual si es inventario
        break;
      case "EquiposAsignados":
        setCurrentView("equipos-asignados");
        break;
      case "IPs":
        setCurrentView("ips");
        break;
      default:
        setCurrentView(selectedItem.toLowerCase());
    }
  };

  const handleKpiCardClick = (cardType) => {
    const viewMap = {
      "equipos": "equipos",
      "licencias": "licencias",
      "reportes": "reportes",
      "ips": "ips",
      "movimientos": "movimientos"
    };
    
    if (viewMap[cardType]) {
      setCurrentView(viewMap[cardType]);
    }
  };

  const returnToDashboard = () => setCurrentView("dashboard");

  return (
    <div className="dashboard-root">
      <BackButton />
      <Navbar onLogout={onLogout} />
      <div className="dashboard-flex">
        <Sidebar onNavigate={handleNavigationClick} />
        <main className="dashboard-container">
          {currentView === "dashboard" && (
            <>
              <h1 className="dashboard-title">Panel de Control de Inventario</h1>
              <KpiGrid onCardClick={handleKpiCardClick} />
            </>
          )}
          
          {currentView === "licencias" && (
            <LicenciasOffice onBack={returnToDashboard} />
          )}
          
          {currentView === "reportes" && (
            <Reportes onBack={returnToDashboard} />
          )}
          
          {currentView === "usuarios" && (
            <section className="dashboard-section">
              <h2>Gestión de Usuarios</h2>
              <UserList onBack={returnToDashboard} />
            </section>
          )}
          
          {currentView === "equipos-asignados" && (
            <section className="dashboard-section">
              <h2>Equipos Asignados</h2>
              <p className="empty-message">No hay equipos registrados aún.</p>
            </section>
          )}
          
          {currentView === "equipos" && <EquiposView onBack={returnToDashboard} />}
          
          {currentView === "ips" && (
            <section className="dashboard-section">
              <IPsView onBack={returnToDashboard} />
            </section>
          )}
          
          {currentView === "movimientos" && (
            <section className="dashboard-section">
              <MovimientosRecientes onBack={returnToDashboard} />
            </section>
          )}
          
          {currentView === "movimientos_recientes" && (
            <section className="dashboard-section">
              <h2>Historial de Movimientos</h2>
              <MovimientosRecientes />
            </section>
          )}
          
          {currentView === "tipos_pc" && (
            <section className="dashboard-section">
              <h2>Tipos de Equipos</h2>
              <PCTypes onBack={returnToDashboard} />
            </section>
          )}
          
          {currentView === "telefonos" && (
            <section className="dashboard-section">
              <h2>Gestión de Teléfonos</h2>
              <Telefonos onBack={returnToDashboard} />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
