import React, { useState, useEffect } from "react";
import "../style/compra_de_item.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompraDeItem() {
  const location = useLocation();
  const navigate = useNavigate();
  const produto = location.state?.produto;
  const [adicionandoAoCarrinho, setAdicionandoAoCarrinho] = useState(false);
  const [comprandoAgora, setComprandoAgora] = useState(false);
  const [mostrarModalPagamento, setMostrarModalPagamento] = useState(false);
  const [mostrarModalEntrega, setMostrarModalEntrega] = useState(false);
  const [mostrarModalSelecao, setMostrarModalSelecao] = useState(false);
  const [meioPagamentoSelecionado, setMeioPagamentoSelecionado] = useState('');
  const [formaEnvioSelecionada, setFormaEnvioSelecionada] = useState('');


  const data = new Date();
  // const dia = data.getDate();
  const dia7 = new Date(data);
  dia7.setDate(dia7.getDate() + 7);
  const dia14 = new Date(data);
  dia14.setDate(dia14.getDate() + 14);

  let disponivel;

  if (produto.quantidade === 1) {
    disponivel = "Último disponível!";
  }

  else {
    disponivel = "Disponível";
  }


  const [imgSelecionada, setImgSelecionada] = useState(0);
  const [imagens, setImagens] = useState([]);
  const [quantidade, setQuantidade] = useState(1);

  async function pegarUploads() {
    try {
      const response = await axios.get("http://localhost:5000/uploads_info"); //pega id_anuncios e o caminho das img
      const uploads = response.data;

      const idAnuncio = uploads.map(u => u.id_anuncio); // cria array com o id_anuncio e caminho respectivamente para poder ser identificado
      const caminho = uploads.map(u => u.caminho);

      console.log("IDs:", idAnuncio);
      console.log("Caminhos:", caminho);

      return { idAnuncio, caminho };
    } catch (error) {
      console.error("Erro ao buscar uploads:", error);
      return { idAnuncio: [], caminho: [] };
    }
  }

  // Nova função async que vai preencher a array imagens
  // Função para adicionar produto ao carrinho
  const handleAddToCart = async () => {
    try {
      setAdicionandoAoCarrinho(true);
      
      // Obter o ID do usuário do localStorage (ou usar um ID padrão para teste)
      const id_usuario = localStorage.getItem("id_usuario") || 1;
      
      // Se for veículo (sem anúncio real no BD), apenas alerta e não envia
      if (produto?.isVeiculo) {
        alert("Veículos não podem ser adicionados ao carrinho. Entre em contato para cotação.");
        return;
      }

      if (!Number.isInteger(produto.id) || produto.id <= 0) {
        alert("Produto inválido. Atualize a página inicial e tente novamente.");
        return;
      }

      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: parseInt(id_usuario),
          id_anuncio: produto.id,
          quantidade: quantidade // Usa a quantidade selecionada pelo usuário
        }),
      });

      if (response.ok) {
        // Mostrar mensagem de sucesso
        alert("Produto adicionado ao carrinho!");
        // Redirecionar para o carrinho
        navigate("/carrinho_de_compras");
      } else {
        const error = await response.json();
        alert(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar produto ao carrinho. Tente novamente.");
    } finally {
      setAdicionandoAoCarrinho(false);
    }
  };

  // Função para comprar agora (abre modal de seleção)
  const handleBuyNow = () => {
    // Se for veículo, vai direto para adicionar informações (sem adicionar ao carrinho)
    if (produto?.isVeiculo) {
      navigate("/adicionar_info");
      return;
    }
    
    // Abre modal de seleção de pagamento e entrega
    setMostrarModalSelecao(true);
  };

  // Função para processar a compra após seleção
  const processarCompra = async () => {
    if (!meioPagamentoSelecionado || !formaEnvioSelecionada) {
      alert("Por favor, selecione o meio de pagamento e a forma de envio.");
      return;
    }

    try {
      setComprandoAgora(true);
      
      // Obter o ID do usuário do localStorage (ou usar um ID padrão para teste)
      const id_usuario = localStorage.getItem("id_usuario") || 1;

      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: parseInt(id_usuario),
          id_anuncio: produto.id,
          quantidade: quantidade
        }),
      });

      if (response.ok) {
        // Salvar as seleções no localStorage para usar na página de adicionar informações
        localStorage.setItem("meioPagamento", meioPagamentoSelecionado);
        localStorage.setItem("formaEnvio", formaEnvioSelecionada);
        
        // Fechar modal e redirecionar
        setMostrarModalSelecao(false);
        navigate("/adicionar_info");
      } else {
        const error = await response.json();
        alert(`Erro: ${error.message}`);
      }
    } catch (error) {
      console.error("Erro ao processar compra:", error);
      alert("Erro ao processar compra. Tente novamente.");
    } finally {
      setComprandoAgora(false);
    }
  };

  useEffect(() => {
    async function carregarImagensProduto() {
      if (!produto) return;

      // Se vier uma galeria em produto (ex.: veículos), prioriza
      if (Array.isArray(produto.imagens) && produto.imagens.length > 0) {
        setImagens(produto.imagens);
        return;
      }

      // Se vier imagem única no produto (ex.: veículos), usa como fallback principal
      const imagensIniciais = produto.imagem ? [produto.imagem] : [];

      if (!produto.id) {
        setImagens(imagensIniciais);
        return;
      }

      const { idAnuncio, caminho } = await pegarUploads();
      let listaImagens = [];

      for (let i = 0; i < idAnuncio.length; i++) {
        if (produto.id === idAnuncio[i]) {
          listaImagens.push(`http://localhost:5000/uploads/${caminho[i]}`);
        }
      }

      // Se não houver uploads, mas existir imagem do produto, usa ela
      if (listaImagens.length === 0 && imagensIniciais.length > 0) {
        setImagens(imagensIniciais);
      } else {
        setImagens(listaImagens);
      }
    }

    carregarImagensProduto();
  }, [produto]);


  // Verificar se o produto existe
  if (!produto) {
    return (
      <div className="compra-item-container">
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          color: '#666'
        }}>
          <h2>Produto não encontrado</h2>
          <p>O produto que você está procurando não foi encontrado.</p>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Voltar à página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="compra-item-container">
      <div className="compra-item-gallery">
        {imagens.length > 0 ? (
          imagens.map((img, idx) => (
            <button
              key={idx}
              className={`gallery-thumb ${imgSelecionada === idx ? "active" : ""
                }`}
              onClick={() => setImgSelecionada(idx)}
            >
              <img src={img} alt={`Produto ${idx + 1}`} />
            </button>
          ))
        ) : (
          <div style={{ padding: '10px', color: '#666' }}>
            Nenhuma imagem disponível
          </div>
        )}
      </div>
      <div className="compra-item-main">
        <div className="compra-item-img-area">
          {imagens.length > 0 ? (
            <img
              src={imagens[imgSelecionada]}
              alt="Produto selecionado"
              className="main-img"
            />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '400px', 
              backgroundColor: '#f0f0f0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#666',
              fontSize: '18px'
            }}>
              Imagem não disponível
            </div>
          )}
        </div>
        <div className="compra-item-info">
          <div className="info-top">
            <span className="info-novo">{produto.quantidade} unidades</span>
          </div>
          <h1 className="info-title">{produto.nome}</h1>
          <div className="info-preco">
            <span className="preco-grande">
              R$ {Number(produto.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <div className="preco-parcela">
              em <b>12x R$ {Number(produto.preco / 12).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} sem juros</b>
            </div>
            <a href="#" className="preco-link" onClick={(e) => { e.preventDefault(); setMostrarModalPagamento(true); }}>
              Ver os meios de pagamento
            </a>
          </div>
          <div className="info-entrega">
            <span className="entrega-verde">Chegará grátis</span> entre {dia7.toLocaleDateString("pt-BR")} <br />
            e {dia14.toLocaleDateString("pt-BR")}
            <br />
            <a href="#" className="entrega-link" onClick={(e) => { e.preventDefault(); setMostrarModalEntrega(true); }}>
              Mais formas de entrega
            </a>
          </div>
          <div className="info-ultimo">{disponivel}</div>
          
          <div className="quantidade-controle">
            <span className="quantidade-label">Quantidade:</span>
            <div className="cart-qty">
              <button
                className="cart-qty-btn"
                onClick={() => quantidade > 1 && setQuantidade(quantidade - 1)}
                disabled={quantidade <= 1}
              >
                -
              </button>
              <span className="cart-qty-num">{quantidade}</span>
              {(() => {
                const maxQuantidade = (Number(produto?.quantidade) > 0) ? Number(produto.quantidade) : 10;
                const podeAumentar = quantidade < maxQuantidade;
                return (
                  <button
                    className="cart-qty-btn"
                    onClick={() => podeAumentar && setQuantidade(quantidade + 1)}
                    disabled={!podeAumentar}
                  >
                    +
                  </button>
                );
              })()}
            </div>
          </div>
          
          <button 
            className="btn-comprar" 
            onClick={handleBuyNow}
            disabled={comprandoAgora}
          >
            {comprandoAgora ? "Processando..." : "Comprar agora"}
          </button>
          <button 
            className="btn-carrinho" 
            onClick={handleAddToCart} 
            disabled={adicionandoAoCarrinho}
          >
            {adicionandoAoCarrinho ? "Adicionando..." : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>

      {/* Modal de Seleção de Pagamento e Entrega */}
      {mostrarModalSelecao && (
        <div className="modal-overlay" onClick={() => setMostrarModalSelecao(false)}>
          <div className="modal-content modal-selecao" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Finalizar Compra</h3>
              <button className="modal-close" onClick={() => setMostrarModalSelecao(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="selecao-container">
                <div className="selecao-secao">
                  <h4>💳 Meio de Pagamento</h4>
                  <div className="opcoes-selecao">
                    <label className="opcao-item">
                      <input 
                        type="radio" 
                        name="pagamento" 
                        value="cartao-credito"
                        checked={meioPagamentoSelecionado === 'cartao-credito'}
                        onChange={(e) => setMeioPagamentoSelecionado(e.target.value)}
                      />
                      <span>Cartão de Crédito (12x sem juros)</span>
                    </label>
                    <label className="opcao-item">
                      <input 
                        type="radio" 
                        name="pagamento" 
                        value="cartao-debito"
                        checked={meioPagamentoSelecionado === 'cartao-debito'}
                        onChange={(e) => setMeioPagamentoSelecionado(e.target.value)}
                      />
                      <span>Cartão de Débito (5% desconto)</span>
                    </label>
                    <label className="opcao-item">
                      <input 
                        type="radio" 
                        name="pagamento" 
                        value="pix"
                        checked={meioPagamentoSelecionado === 'pix'}
                        onChange={(e) => setMeioPagamentoSelecionado(e.target.value)}
                      />
                      <span>PIX (10% desconto)</span>
                    </label>
                    <label className="opcao-item">
                      <input 
                        type="radio" 
                        name="pagamento" 
                        value="boleto"
                        checked={meioPagamentoSelecionado === 'boleto'}
                        onChange={(e) => setMeioPagamentoSelecionado(e.target.value)}
                      />
                      <span>Boleto Bancário (8% desconto)</span>
                    </label>
                  </div>
                </div>

                <div className="selecao-secao">
                  <h4>🚚 Forma de Envio</h4>
                  <div className="opcoes-selecao">
                    <label className="opcao-item">
                      <input 
                        type="radio" 
                        name="envio" 
                        value="padrao"
                        checked={formaEnvioSelecionada === 'padrao'}
                        onChange={(e) => setFormaEnvioSelecionada(e.target.value)}
                      />
                      <span>Entrega Padrão - Grátis (7-14 dias)</span>
                    </label>
                    <label className="opcao-item">
                      <input 
                        type="radio" 
                        name="envio" 
                        value="expressa"
                        checked={formaEnvioSelecionada === 'expressa'}
                        onChange={(e) => setFormaEnvioSelecionada(e.target.value)}
                      />
                      <span>Entrega Expressa - R$ 15,90 (2-5 dias)</span>
                    </label>
                    <label className="opcao-item">
                      <input 
                        type="radio" 
                        name="envio" 
                        value="agendada"
                        checked={formaEnvioSelecionada === 'agendada'}
                        onChange={(e) => setFormaEnvioSelecionada(e.target.value)}
                      />
                      <span>Entrega Agendada - R$ 8,90</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-cancelar" 
                  onClick={() => setMostrarModalSelecao(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="btn-confirmar" 
                  onClick={processarCompra}
                  disabled={comprandoAgora}
                >
                  {comprandoAgora ? "Processando..." : "Continuar Compra"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Métodos de Pagamento */}
      {mostrarModalPagamento && (
        <div className="modal-overlay" onClick={() => setMostrarModalPagamento(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Métodos de Pagamento</h3>
              <button className="modal-close" onClick={() => setMostrarModalPagamento(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="pagamento-opcoes">
                <div className="pagamento-item">
                  <h4>💳 Cartão de Crédito</h4>
                  <p>Visa, Mastercard, Elo, American Express</p>
                  <p>Parcelamento em até 12x sem juros</p>
                </div>
                <div className="pagamento-item">
                  <h4>🏦 Cartão de Débito</h4>
                  <p>Visa, Mastercard, Elo</p>
                  <p>À vista com desconto de 5%</p>
                </div>
                <div className="pagamento-item">
                  <h4>💰 PIX</h4>
                  <p>Pagamento instantâneo</p>
                  <p>Desconto de 10% à vista</p>
                </div>
                <div className="pagamento-item">
                  <h4>🏪 Boleto Bancário</h4>
                  <p>Pagamento em até 3 dias úteis</p>
                  <p>Desconto de 8% à vista</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Formas de Entrega */}
      {mostrarModalEntrega && (
        <div className="modal-overlay" onClick={() => setMostrarModalEntrega(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Formas de Entrega</h3>
              <button className="modal-close" onClick={() => setMostrarModalEntrega(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="entrega-opcoes">
                <div className="entrega-item">
                  <h4>🚚 Entrega Padrão</h4>
                  <p>Frete grátis para compras acima de R$ 100</p>
                  <p>Prazo: 7 a 14 dias úteis</p>
                </div>
                <div className="entrega-item">
                  <h4>⚡ Entrega Expressa</h4>
                  <p>Frete: R$ 15,90</p>
                  <p>Prazo: 2 a 5 dias úteis</p>
                </div>
                <div className="entrega-item">
                  <h4>📦 Entrega Agendada</h4>
                  <p>Frete: R$ 8,90</p>
                  <p>Agende o melhor horário para você</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
