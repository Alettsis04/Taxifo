import { createContext, useState } from "react";

const AuthContext = createContext();
const initialAuth = null;
const initialUserData = {
  nombre: "",
  correo: "",
  rol: "",
};

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);
  const [userData, setUserData] = useState(initialUserData);

  const logout = () => {
    setAuth(null);
    setUserData(initialUserData);
  };

  const data = { auth, logout, userData, setUserData };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthProvider };

export default AuthContext;
