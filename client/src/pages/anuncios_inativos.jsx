import { useEffect, useState } from 'react';
import '../style/anuncios_inativos.css';
import axios from 'axios';

export default function Anuncios_inativos() {
  const [anuncios, setAnuncios] = useState([]);
  console.log(anuncios)
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
      <div className="pg10-cards-row">
        
        <div className="card">
          <div className="imagem">
            <img src="" alt="" />
          </div>
          <h3>Calça civil</h3>
          <div className="descricao">Proteção, mobilidade e<br />durabilidade</div>
          <div className="preco">R$ 350,00</div>
          <button className="btn-detalhes">Ver detalhes</button>
        </div>
      </div>
    </div>
  );
}