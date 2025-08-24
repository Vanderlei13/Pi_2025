import React, { useEffect, useState } from "react";
import "../style/pesquisa.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Pesquisa() {
  const query = useQuery();
  const termo = query.get("q") || "";
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [precoMin] = useState(0);
  const [precoMax] = useState(11800);
  const [precoFiltroMin, setPrecoFiltroMin] = useState(0);
  const [precoFiltroMax, setPrecoFiltroMax] = useState(11800);

  // Ordenação
  const [ordenarAberto, setOrdenarAberto] = useState(false);
  const [ordenarPor, setOrdenarPor] = useState("relevantes"); // relevantes, maior, menor

  const navigate = useNavigate();

  useEffect(() => {
    async function buscar() {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/search_anuncios?q=${encodeURIComponent(termo)}`
        );
        setResultados(res.data.data || []);
      } catch {
        setResultados([]);
      }
      setLoading(false);
    }
    if (termo) buscar();
    else setResultados([]);
  }, [termo]);

  // Filtra os resultados pelo preço selecionado
  let resultadosFiltrados = resultados.filter(
    item =>
      Number(item.preco) >= precoFiltroMin &&
      Number(item.preco) <= precoFiltroMax
  );

  // Ordena os resultados conforme opção
  if (ordenarPor === "maior") {
    resultadosFiltrados = [...resultadosFiltrados].sort((a, b) => b.preco - a.preco);
  } else if (ordenarPor === "menor") {
    resultadosFiltrados = [...resultadosFiltrados].sort((a, b) => a.preco - b.preco);
  }
  // "relevantes" mantém a ordem original

  function handleAplicarFiltro() {
    // Atualiza os filtros, mas não é mais necessário para exibir os resultados
    // Os resultados agora aparecem automaticamente
  }

  function handleOrdenar(opcao) {
    setOrdenarPor(opcao);
    setOrdenarAberto(false);
  }

  function handleVerDetalhes() {
    navigate("/compra_de_item");
  }

  return (
    <div className="pesquisa-bg">
      <aside className="pesquisa-filtros">
        <h2>Filtros:</h2>
        <div className="pesquisa-categorias">
          <label>Categorias<span>▼</span></label>
        </div>
        <div className="pesquisa-preco">
          <label>Preço:</label>
          <div className="pesquisa-preco-inputs">
            <input
              type="number"
              min={precoMin}
              max={precoFiltroMax}
              value={precoFiltroMin}
              onChange={e => setPrecoFiltroMin(Number(e.target.value))}
              style={{width: "70px", marginRight: "8px"}}
            />
            <span>–</span>
            <input
              type="number"
              min={precoFiltroMin}
              max={precoMax}
              value={precoFiltroMax}
              onChange={e => setPrecoFiltroMax(Number(e.target.value))}
              style={{width: "70px", marginLeft: "8px"}}
            />
          </div>
          <div className="pesquisa-preco-range">
            <input
              type="range"
              min={precoMin}
              max={precoMax}
              value={precoFiltroMax}
              onChange={e => setPrecoFiltroMax(Number(e.target.value))}
              style={{width: "100%"}}
            />
          </div>
        </div>
        <button className="pesquisa-btn-filtro" onClick={handleAplicarFiltro}>
          Aplicar filtros
        </button>
      </aside>
      <main className="pesquisa-main">
        <div className="pesquisa-ordenar" style={{position: "relative"}}>
          <span
            style={{cursor: "pointer"}}
            onClick={() => setOrdenarAberto(!ordenarAberto)}
          >
            <b>Ordenar por:</b>{" "}
            {ordenarPor === "relevantes"
              ? "Mais relevantes"
              : ordenarPor === "maior"
              ? "Maior preço"
              : "Menor preço"}{" "}
            <span>▼</span>
          </span>
          {ordenarAberto && (
            <div className="pesquisa-ordenar-menu">
              <div
                className={`pesquisa-ordenar-opcao${ordenarPor === "relevantes" ? " ativo" : ""}`}
                onClick={() => handleOrdenar("relevantes")}
              >
                Mais relevantes
              </div>
              <div
                className={`pesquisa-ordenar-opcao${ordenarPor === "maior" ? " ativo" : ""}`}
                onClick={() => handleOrdenar("maior")}
              >
                Maior preço
              </div>
              <div
                className={`pesquisa-ordenar-opcao${ordenarPor === "menor" ? " ativo" : ""}`}
                onClick={() => handleOrdenar("menor")}
              >
                Menor preço
              </div>
            </div>
          )}
        </div>
        <div className="pesquisa-cards">
          {loading ? (
            <div className="pesquisa-loading">Buscando...</div>
          ) : termo && resultadosFiltrados.length > 0 ? (
            resultadosFiltrados.map(item => (
              <div className="pesquisa-card" key={item.id}>
                <div className="pesquisa-card-img">
                  <img src="/Imagens/produto_padrao.png" alt={item.nome} />
                </div>
                <div className="pesquisa-card-nome">{item.nome}</div>
                <div className="pesquisa-card-preco">
                  R$ {Number(item.preco).toLocaleString("pt-BR", {minimumFractionDigits:2})}
                </div>
                <div className="pesquisa-card-desc">{item.descricao}</div>
                <button className="pesquisa-card-btn" onClick={handleVerDetalhes}>
                  Ver detalhes
                </button>
              </div>
            ))
          ) : termo && resultadosFiltrados.length === 0 ? (
            <div className="pesquisa-sem-resultado">Nenhum resultado encontrado</div>
          ) : null}
        </div>
      </main>
    </div>
  );
}