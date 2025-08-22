import React from "react";
import "./Censura.css";

const Censura = ({ onUncensor }) => (
  <div className="censura-app">
    <button className="censura-btn" onClick={onUncensor}>Volver</button>
  </div>
);

export default Censura;
