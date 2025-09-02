import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/filtro_de_compras.css';

const produtos = [
  { id: 1, nome: 'Óculos', preco: 350.00, imagemClass: 'oculos', tipo: 'Equipamento', quantidade: 5 },
  { id: 2, nome: 'Mangueira', preco: 350.00, imagemClass: 'mangueira', tipo: 'Equipamento', quantidade: 8 },
  { id: 3, nome: 'Ford Ranger', preco: 350.00, imagemClass: 'ranger', tipo: 'Veículo', quantidade: 2 },
  { id: 4, nome: 'Óculos', preco: 350.00, imagemClass: 'oculos', tipo: 'Equipamento', quantidade: 5 },
  { id: 5, nome: 'Mangueira', preco: 350.00, imagemClass: 'mangueira', tipo: 'Equipamento', quantidade: 8 },
  { id: 6, nome: 'Ford Ranger', preco: 350.00, imagemClass: 'ranger', tipo: 'Veículo', quantidade: 2 },
];

function Filtro_de_compras() {
  const navigate = useNavigate();

  const handleVerDetalhes = (produto) => {
    const produtoCompleto = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: produto.quantidade,
      tipo: produto.tipo,
      descricao: `Descrição do ${produto.nome}`
    };
    navigate("/compra_de_item", { state: { produto: produtoCompleto } });
  };

  return (
    <div className="pagina">
      <aside className="filtros">
        <h2>Filtros:</h2>

        <div className="grupo">
          <label className="label-categorias">Categorias<span> ⌄</span></label>
        </div>

        <div className="grupo">
          <p className="titulo-preco">Preço:</p>
          <p className="valor-preco">R$0–R$11.800</p>
          <input type="range" min="0" max="11800" className="slider" />
        </div>

        <button className="btn-filtro">Aplicar filtros</button>
      </aside>

      <main className="conteudo">
        <div className="ordenar">
          <span className="ordenar-label">Ordenar por:</span>
          <span className="ordenar-selecao">Mais relevantes ⌄</span>
        </div>

        <div className="produtos">
          {produtos.map((produto, i) => (
            <div className={`card ${produto.imagemClass}`} key={i}>
              <div className="imagem"></div>
              <h3>{produto.nome}</h3>
              <p className="preco">R$ {produto.preco.toFixed(2)}</p>
              <button 
                className="btn-detalhes"
                onClick={() => handleVerDetalhes(produto)}
              >
                Ver detalhes
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Filtro_de_compras;
