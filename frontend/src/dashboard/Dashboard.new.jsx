import React, { useState } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import Hardware from "../hardware/Hardware";
import InventoryList from "../inventory/InventoryList";
import UserList from "../users/UserList";
import KpiGrid from "./KpiGrid";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const [view, setView] = useState("dashboard");

  const handleSidebarClick = (item) => {
    setView(item.toLowerCase());
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
              <KpiGrid />
            </>
          )}
          {view === "inventario" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Inventario</h2>
              <InventoryList />
            </section>
          )}
          {view === "usuarios" && (
            <section style={{ margin: "2rem 0" }}>
              <h2>Usuarios</h2>
              <UserList />
            </section>
          )}
          {view === "hardware" && <Hardware />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
