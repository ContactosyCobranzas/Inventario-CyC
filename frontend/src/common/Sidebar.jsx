import React, { useState } from "react";
import { FaTachometerAlt, FaBoxes, FaUsers, FaUserCheck, FaNetworkWired, FaLaptop, FaCog, FaBell } from "react-icons/fa";
import { FaMobileAlt, FaHistory } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ onNavigate }) => {

  return (
    <aside className="sidebar">
      <ul>
        {/* Dashboard */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("Dashboard")}> <FaTachometerAlt /> Dashboard</li>
        {/* Equipos */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("equipos")}> <FaUserCheck /> Equipos</li>
        {/* Tipos de PC */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("tipos_pc")}> <FaLaptop /> Tipos de PC</li>
        {/* Teléfonos */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("telefonos")}> <FaMobileAlt /> Teléfonos</li>
        {/* IPs */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("IPs")}> <FaNetworkWired /> IPs</li>
        {/* Movimientos Recientes */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("movimientos_recientes")}> <FaHistory /> Movimientos Recientes</li>
        {/* Usuarios */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("Usuarios")}> <FaUsers /> Usuarios</li>
        {/* Reportes */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("Reportes")}> <FaHistory /> Reportes</li>
        {/* Novedades */}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("Novedades")}> <FaBell /> Novedades</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
