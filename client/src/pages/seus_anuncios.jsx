import React from "react";
import { Link } from "react-router-dom"; 
import "../style/seus_anuncios.css";
import { FaSyncAlt, FaCheck, FaPlus } from "react-icons/fa"; //Importa icones do pacote react-icons, qualquer coisa instalar com npm install react-icons

function Seus_anuncios() {
  return (
    <div className="anuncios-container">
      <h1>Seus Anúncios</h1>
      <div className="card-grid">
        <Link to="/anuncios_inativos">
          <div className="card">
            <p>Renovar anúncio</p>
            <FaSyncAlt className="icon" />
          </div>
        </Link>
        
        <Link to="/anuncios_ativos">
          <div className="card">
            <p>Anúncios Ativos</p>
            <FaCheck className="icon" />
          </div>
        </Link>
        
        <Link to="/descrever_produto">
          <div className="card">
            <p>Novo Anúncio</p>
            <FaPlus className="icon" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Seus_anuncios;