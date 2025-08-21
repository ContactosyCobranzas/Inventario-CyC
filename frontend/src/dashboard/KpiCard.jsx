import React from "react";
import "./KpiCard.css";

const KpiCard = ({ title, value, subtitle, children }) => (
  <div className="kpi-card">
    <div className="kpi-card-header">
      <span className="kpi-title">{title}</span>
      {children && <span className="kpi-icon">{children}</span>}
    </div>
    <div className="kpi-value">{value}</div>
    {subtitle && <div className="kpi-subtitle">{subtitle}</div>}
  </div>
);

export default KpiCard;
