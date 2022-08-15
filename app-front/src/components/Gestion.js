import React, { useContext } from "react";
import RutasContext from "../context/RutasContext";
import CDireccion from "./CDireccion";
import GBarrios from "./GBarrios";
import GClientes from "./GClientes";
import Info from "./Info";

const Gestion = () => {
  const { rutas } = useContext(RutasContext);
  return (
    <>
      {rutas.info && <Info />}
      {rutas.cDireccion && <CDireccion />}
      {rutas.gClientes && <GClientes />}
      {rutas.gBarrios && <GBarrios />}
    </>
  );
};

export default Gestion;
