import React, { useState } from 'react';
import '../style/carrinho_de_compras.css';

const PRECO_ITENS = [1624, 1624, 1624];
const PRODUTOS = [
  {
    nome: "Capacete profissional - Resistente a 500°C",
    ref: "CAP-2025",
    tipo: "ProFire"
  },
  {
    nome: "Bota de couro ignífugo - Solado antiderrapante",
    ref: "BOT-2025",
    tipo: "FireShield"
  },
  {
    nome: "Bota de couro ignífugo - Solado antiderrapante",
    ref: "BOT-2025",
    tipo: "FireShield"
  }
];

export default function Carrinho_de_compras() {
  const [quantidades, setQuantidades] = useState([1, 1, 1]);
  const [ativos, setAtivos] = useState([true, true, true]);

  const handleAdd = idx => {
    setQuantidades(q =>
      q.map((item, i) => (i === idx ? item + 1 : item))
    );
  };

  const handleRemove = idx => {
    setQuantidades(q =>
      q.map((item, i) => (i === idx && item > 0 ? item - 1 : item))
    );
  };

  const handleExcluir = idx => {
    setAtivos(a => a.map((item, i) => (i === idx ? false : item)));
    setQuantidades(q => q.map((item, i) => (i === idx ? 0 : item)));
  };

  const temItens = ativos.some(Boolean);
  const subtotal = quantidades.reduce((acc, qtd, i) => acc + (ativos[i] ? qtd * PRECO_ITENS[i] : 0), 0);
  const total = subtotal;

  return (
    <div className="cart-bg">
      <h1 className="cart-title">Carrinho de compras</h1>
      <div className="cart-main">
        {temItens && (
          <div className="cart-list">
            {PRODUTOS.map((produto, idx) =>
              ativos[idx] && (
                <React.Fragment key={idx}>
                  <div className="cart-item">
                    <div className="cart-item-img">{/* Imagem aqui */}</div>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{produto.nome}</div>
                      <div className="cart-item-ref">
                        Ref.: {produto.ref}<br />Tipo: {produto.tipo}
                      </div>
                      <div className="cart-item-actions">
                        <button className="cart-btn cart-btn-remove" onClick={() => handleExcluir(idx)}>Excluir</button>
                        <button className="cart-btn cart-btn-edit">Alterar</button>
                      </div>
                    </div>
                    <div className="cart-item-price">
                      <div className="cart-price-main">R$ {PRECO_ITENS[idx].toLocaleString('pt-BR')}</div>
                      <div className="cart-price-pix">ou R$ 1.542,80 no Pix</div>
                      <div className="cart-qty">
                        <button className="cart-qty-btn" onClick={() => handleRemove(idx)}>-</button>
                        <span className="cart-qty-num">{quantidades[idx]}</span>
                        <button className="cart-qty-btn" onClick={() => handleAdd(idx)}>+</button>
                      </div>
                    </div>
                  </div>
                  <hr className="cart-divider" />
                </React.Fragment>
              )
            )}
          </div>
        )}
        <div className="cart-summary">
          <div className="cart-summary-title">Resumo da compra</div>
          <hr className="cart-summary-divider" />
          <div className="cart-summary-section">
            <div className="cart-summary-label">Calcular Frete</div>
            <div className="cart-summary-cep">
              <span className="cart-summary-cep-icon"></span>
              <input className="cart-summary-cep-input" placeholder="Informar um CEP" />
              <span className="cart-summary-cep-link">Não sei meu CEP</span>
            </div>
          </div>
          <div className="cart-summary-section">
            <div className="cart-summary-label">Cupom</div>
            <div className="cart-summary-cupom">
              <span className="cart-summary-cupom-icon"></span>
              <input className="cart-summary-cupom-input" placeholder="Cupom" />
              <span className="cart-summary-cupom-link">Aplicar cupom</span>
            </div>
          </div>
          <div className="cart-summary-subtotal">
            Subtotal ({quantidades.filter((_, i) => ativos[i]).reduce((a, b) => a + b, 0)} itens): R$<br />
            <span className="cart-summary-subtotal-value">{subtotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          </div>
          <div className="cart-summary-total-row">
            <span className="cart-summary-total-label">Total</span>
            <span className="cart-summary-total-value">R$ {total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
          </div>
          <button className="cart-summary-btn">Finalizar Compra</button>
        </div>
      </div>
    </div>
  );
}