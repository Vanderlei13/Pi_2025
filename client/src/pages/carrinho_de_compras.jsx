import React, { useState, useEffect } from "react";
import "../style/carrinho_de_compras.css";
import { Link } from "react-router-dom";

export default function Carrinho_de_compras() {
  const [produtos, setProdutos] = useState([]); // Produtos carregados do banco de dados
  const [quantidades, setQuantidades] = useState([]);
  const [ativos, setAtivos] = useState([]);

  // Função para buscar os produtos do carrinho no backend
  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart/1"); // Substitua "1" pelo ID do usuário logado
      const data = await response.json();
      setProdutos(data);
      setQuantidades(data.map((item) => item.quantidade)); // Inicializa as quantidades
      setAtivos(data.map(() => true)); // Inicializa os itens como ativos
    } catch (error) {
      console.error("Erro ao buscar itens do carrinho:", error);
    }
  };

  // Função para adicionar um produto ao carrinho
  const handleAddToCart = async (produto, quantidade) => {
    try {
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: 1, // Substitua pelo ID do usuário logado
          id_anuncio: produto.id,
          quantidade,
        }),
      });

      if (response.ok) {
        fetchCartItems(); // Atualiza os itens do carrinho
      } else {
        const error = await response.json();
        alert(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  };

  // Função para remover um produto do carrinho
  const handleRemoveFromCart = async (produto) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/remove/${produto.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchCartItems(); // Atualiza os itens do carrinho
      } else {
        const error = await response.json();
        alert(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error);
    }
  };

  // Funções para manipular quantidades localmente
  const handleAdd = (idx) => {
    const produto = produtos[idx];
    try {
      // Atualiza a quantidade localmente primeiro para feedback imediato
      const novasQuantidades = [...quantidades];
      novasQuantidades[idx] = novasQuantidades[idx] + 1;
      setQuantidades(novasQuantidades);
      
      // Envia a atualização para o servidor
      fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: 1, // Substitua pelo ID do usuário logado
          id_anuncio: produto.id_anuncio,
          quantidade: 1,
        }),
      });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar produto ao carrinho. Tente novamente.");
    }
  };

  const handleRemove = (idx) => {
    const produto = produtos[idx];
    if (quantidades[idx] > 1) {
      try {
        // Atualiza a quantidade localmente primeiro para feedback imediato
        const novasQuantidades = [...quantidades];
        novasQuantidades[idx] = novasQuantidades[idx] - 1;
        setQuantidades(novasQuantidades);
        
        // Envia a atualização para o servidor
        fetch("http://localhost:5000/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_usuario: 1, // Substitua pelo ID do usuário logado
            id_anuncio: produto.id_anuncio,
            quantidade: -1,
          }),
        });
      } catch (error) {
        console.error("Erro ao remover do carrinho:", error);
        alert("Erro ao remover produto do carrinho. Tente novamente.");
      }
    }
  };

  const handleExcluir = (idx) => {
    const produto = produtos[idx];
    handleRemoveFromCart(produto);
  };

  const temItens = ativos.some(Boolean);
  const subtotal = produtos.reduce(
    (acc, produto, i) => acc + (ativos[i] ? quantidades[i] * produto.preco : 0),
    0
  );
  const total = subtotal;

  useEffect(() => {
    fetchCartItems(); // Carrega os itens do carrinho ao montar o componente
  }, []);

  const getImagemUrl = (produto) => {
    if (produto.imagem) {
      return `http://localhost:5000/uploads/${produto.imagem}`;
    }
    const fallbackPorNome = {
      "Caminhão ABT": "/Imagens/caminhao01.webp",
      "Caminhão ABTR": "/Imagens/caminhao02.webp",
      "Caminhão ABPE": "/Imagens/caminhao03.webp",
      "Caminhão AHQ": "/Imagens/caminhao04.webp",
      "Caminhão AT": "/Imagens/caminhao05.webp",
    };
    return fallbackPorNome[produto.nome] || null;
  };

  return (
    <div className="cart-bg">
      <h1 className="cart-title">Carrinho de compras</h1>
      <div className="cart-main">
        {temItens && (
          <div className="cart-list">
            {produtos.map(
              (produto, idx) =>
                ativos[idx] && (
                  <React.Fragment key={produto.id}>
                    <div className="cart-item">
                      <div className="cart-item-img">
                        {getImagemUrl(produto) ? (
                          <img
                            src={getImagemUrl(produto)}
                            alt={produto.nome}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#666'
                          }}>
                            Sem imagem
                          </div>
                        )}
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{produto.nome}</div>
                        <div className="cart-item-ref">
                          Ref.: {produto.id}
                          <br />
                          Tipo: {produto.tipo}
                        </div>
                        <div className="cart-item-actions">
                          <button
                            className="cart-btn cart-btn-remove"
                            onClick={() => handleExcluir(idx)}
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-price">
                        <div className="cart-price-main">
                          R$ {produto.preco.toLocaleString("pt-BR")}
                        </div>
                        <div className="cart-qty">
                          <button
                            className="cart-qty-btn"
                            onClick={() => handleRemove(idx)}
                          >
                            -
                          </button>
                          <span className="cart-qty-num">
                            {quantidades[idx]}
                          </span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => handleAdd(idx)}
                          >
                            +
                          </button>
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
          <div className="cart-summary-subtotal">
            Subtotal (
            {quantidades.filter((_, i) => ativos[i]).reduce((a, b) => a + b, 0)}{" "}
            itens): R$
            <br />
            <span className="cart-summary-subtotal-value">
              {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="cart-summary-total-row">
            <span className="cart-summary-total-label">Total</span>
            <span className="cart-summary-total-value">
              R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <Link to="/adicionar_info">
            <button className="cart-summary-btn">Finalizar Compra</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
