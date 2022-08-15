import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Autenticacion = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <li className="nav-item d-none d-sm-inline-block">
          <button
            className="nav-link btn btn-default"
            title="Cerrar Sesión"
          >
            <i className="fa-solid fa-user-minus"></i>
          </button>
        </li>
      ) : (
        <li className="nav-item d-none d-sm-inline-block">
          <button
            className="nav-link btn btn-default"
            title="Iniciar Sesión"
            data-toggle="modal"
            data-target="#modal-default"
            onClick={logout}
          >
            <i className="fa-solid fa-user-check"></i>
          </button>
        </li>
      )}
    </>
  );
};

export default Autenticacion;
