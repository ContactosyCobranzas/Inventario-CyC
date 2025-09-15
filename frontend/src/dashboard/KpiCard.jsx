import React from "react";
import "./KpiCard.css";

const KpiCard = ({ title, value, subtitle, children, onClick }) => (
  <div className="kpi-card" onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
    <div className="kpi-card-header">
      <span className="kpi-title">{title}</span>
      {children && <span className="kpi-icon">{children}</span>}
    </div>
    <div className="kpi-value">{value}</div>
    {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
  </div>
);

export default KpiCard;
