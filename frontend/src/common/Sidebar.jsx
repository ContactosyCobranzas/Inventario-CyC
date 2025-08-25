import React, { useState } from "react";
import { FaTachometerAlt, FaBoxes, FaUsers, FaUserCheck, FaNetworkWired, FaLaptop } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ onNavigate }) => {
  const [showInventoryMenu, setShowInventoryMenu] = useState(false);

  const handleInventoryClick = () => {
    setShowInventoryMenu((prev) => !prev);
    if (onNavigate) onNavigate("Inventario");
  };

  return (
    <aside className="sidebar">
      <ul>
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("Dashboard")}> <FaTachometerAlt /> Dashboard</li>
        <li className="sidebar-item" onClick={handleInventoryClick}> <FaBoxes /> Inventario</li>
        {showInventoryMenu && (
          <ul className="sidebar-submenu">
            <li className="sidebar-item" style={{ paddingLeft: 24 }} onClick={() => onNavigate && onNavigate("equipos")}> <FaUserCheck /> Equipos</li>
            <li className="sidebar-item" style={{ paddingLeft: 24 }} onClick={() => onNavigate && onNavigate("tipos_pc")}> <FaLaptop /> Tipos de PC</li>
            <li className="sidebar-item" style={{ paddingLeft: 24 }} onClick={() => onNavigate && onNavigate("IPs")}> <FaNetworkWired /> IPs</li>
          </ul>
        )}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("Usuarios")}> <FaUsers /> Usuarios</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
