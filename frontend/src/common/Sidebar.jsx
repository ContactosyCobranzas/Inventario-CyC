
import React, { useState } from "react";
import { FaTachometerAlt, FaBoxes, FaUsers, FaDesktop, FaUserCheck, FaNetworkWired } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ onNavigate }) => {
  const [showInventoryMenu, setShowInventoryMenu] = useState(false);
  const [showHardwareMenu, setShowHardwareMenu] = useState(false);

  const handleInventoryClick = () => {
    setShowInventoryMenu((prev) => !prev);
    if (onNavigate) onNavigate("Inventario");
  };

  const handleHardwareClick = () => {
    setShowHardwareMenu((prev) => !prev);
    if (!showHardwareMenu && onNavigate) onNavigate("Hardware");
  };

  return (
    <aside className="sidebar">
      <ul>
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("Dashboard")}> <FaTachometerAlt /> Dashboard</li>
        <li className="sidebar-item" onClick={handleInventoryClick}> <FaBoxes /> Inventario</li>
        {showInventoryMenu && (
          <ul className="sidebar-submenu">
            <li className="sidebar-item" style={{ paddingLeft: 24 }} onClick={handleHardwareClick}> <FaDesktop /> Hardware</li>
            {showHardwareMenu && (
              <ul className="sidebar-submenu">
                <li className="sidebar-item" style={{ paddingLeft: 36 }} onClick={() => onNavigate && onNavigate("computers_items")}>Computers Items</li>
                <li className="sidebar-item" style={{ paddingLeft: 36 }} onClick={() => onNavigate && onNavigate("computertypes")}>Computer Types</li>
              </ul>
            )}
            <li className="sidebar-item" style={{ paddingLeft: 24 }} onClick={() => onNavigate && onNavigate("EquiposAsignados")}> <FaUserCheck /> Equipos asignados</li>
            <li className="sidebar-item" style={{ paddingLeft: 24 }} onClick={() => onNavigate && onNavigate("IPs")}> <FaNetworkWired /> IPs</li>
          </ul>
        )}
        <li className="sidebar-item" onClick={() => onNavigate && onNavigate("Usuarios")}> <FaUsers /> Usuarios</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
