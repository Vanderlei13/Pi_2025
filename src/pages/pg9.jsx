import React from "react";
import "../style/pg9.css";

export default function Pg9() {
  const anuncios = [
    { nome: "Cinto", preco: "R$ 350,00", classe: "img-cinto" },
    { nome: "Corda 150m x 12mm", preco: "R$ 350,00", classe: "img-corda" },
    { nome: "Mosquetão D45 KN", preco: "R$ 350,00", classe: "img-mosquetao" },
  ];

  return (
    <div className="anuncios-container">
      <h2>Seus Anúncios Ativos</h2>
      <div className="anuncios-lista">
        {anuncios.map((item, index) => (
          <div className="bloco-branco" key={index}>
            <div className="card">
              <div className={`imagem ${item.classe}`}></div>
              <h3>{item.nome}</h3>
              <div className="preco">{item.preco}</div>
              <button className="btn-detalhes">Ver detalhes</button>
            </div>
          </div>
        ))}
      </div>    
    </div>
  );
}

