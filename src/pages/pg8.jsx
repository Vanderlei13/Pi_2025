import React from "react";
import "../style/pg8.css";
import { FaSyncAlt, FaCheck, FaPlus } from "react-icons/fa"; //Importa icones do pacote react-icons, qualquer coisa instalar com npm install react-icons

function Pg8() {
  return (
    <div className="anuncios-container">
      <h1>Seus Anúncios</h1>
      <div className="card-grid">
        <div className="card">
          <p>Renovar anúncio</p>
          <FaSyncAlt className="icon" />
        </div>
        <div className="card">
          <p>Anúncios Ativos</p>
          <FaCheck className="icon" />
        </div>
        <div className="card">
          <p>Novo Anúncio</p>
          <FaPlus className="icon" />
        </div>
      </div>
    </div>
  );
}

export default Pg8;