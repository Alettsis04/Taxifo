import React, { useState } from "react";

const Footer = () => {
  const [viewAll, setViewAll] = useState(false);

  const changeView = () => {
    setViewAll(!viewAll);
  };

  return (
    <footer className="main-footer">
      {!viewAll && (
        <>
          <div className="float-right d-none d-sm-block">
            <b>Version</b> 1.0.0
          </div>
          <strong>
            Copyright © 2022-2024{" "}
            <a href="https://www.unl.edu.ec" target="_blank" rel="noreferrer">
              Universidad Nacional de Loja.{" "}
            </a>
          </strong>
          Todos los derechos reservados.{" "}
          <button
            type="button"
            onClick={changeView}
            className="btn btn-info btn-block btn-flat"
          >
            <i className="fa-solid fa-users"></i> Ver desarrolladores
            <i className="fa-solid fa-users"></i>
          </button>
        </>
      )}
      {viewAll && (
        <>
          <div className="row">
            <div className="col-md-3">
              {/* Widget: user widget style 2 */}
              <div className="card card-widget widget-user-2 shadow-sm">
                {/* Add the bg color to the header using any of the bg-* classes */}
                <div className="widget-user-header bg-warning">
                  <div className="widget-user-image">
                    <img
                      className="img-circle elevation-2"
                      src="https://avatars.githubusercontent.com/u/105167464?v=4"
                      alt="User Avatar Alexis"
                    />
                  </div>
                  {/* /.widget-user-image */}
                  <h3 className="widget-user-username">Alexis Armijos</h3>
                  <h5 className="widget-user-desc">Developer</h5>
                </div>
                <div className="card-footer p-0">
                  <ul className="nav flex-column">
                    <li className="nav-item">
                      <a
                        href="https://github.com/Alettsis04"
                        className="nav-link"
                        target={"_blank"}
                        rel={"noreferrer"}
                      >
                        GitHub
                        <span className="float-right badge bg-primary">
                          <i className="fa-solid fa-code-branch"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* /.widget-user */}
            </div>
          </div>

          <button
            type="button"
            onClick={changeView}
            className="btn btn-info btn-block btn-flat"
          >
            <i className="fa-solid fa-angles-right"></i> Ver menos
            <i className="fa-solid fa-angles-left"></i>
          </button>
        </>
      )}
    </footer>
  );
};

export default Footer;
