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

  const carregarAnuncios = () => {
    axios.get("http://localhost:5000/anuncios_ativos")
      .then((res) => {
        const express_data = res.data["data"];
        setAnuncios(express_data);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
      });
  };

  const tornarInativo = async (id) => {
    try {
      await axios.post("http://localhost:5000/tornar_inativo", {
        id: id
      });
      carregarAnuncios(); // Recarrega a lista após a operação
    }
    catch (error) {
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
      carregarAnuncios(); // Recarrega a lista após a exclusão
    }
    catch (error) {
      if (error.response) {
        console.error("Erro do backend:", error.response.data);
        alert("Erro: " + JSON.stringify(error.response.data));
      } else {
        console.error("Erro:", error.message);
        alert("Erro: " + error.message);
      }
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
        {anuncios.map((item, index) => (
          <div className="bloco-branco" key={index}>
            <div className="card">
              <div className={`imagem ${item.classe || getClasseByTipo(item.tipo)}`}></div>
              <h3>{item.nome ? item.nome.toString().trim() : 'Nome não disponível'}</h3>
              <h3>R$ {item.preco ? parseFloat(item.preco).toFixed(2) : '0.00'}</h3>
              <h3>{item.tipo ? item.tipo.toString().trim() : 'Tipo não disponível'}</h3>
              <h3>{item.quantidade ? item.quantidade : 0} Unidades</h3>
              <button className="btn-detalhes" onClick={() => navigate("/ver_detalhes", { state: { produto: item } })}>Ver detalhes</button>
              <button className="btn-inativo" onClick={() => tornarInativo(item.id)}>Tornar Inativo</button>
              <button className="btn-excluir" onClick={() => excluirAnuncio(item.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
      {anuncios.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <button 
            className="btn-inativo" 
            onClick={irParaInativos}
            style={{ 
              width: '200px', 
              margin: '0 auto', 
              display: 'block'
            }}
          >
            Ver Anúncios Inativos
          </button>
        </div>
      )}
    </div>
  );
}
