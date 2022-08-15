import React, { useState } from "react";

const initialFormP = {
  nombre: "",
  apellido: "",
  cedula: "",
  telefono: "",
};

const GClientes = () => {

const [formPersona, setFormPersona] = useState(initialFormP);

  const handleChangeP = (e) => {
    setFormPersona({
      ...formPersona,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="content-wrapper" style={{ minHeight: "1345.31px" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Gestión Cliente</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Persona</h3>
                  </div>
                  <div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputNombre">Nombre</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputNombre"
                              placeholder="Ingrese el nombre"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputApellido">
                              Apellido
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputApellido"
                              placeholder="Ingrese el apellido"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputCédula">Cédula</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputCédula"
                              placeholder="Ingrese el cédula"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputTeléfono">
                              Teléfono
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputTeléfono"
                              placeholder="Ingrese el teléfono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-success">
                        Registrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Agregar Nueva Dirección</h3>
                  </div>
                  <div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputPersona">Persona</label>
                            <select
                              className="form-control"
                              id="exampleInputPersona"
                            >
                              <option>Alexis Armijos</option>
                              <option>Miguel Torres</option>
                              <option>Allison Rojas</option>
                              <option>Ariana Gomez</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputBarrio">Barrio</label>
                            <select
                              className="form-control"
                              id="exampleInputBarrio"
                            >
                              <option>Reina del Cisne</option>
                              <option>18 de Noviembre</option>
                              <option>Sur</option>
                              <option>Norte</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputCalle1">Calle 1</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputCalle1"
                              placeholder="Ingrese la calle 1"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="exampleInputCalle2">Calle 2</label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputCalle2"
                              placeholder="Ingrese la calle 2"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputReferencia<">
                            Referencia
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputReferencia"
                            placeholder="Ingrese el teléfono"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-success">
                        Registrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default GClientes;
