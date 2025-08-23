import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/anuncios_inativos.css';
import axios from 'axios';

export default function Anuncios_inativos() {
  const [anuncios, setAnuncios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarAnuncios();
  }, []);

  const carregarAnuncios = () => {
    axios.get("http://localhost:5000/anuncios_inativos")
      .then((res) => {
        const express_data = res.data["data"];
        setAnuncios(express_data);
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
      });
  };

  const tornarAtivo = (id) => {
    axios.post("http://localhost:5000/tornar_ativo", { id })
      .then((res) => {
        if (res.data.status === "Sucesso") {
          alert("Anúncio tornado ativo com sucesso!");
          carregarAnuncios(); // Recarrega a lista
        } else {
          alert("Erro ao tornar ativo: " + res.data.message);
        }
      })
      .catch((err) => {
        console.error("Erro na requisição:", err);
        alert("Erro ao tornar ativo");
      });
  };

  const irParaAtivos = () => {
    navigate("/anuncios_ativos");
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
      <h2>Seus Anúncios Inativos</h2>
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
              <button className="btn-ativo" onClick={() => tornarAtivo(item.id)}>Deixar Ativo</button>
            </div>
          </div>
        ))}
      </div>
      {anuncios.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <button 
            className="btn-ativo" 
            onClick={irParaAtivos}
            style={{ 
              width: '200px', 
              margin: '0 auto', 
              display: 'block'
            }}
          >
            Ver Anúncios Ativos
          </button>
        </div>
      )}
    </div>
  );
}