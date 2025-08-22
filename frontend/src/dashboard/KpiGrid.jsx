import React from "react";
import KpiCard from "./KpiCard";
import { FaLaptop, FaMicrochip, FaKey, FaRegNewspaper, FaUserCheck, FaExchangeAlt, FaRegCommentDots, FaNetworkWired, FaKeyboard, FaDesktop } from "react-icons/fa";

const KpiGrid = () => (
  <div className="kpi-grid">
    <KpiCard title="Equipos Registrados" value="120" subtitle="Total en sistema">
      <FaLaptop />
    </KpiCard>
    <KpiCard title="Componentes en Stock" value="350" subtitle="Disponibles">
      <FaMicrochip />
    </KpiCard>
    <KpiCard title="Licencias Activas" value="87" subtitle="Software">
      <FaKey />
    </KpiCard>
    <KpiCard title="IPs Asignadas" value="45" subtitle="IPs en uso">
      <FaNetworkWired />
    </KpiCard>
    <KpiCard title="Periféricos" value="210" subtitle="Conectados">
      <FaKeyboard />
    </KpiCard>
    <KpiCard title="Nombre de equipo" value="PC" subtitle="Equipos principales">
      <FaDesktop />
    </KpiCard>
    <KpiCard title="Novedades" value="3" subtitle="Actualizaciones">
      <FaRegNewspaper />
    </KpiCard>
    <KpiCard title="Reportes" value="2" subtitle="Problemas reportados">
      <FaRegCommentDots />
    </KpiCard>
    <KpiCard title="Equipos Asignados" value="78" subtitle="A usuarios">
      <FaUserCheck />
    </KpiCard>
    <KpiCard title="Movimientos Recientes" value="24" subtitle="Entradas/Salidas">
      <FaExchangeAlt />
    </KpiCard>
  </div>
);

export default KpiGrid;
