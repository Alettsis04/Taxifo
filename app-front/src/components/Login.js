import React, { useState } from "react";
import validator from "validator";

import Swal from "sweetalert2";

const initialForm = {
  correo: "",
  clave: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const reportarIncidente = () => {
    fetch("http://127.0.0.1:8000/api/auditoria/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "no-cors",
      body: {
        accion: "",
        usuario: "",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log("Algo pasó: " + error));
  };

  const iniciarSesion = () => {
    if (form.correo !== "" && form.clave !== "") {
      if (validator.isEmail(form.correo)) {
        alerta("Iniciar", "success");
        fetch("http://127.0.0.1:8000/api/login/", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          mode: "no-cors",
          body: form,
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log("Algo pasó: " + error));
      } else {
        alerta("Correo inválido", "error");
      }
    } else {
      alerta("Campos vacíos", "error");
    }
  };

  const alerta = (msg, type) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: type,
      title: msg,
    });
  };

  return (
    <>
      <div
        className="modal fade"
        id="modal-default"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Iniciar Sesión</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.correo}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="clave"
                    className="form-control"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    value={form.clave}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer justify-content-between">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={iniciarSesion}
              >
                Inicar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
