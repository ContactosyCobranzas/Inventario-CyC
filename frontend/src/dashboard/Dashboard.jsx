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
// los datos de las kips  
const Dashboard = ({ onLogout }) => {
  const [view, setView] = useState("dashboard");

  const handleSidebarClick = (item) => {
    if (item === "Inventario") {
      return;
    }
    if (item === "EquiposAsignados") {
      setView("equipos-asignados");
    } else if (item === "IPs") {
      setView("ips");
    } else {
      setView(item.toLowerCase());
    }
  };

  return (
    <div className="dashboard-root">
    <BackButton />
      <Navbar onLogout={onLogout} />
      <div className="dashboard-flex">
        <Sidebar onNavigate={handleSidebarClick} />
        <main className="dashboard-container">
          {view === "dashboard" && (
            <>
              <h1 style={{ marginBottom: "2rem" }}>Dashboard de Inventario</h1>
              <KpiGrid onCardClick={(card) => {
                if(card === "equipos") setView("equipos");
                if(card === "licencias") setView("licencias");
                if(card === "reportes") setView("reportes");
                if(card === "ips") setView("ips");
                if(card === "movimientos") setView("movimientos");
              }} />
            </>
          )}
          {view === "licencias" && <LicenciasOffice onBack={() => setView("dashboard")} />}
          {view === "reportes" && <Reportes onBack={() => setView("dashboard")} />}
          {view === "usuarios" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Usuarios</h2>
              <UserList />
            </section>
          )}
          {view === "equipos-asignados" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Equipos</h2>
              <p>No hay equipos registrados aún.</p>
            </section>
          )}
          {view === "equipos" && <EquiposView />}
          {view === "ips" && (
            <section style={{ margin: "2rem 0" }}>
              <IPsView />
            </section>
          )}
          {view === "movimientos" && (
            <section style={{ margin: "2rem 0" }}>
              <MovimientosRecientes />
            </section>
          )}
          {view === "movimientos_recientes" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Movimientos Recientes</h2>
              <MovimientosRecientes />
            </section>
          )}
          {view === "tipos_pc" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Tipos de PC</h2>
              <PCTypes onBack={() => setView("dashboard")} />
            </section>
          )}
          {view === "telefonos" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Teléfonos</h2>
              <Telefonos />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
