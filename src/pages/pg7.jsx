import React from 'react';
import '../style/pg7.css';

const produtos = [
  { nome: 'Óculos', preco: 'R$ 350,00', imagemClass: 'oculos' },
  { nome: 'Mangueira', preco: 'R$ 350,00', imagemClass: 'mangueira' },
  { nome: 'Ford Ranger', preco: 'R$ 350,00', imagemClass: 'ranger' },
  { nome: 'Óculos', preco: 'R$ 350,00', imagemClass: 'oculos' },
  { nome: 'Mangueira', preco: 'R$ 350,00', imagemClass: 'mangueira' },
  { nome: 'Ford Ranger', preco: 'R$ 350,00', imagemClass: 'ranger' },
];

function Pg7() {
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
              <p className="preco">{produto.preco}</p>
              <button className="btn-detalhes">Ver detalhes</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Pg7;
