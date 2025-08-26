import React, { useState } from "react";
import "../style/compra_de_item.css";
// import axios from "axios";
import { useLocation } from "react-router-dom";

// Caminhos relativos para imagens na pasta public
const imagens = [
  "/Imagens/capacete1.webp",
  "/Imagens/capacete2.webp",
  "/Imagens/capacete3.webp",
  "/Imagens/capacete4.webp",
];

export default function CompraDeItem() {
  const location = useLocation();
  const produto = location.state?.produto;



  const [imgSelecionada, setImgSelecionada] = useState(3);

  if (!produto) return <p>Carregando...</p>;
  return (
    <div className="compra-item-container">
      <div className="compra-item-gallery">
        {imagens.map((img, idx) => (
          <button
            key={idx}
            className={`gallery-thumb ${
              imgSelecionada === idx ? "active" : ""
            }`}
            onClick={() => setImgSelecionada(idx)}
          >
            <img src={img} alt={`Capacete ${idx + 1}`} />
          </button>
        ))}
      </div>
      <div className="compra-item-main">
        <div className="compra-item-img-area">
          <img
            src={imagens[imgSelecionada]}
            alt="Capacete selecionado"
            className="main-img"
          />
        </div>
        <div className="compra-item-info">
          <div className="info-top">
            <span className="info-novo">Novo | +20 vendidos</span>
          </div>
          <h2 className="info-title">{dados.nome}</h2>
          <div className="info-preco">
            <span className="preco-grande">R$1.165</span>
            <div className="preco-parcela">
              em <b>12x R$97,08 sem juros</b>
            </div>
            <a href="#" className="preco-link">
              Ver os meios de pagamento
            </a>
          </div>
          <div className="info-entrega">
            <span className="entrega-verde">Chegará grátis</span> entre 16 e
            21/jul
            <br />
            <a href="#" className="entrega-link">
              Mais formas de entrega
            </a>
          </div>
          <div className="info-ultimo">Último disponível!</div>
          <button className="btn-comprar">Comprar agora</button>
          <button className="btn-carrinho">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  );
}
