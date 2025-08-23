import React from "react";
import { useLocation } from "react-router-dom";
import "../style/ver_detalhes.css";

export default function VerDetalhes() {
  const location = useLocation();
  const produto = location.state?.produto;
  
  // Exemplo de dados caso não venha por props
  const dados =
    produto || {
      nome: "Produto Exemplo",
      tipo: "Categoria",
      quantidade: 10,
      preco: 25.5,
      descricao: "Descrição detalhada do produto.",
    };

  const precoTotal = dados.quantidade * dados.preco;

  return (
    <div className="ver-detalhes-container">
      <div className="ver-detalhes-card">
        <div className="ver-detalhes-header">
          <h1>{dados.nome}</h1>
        </div>
        
        <div className="ver-detalhes-content">
          {/* Informações */}
          <div className="ver-detalhes-info">
            
            <div className="info-item">
              <div className="info-label">Tipo</div>
              <div className="info-value">{dados.tipo}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Quantidade</div>
              <div className="info-value">{dados.quantidade} unidades</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Preço Unitário</div>
              <div className="info-value price-value">R$ {dados.preco.toFixed(2).replace(".", ",")}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Preço Total</div>
              <div className="info-value price-value">R$ {precoTotal.toFixed(2).replace(".", ",")}</div>
            </div>
            
            <div className="description-container">
              <div className="info-label">Descrição</div>
              <div className="description-text">{dados.descricao}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}