import { useEffect } from "react";
import React from "react";
import axios from "axios";
import "../style/anuncios_ativos.css";

export default function Anuncios_ativos() {
  let express_data = ""

  axios.get("http://localhost:5000/anuncios_ativos")
    .then((res) => {
      // data_anunc = res.data["data"]
      showAnunc(res);
    })
    .catch((err) => {
      console.error("Erro na requisição:", err);
    });

  const showAnunc = (dat) => {
    express_data = dat.data["data"]
    console.log(express_data[0]["nome"]);
    // anuncios = [
    //   { nome: express_data[0]["nome"], preco: "R$ 350,00", classe: "img-cinto" }
    // ];
  }

  const anuncios = [
    { nome: "nome", preco: "R$ 350,00", classe: "img-cinto" }
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

