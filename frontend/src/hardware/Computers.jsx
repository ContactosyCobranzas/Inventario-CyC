import React, { useState } from "react";
import { FaDesktop, FaLaptop, FaKey, FaCodeBranch } from "react-icons/fa";
import PCItems from "./PCItems";
import Equipos from "./Equipos";
import LicenciasView from "./LicenciasView";
import VersionesModal from "./VersionesModal";
import PCTypes from "./PCTypes";
import "./Hardware.css";

const summaryData = [
  {
    icon: <FaDesktop className="hardware-icon hardware-icon-unified" />,
    title: "PC Items",
    value: 12,
    desc: "Total de ítems de PC registrados.",
    link: "Ver PC Items"
  },
  {
    icon: <FaLaptop className="hardware-icon hardware-icon-unified" />,
    title: "Equipos",
    value: 20,
    desc: "Total de equipos registrados.",
    link: "Ver Equipos"
  },
  {
    icon: <FaLaptop className="hardware-icon hardware-icon-unified" />,
    title: "PC Tipos",
    value: 8,
    desc: "Tipos de PC configurados en el sistema.",
    link: "Ver PC Tipos"
  },
  {
    icon: <FaKey className="hardware-icon hardware-icon-unified" />,
    title: "Software Licencias",
    value: 15,
    desc: "Total de licencias de software registradas.",
    link: "Ver Licencias"
  },
  {
    icon: <FaCodeBranch className="hardware-icon hardware-icon-unified" />,
    title: "Versión de Software",
    value: 7,
    desc: "Versiones de software instaladas en equipos.",
    link: "Ver Versiones"
  }
];

const Computers = () => {
  const [view, setView] = useState("summary");
  // const [openLicencias, setOpenLicencias] = useState(false);
  const [openVersiones, setOpenVersiones] = useState(false);

  // Índices de las cards
  const idxPCItems = summaryData.findIndex(item => item.title === "PC Items");
  const idxLicencias = summaryData.findIndex(item => item.title === "Software Licencias");
  const idxVersiones = summaryData.findIndex(item => item.title === "Versión de Software");

  if (view === "pcitems") {
    return <PCItems onBack={() => setView("summary")} />;
  }
  if (view === "pctypes") {
    return <PCTypes onBack={() => setView("summary")} />;
  }
  if (view === "equipos") {
    return <Equipos onBack={() => setView("summary")} />;
  }
  if (view === "licencias") {
    return <LicenciasView onBack={() => setView("summary")} />;
  }

  return (
    <div>
      <h2 style={{marginBottom: '2rem'}}>Computers</h2>
      <div className="hardware-summary-grid">
        {summaryData.map((item, idx) => {
          // Card de PC Items
          if (idx === idxPCItems) {
            return (
              <div className="hardware-summary-card" key={idx} style={{cursor:'pointer'}} onClick={() => setView("pcitems") }>
                {item.icon}
                <div className="hardware-summary-title">{item.title}</div>
                <div className="hardware-summary-value">{item.value}</div>
                <div className="hardware-summary-desc">{item.desc}</div>
                <div className="hardware-summary-link" style={{color:'#1976d2',textDecoration:'underline'}}>Entrar</div>
              </div>
            );
          }
          // Card de PC Tipos
          if (item.title === "PC Tipos") {
            return (
              <div className="hardware-summary-card" key={idx} style={{cursor:'pointer'}} onClick={() => setView("pctypes") }>
                {item.icon}
                <div className="hardware-summary-title">{item.title}</div>
                <div className="hardware-summary-value">{item.value}</div>
                <div className="hardware-summary-desc">{item.desc}</div>
                <div className="hardware-summary-link" style={{color:'#1976d2',textDecoration:'underline'}}>Entrar</div>
              </div>
            );
          }
          // Card de Equipos
          if (item.title === "Equipos") {
            return (
              <div className="hardware-summary-card" key={idx} style={{cursor:'pointer'}} onClick={() => setView("equipos") }>
                {item.icon}
                <div className="hardware-summary-title">{item.title}</div>
                <div className="hardware-summary-value">{item.value}</div>
                <div className="hardware-summary-desc">{item.desc}</div>
                <div className="hardware-summary-link" style={{color:'#1976d2',textDecoration:'underline'}}>Entrar</div>
              </div>
            );
          }
          // Card de Licencias
          if (idx === idxLicencias) {
            return (
              <div className="hardware-summary-card" key={idx} style={{cursor:'pointer'}} onClick={() => setView("licencias") }>
                {item.icon}
                <div className="hardware-summary-title">{item.title}</div>
                <div className="hardware-summary-value">{item.value}</div>
                <div className="hardware-summary-desc">{item.desc}</div>
                <div className="hardware-summary-link" style={{color:'#1976d2',textDecoration:'underline'}}>Entrar</div>
              </div>
            );
          }
          // Card de Versiones
          if (idx === idxVersiones) {
            return (
              <div className="hardware-summary-card" key={idx} style={{cursor:'pointer'}} onClick={() => setOpenVersiones(true)}>
                {item.icon}
                <div className="hardware-summary-title">{item.title}</div>
                <div className="hardware-summary-value">{item.value}</div>
                <div className="hardware-summary-desc">{item.desc}</div>
                <div className="hardware-summary-link" style={{color:'#1976d2',textDecoration:'underline'}}>Entrar</div>
              </div>
            );
          }
          // Otras cards
          return (
            <div className="hardware-summary-card" key={idx}>
              {item.icon}
              <div className="hardware-summary-title">{item.title}</div>
              <div className="hardware-summary-value">{item.value}</div>
              <div className="hardware-summary-desc">{item.desc}</div>
              <div className="hardware-summary-link">{item.link}</div>
            </div>
          );
        })}
      </div>
  {/* <LicenciasModal open={openLicencias} onClose={() => setOpenLicencias(false)} /> */}
      <VersionesModal open={openVersiones} onClose={() => setOpenVersiones(false)} />
    </div>
  );
};

export default Computers;
