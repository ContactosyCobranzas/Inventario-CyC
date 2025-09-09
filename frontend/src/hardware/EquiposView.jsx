import React from "react";
import Computers from "../hardware/Computers";
import Telefonos from "../hardware/Telefonos";

const EquiposView = ({ view }) => {
  if (view === "telefonos") {
    return <Telefonos />;
  }
  return <Computers />;
};

export default EquiposView;
