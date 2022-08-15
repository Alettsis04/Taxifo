import { createContext, useState } from "react";

const RutasContext = createContext();

const initialRutas = {
  info: false,
  cDireccion: false,
  gClientes: false,
  gBarrios: false,
};

const RutasProvider = ({ children }) => {
  const [rutas, setRutas] = useState(initialRutas);

  const data = { rutas, setRutas };

  return <RutasContext.Provider value={data}>{children}</RutasContext.Provider>;
};

export { RutasProvider };

export default RutasContext;
