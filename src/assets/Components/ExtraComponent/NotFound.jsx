import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <h1 className="display-1">Errore 404</h1>
      <p className="fs-4">Oops! La Pagina non è stata trovata</p>

      <span className="cstmBtn" onClick={handleGoHome}>
        {" "}
        Torna indietro
      </span>
    </div>
  );
};

export default NotFound;
