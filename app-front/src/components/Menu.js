import React, { useContext } from "react";
import logo from "../assets/img/logo.png";
import user from "../assets/img/user.png";
import AuthContext from "../context/AuthContext";
import RutasContext from "../context/RutasContext";

const Menu = () => {
  const { userData } = useContext(AuthContext);
  const { rutas, setRutas } = useContext(RutasContext);

  const handleRutas = (e) => {
    let newRutas = {
      info: false,
      cDireccion: false,
      gClientes: false,
      gBarrios: false,
    };

    switch (e.target.id) {
      case "info":
        newRutas = {
          ...newRutas,
          info: true,
        };
        break;
      case "cDireccion":
        newRutas = {
          ...newRutas,
          cDireccion: true,
        };
        break;
      case "gClientes":
        newRutas = {
          ...newRutas,
          gClientes: true,
        };
        break;
      case "gBarrios":
        newRutas = {
          ...newRutas,
          gBarrios: true,
        };
        break;
      default:
        break;
    }

    setRutas(newRutas);
  };

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="." className="brand-link">
          <img
            src={logo}
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8", backgroundColor: "white" }}
          />
          <span className="brand-text font-weight-light">Taxifo</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={user}
                alt={"User Imagen"}
                className="img-circle elevation-2"
                style={{ backgroundColor: "white" }}
              />
            </div>
            <div className="info">
              <a href="." className="d-block">
                {userData.nombre}
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-header">Servicios Generales</li>
              <li className="nav-item">
                <button
                  onClick={handleRutas}
                  id="info"
                  className="nav-link text-left"
                >
                  <i id="info" className="fa-solid fa-circle-info"></i>
                  <p id="info"> Información</p>
                </button>
              </li>
              <li className="nav-header">Servicios Agente</li>
              <li className="nav-item">
                <button
                  id="cDireccion"
                  onClick={handleRutas}
                  className="nav-link text-left"
                >
                  <i
                    id="cDireccion"
                    className="fa-solid fa-magnifying-glass"
                  ></i>
                  <p id="cDireccion"> Consultar Dirección</p>
                </button>
              </li>
              <li className="nav-header">Servicios Secretaria</li>
              <li className="nav-item">
                <button
                  onClick={handleRutas}
                  id="gClientes"
                  className="nav-link text-left"
                >
                  <i id="gClientes" className="fa-solid fa-people-roof"></i>
                  <p id="gClientes"> Gestionar Cliente</p>
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="gBarrios"
                  onClick={handleRutas}
                  className="nav-link text-left"
                >
                  <i id="gBarrios" className="fa-solid fa-people-roof"></i>
                  <p id="gBarrios"> Gestionar Barrios</p>
                </button>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Menu;
