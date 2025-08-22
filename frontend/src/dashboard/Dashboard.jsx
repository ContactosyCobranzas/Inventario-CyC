import React from "react";
import "./Dashboard.css";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import KpiGrid from "./KpiGrid";
import InventoryList from "../inventory/InventoryList";
import UserList from "../users/UserList";

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-root">
  <Navbar onLogout={onLogout} />
      <div className="dashboard-flex">
        <Sidebar />
        <main className="dashboard-container">
          <h1 style={{ marginBottom: "2rem" }}>Dashboard de Inventario</h1>
          <KpiGrid />
          <section style={{ margin: "2rem 0" }}>
            <h2>Inventario</h2>
            <InventoryList />
          </section>
          <section style={{ margin: "2rem 0" }}>
            <h2>Usuarios</h2>
            <UserList />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
