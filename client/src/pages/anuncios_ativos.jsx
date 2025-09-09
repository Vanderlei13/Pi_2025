import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/anuncios_ativos.css";

export default function Anuncios_ativos() {
  const [anuncios, setAnuncios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAnuncios();
  }, []);

  const carregarAnuncios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/anuncios_ativos");
      const express_data = res.data["data"];
      const anunciosComImagens = await adicionarImagens(express_data);
      setAnuncios(anunciosComImagens);
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  const tornarInativo = async (id) => {
    try {
      await axios.post("http://localhost:5000/tornar_inativo", { id });
      carregarAnuncios();
    } catch (error) {
      if (error.response) {
        console.error("Erro do backend:", error.response.data);
        alert("Erro: " + JSON.stringify(error.response.data));
      } else {
        console.error("Erro:", error.message);
        alert("Erro: " + error.message);
      }
    }
  };

  const excluirAnuncio = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/anuncios/${id}`);
      alert("Anúncio excluído com sucesso!");
      carregarAnuncios();
    } catch (error) {
      if (error.response) {
        console.error("Erro do backend:", error.response.data);
        alert("Erro: " + JSON.stringify(error.response.data));
      } else {
        console.error("Erro:", error.message);
        alert("Erro: " + error.message);
      }
    }
  };

  const adicionarImagens = async (produtos) => {
    try {
      const response = await fetch("http://localhost:5000/uploads_info");
      const imagens = await response.json();

      return produtos.map(produto => {
        const imagem = imagens.find(img => img.id_anuncio === produto.id);
        return {
          ...produto,
          imagem: imagem ? `http://localhost:5000/uploads/${imagem.caminho}` : "/Imagens/bombeiro.png"
        };
      });
    } catch (error) {
      console.error("Erro ao carregar imagens:", error);
      return produtos.map(produto => ({
        ...produto,
        imagem: "/Imagens/bombeiro.png"
      }));
    }
  };

  const irParaInativos = () => {
    navigate("/anuncios_inativos");
  };

  const getClasseByTipo = (tipo) => {
    if (!tipo) return '';
    const tipoLower = tipo.toString().toLowerCase();
    if (tipoLower.includes('cinto')) return 'img-cinto';
    if (tipoLower.includes('corda')) return 'img-corda';
    if (tipoLower.includes('mosquetao')) return 'img-mosquetao';
    return '';
  };

  return (
    <div className="anuncios-container">
      <h2>Seus Anúncios Ativos</h2>
      <div className="anuncios-lista">
        {anuncios.map((item) => (
          <div className="bloco-branco" key={item.id}>
            <div className="pesquisa-card">
              <div className={`pesquisa-card-img ${getClasseByTipo(item.tipo)}`}>
                {item.imagem ? (
                  <img src={item.imagem} alt={item.nome} />
                ) : (
                  <div className="placeholder-img">Sem imagem</div>
                )}
              </div>
              <div className="pesquisa-card-nome">{item.nome}</div>
              <div className="pesquisa-card-preco">
                R$ {Number(item.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div>{item.id}</div>
              <div className="pesquisa-card-desc">{item.descricao}</div>

              <button className="pesquisa-card-btn" onClick={() => navigate("/compra_de_item", { state: { produto: item } })}>
                Ver detalhes
              </button>

              <button className="btn-inativo" onClick={() => tornarInativo(item.id)}>
                Tornar Inativo
              </button>

              <button className="btn-excluir" onClick={() => excluirAnuncio(item.id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {anuncios.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <button
            className="btn-inativo"
            onClick={irParaInativos}
            style={{ width: '200px', margin: '0 auto', display: 'block' }}
          >
            Ver Anúncios Inativos
          </button>
        </div>
      )}
    </div>
  );
}
