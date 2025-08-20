import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/anuncios_ativos.css";

export default function Anuncios_ativos() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/anuncios_ativos")
      .then((res) => {
        const express_data = res.data["data"];
        setAnuncios(express_data);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
      });
  }, []);

  return (
    <div className="anuncios-container">
      <h2>Seus Anúncios Ativos</h2>
      <div className="anuncios-lista">
        {anuncios.map((item, index) => (
          <div className="bloco-branco" key={index}>
            <div className="card">
              <div className={`imagem ${item.classe}`}></div>
              <h3>{item.nome}</h3>
              <h3>R$ {item.preco}</h3>
              <h3>{item.tipo}</h3>
              <h3>{item.quantidade} Unidades</h3>
              {/* <div className="preco">{item.preco}</div> */}
              <button className="btn-detalhes">Ver detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
