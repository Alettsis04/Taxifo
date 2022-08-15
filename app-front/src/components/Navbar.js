import React from "react";
import Autenticacion from "./Autenticacion";

const Navbar = () => {
  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Rigth navbar  */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="."
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        {/* Left navbar links */}

        <ul className="navbar-nav ml-auto">
          <Autenticacion />
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
