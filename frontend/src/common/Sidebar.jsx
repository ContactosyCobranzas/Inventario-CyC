import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li className="sidebar-item">Dashboard</li>
        <li className="sidebar-item">Inventario</li>
        <li className="sidebar-item">Usuarios</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
