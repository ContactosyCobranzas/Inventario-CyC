import React from "react";
import KpiCard from "./KpiCard";
import { FaLaptop, FaUserCheck, FaNetworkWired, FaRegNewspaper, FaRegCommentDots, FaExchangeAlt } from "react-icons/fa";

const KpiGrid = ({ onCardClick }) => (
  <div className="kpi-grid">
    <KpiCard title="Equipos" value="78" subtitle="Total registrados" onClick={() => onCardClick && onCardClick("equipos")}>
      <FaUserCheck />
    </KpiCard>
    <KpiCard title="IPs" value="45" subtitle="IPs en uso" onClick={() => onCardClick && onCardClick("ips")}>
      <FaNetworkWired />
    </KpiCard>
    <KpiCard title="Licencias de Office" value="3" subtitle="Licencias activas" onClick={() => onCardClick && onCardClick("licencias") }>
      <FaRegNewspaper />
    </KpiCard>
    <KpiCard title="Reportes" value="2" subtitle="Problemas reportados" onClick={() => onCardClick && onCardClick("reportes") }>
      <FaRegCommentDots />
    </KpiCard>
      <KpiCard title="Movimientos recientes" value="24" subtitle="Entradas/Salidas" onClick={() => onCardClick && onCardClick("movimientos") }>
        <FaExchangeAlt />
      </KpiCard>
  </div>
);

export default KpiGrid;
