import React, { useState, useEffect } from "react";
import "../style/compra_de_item.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompraDeItem() {
  const location = useLocation();
  const navigate = useNavigate();
  const produto = location.state?.produto;
  const [adicionandoAoCarrinho, setAdicionandoAoCarrinho] = useState(false);


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
        // Opcionalmente, redirecionar para o carrinho
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

  useEffect(() => {
    async function carregarImagensProduto() {
      const { idAnuncio, caminho } = await pegarUploads();
      let listaImagens = [];

      for (let i = 0; i < idAnuncio.length; i++) {
        if (produto.id === idAnuncio[i]) { //vertifica se a img pertence a esse produto
          listaImagens.push(`http://localhost:5000/uploads/${caminho[i]}`); //pega o caminho das img 
        }
      }

      setImagens(listaImagens); // atualiza o state com as imagens do produto
    }

    // useEffect para chamar a função ao montar o componente
    
    carregarImagensProduto();
    }, [produto]);


  return (
    <div className="compra-item-container">
      <div className="compra-item-gallery">
        {imagens.map((img, idx) => (
          <button
            key={idx}
            className={`gallery-thumb ${imgSelecionada === idx ? "active" : ""
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
            <span className="info-novo">{produto.quantidade} unidades</span>
          </div>
          <h1 className="info-title">{produto.nome}</h1>
          <div className="info-preco">
            <span className="preco-grande">R${produto.preco}</span>
            <div className="preco-parcela">
              em <b>12x R${(produto.preco / 12).toFixed(2)} sem juros</b>
            </div>
            <a href="#" className="preco-link">
              Ver os meios de pagamento
            </a>
          </div>
          <div className="info-entrega">
            <span className="entrega-verde">Chegará grátis</span> entre {dia7.toLocaleDateString("pt-BR")} <br />
            e {dia14.toLocaleDateString("pt-BR")}
            <br />
            <a href="#" className="entrega-link">
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
              <button
                className="cart-qty-btn"
                onClick={() => quantidade < produto.quantidade && setQuantidade(quantidade + 1)}
                disabled={quantidade >= produto.quantidade}
              >
                +
              </button>
            </div>
          </div>
          
          <button className="btn-comprar">Comprar agora</button>
          <button 
            className="btn-carrinho" 
            onClick={handleAddToCart} 
            disabled={adicionandoAoCarrinho}
          >
            {adicionandoAoCarrinho ? "Adicionando..." : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>
    </div>
  );
}
