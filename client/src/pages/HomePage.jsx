import { useRef } from "react";
import "../style/secoes_produtos.css";

function ScrollSeta({ onClick, side = "left" }) {
  return (
    <button
      className={`scroll-arrow ${side}`}
      aria-label={side === "left" ? "Anterior" : "Próximo"}
      onClick={onClick}
      type="button"
    >
      <span className="chevron">{side === "left" ? "‹" : "›"}</span>
    </button>
  );
}

function LinhaCards({ titulo, itens }) {
  const rowRef = useRef(null);

  const scroll = (delta) => {
    if (!rowRef.current) return;
    const card = rowRef.current.querySelector(".produto-card");
    const step = card ? card.offsetWidth + 16 : 320;
    rowRef.current.scrollBy({ left: delta * step, behavior: "smooth" });
  };

  return (
    <section className="home-section">
      <div className="section-title">
        <span>{titulo}</span>
      </div>

      <div className="row-wrapper">
        <ScrollSeta side="left" onClick={() => scroll(-1)} />
        <div className="cards-row" ref={rowRef}>
          {itens.map((p) => (
            <article className="produto-card" key={p.id}>
              <div className="card-top">
                <img src={p.imagem} alt={p.nome} loading="lazy" />
              </div>
              <div className="card-bottom">
                <strong className="nome">{p.nome}</strong>
                <button className="btn-detalhes" type="button">Ver detalhes</button>
              </div>
            </article>
          ))}
        </div>
        <ScrollSeta side="right" onClick={() => scroll(1)} />
      </div>
    </section>
  );
}

export default function SecoesProdutos() {
  const conjuntos = [
    { id: 1, nome: "Conjunto 1", imagem: "/Imagens/bombeiro.png" },
    { id: 2, nome: "Conjunto 2", imagem: "/Imagens/jaqueta.png" },
    { id: 3, nome: "Conjunto 3", imagem: "/Imagens/calca.png" },
    { id: 4, nome: "Conjunto 4", imagem: "/Imagens/bota.png" },
    { id: 5, nome: "Conjunto 5", imagem: "/Imagens/cinto.png" },
  ];

  const equipamentos = [
    { id: 101, nome: "Balaclava", imagem: "https://picsum.photos/300/260?1" },
    { id: 102, nome: "Mangueira", imagem: "/Imagens/mangueira.png" },
    { id: 103, nome: "Capacete", imagem: "https://picsum.photos/300/260?2" },
    { id: 104, nome: "Óculos", imagem: "/Imagens/oculos.png" },
    { id: 105, nome: "Luvas", imagem: "https://picsum.photos/300/260?3" },
  ];

  return (
    <>
      <LinhaCards titulo="Conjuntos em" itens={conjuntos} />
      <LinhaCards titulo="Equipamentos em" itens={equipamentos} />
    </>
  );
}
