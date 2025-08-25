import React, { useState } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import EquiposView from "../hardware/EquiposView";
import InventoryList from "../inventory/InventoryList";
import UserList from "../users/UserList";
import KpiGrid from "./KpiGrid";
import "./Dashboard.css";

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
      <Navbar onLogout={onLogout} />
      <div className="dashboard-flex">
        <Sidebar onNavigate={handleSidebarClick} />
        <main className="dashboard-container">
          {view === "dashboard" && (
            <>
              <h1 style={{ marginBottom: "2rem" }}>Dashboard de Inventario</h1>
              <KpiGrid onCardClick={(card) => {
                if(card === "equipos") setView("equipos");
              }} />
            </>
          )}
          {view === "usuarios" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Usuarios</h2>
              <UserList />
            </section>
          )}
          {/* {view === "hardware" && <Computers />} */}
          {view === "equipos-asignados" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Equipos</h2>
              <p>No hay equipos registrados aún.</p>
            </section>
          )}
          {view === "equipos" && <EquiposView />}
          {view === "ips" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>IPs</h2>
              <p>No hay IPs registradas aún.</p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
