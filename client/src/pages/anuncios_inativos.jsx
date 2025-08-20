import { useEffect, useState } from 'react';
import '../style/anuncios_inativos.css';
import axios from 'axios';

export default function Anuncios_inativos() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/anuncios_inativos")
      .then((res) => {
        const express_data = res.data["data"];
        setAnuncios(express_data);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
      });
  }, []);


  return (
      <div className="pg10-container">
        <h1 className="pg10-title">Seus Anúncios Inativos</h1>
        {anuncios.map((item, index) => (
          <div className="pg10-cards-row">
            <div className="card" key={index}>
              <div className="imagem">
                <img src={null} />
              </div>
              <h3>{item.nome}</h3>
              <div className="descricao">{item.descricao}</div>
              <div className="preco">{item.preco}</div>
              <button className="btn-detalhes">Ver detalhes</button>
            </div>
          </div>
        ))}

      </div>

  );
}