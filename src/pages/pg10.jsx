import '../style/pg10.css';

export default function Pg10() {
  return (
    <div className="pg10-container">
      <h1 className="pg10-title">Seus Anúncios Inativos</h1>
      <div className="pg10-cards-row">
        <div className="card">
          <div className="imagem">
            <img src="" alt="" />
          </div>
          <h3>Calça civil</h3>
          <div className="descricao">Proteção, mobilidade e<br />durabilidade</div>
          <div className="preco">R$ 350,00</div>
          <button className="btn-detalhes">Ver detalhes</button>
        </div>
        <div className="card">
          <div className="imagem"></div>
          <h3>Jaqueta civil</h3>
          <div className="descricao">Proteção, mobilidade e<br />durabilidade</div>
          <div className="preco">R$ 350,00</div>
          <button className="btn-detalhes">Ver detalhes</button>
        </div>
        <div className="card">
          <div className="imagem"></div>
          <h3>Bota civil</h3>
          <div className="descricao">Proteção, mobilidade e<br />durabilidade</div>
          <div className="preco">R$ 350,00</div>
          <button className="btn-detalhes">Ver detalhes</button>
        </div>
      </div>
    </div>
  );
}