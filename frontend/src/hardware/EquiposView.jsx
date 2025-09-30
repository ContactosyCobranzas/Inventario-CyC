import React from "react";
import Computers from "../hardware/Computers";
import Telefonos from "../hardware/Telefonos";

const EquiposView = ({ view, onBack }) => {
  if (view === "telefonos") {
    return <Telefonos onBack={onBack} />;
  }
  return <Computers onBack={onBack} />;
};

export default EquiposView;
