import { useRef } from "react";
import "../style/veiculos_em_destaque.css";

function Seta({ lado = "esquerda", onClick }) {
  return (
    <button type="button" aria-label={lado === "esquerda" ? "Anterior" : "Próximo"} className={`vd-arrow ${lado}`} onClick={onClick}>
      <span className="vd-chevron">{lado === "esquerda" ? "‹" : "›"}</span>
    </button>
  );
}

export default function CarrosselVeiculos() {
  const faixaRef = useRef(null);

  const itens = [
    { id: 1, nome: "Caminhão ABT", imagem: "/Imagens/caminhao01.webp" },
    { id: 2, nome: "Caminhão ABTR", imagem: "/Imagens/caminhao02.webp" },
    { id: 3, nome: "Caminhão ABPE", imagem: "/Imagens/caminhao03.webp" },
    { id: 4, nome: "Caminhão AHQ", imagem: "/Imagens/caminhao04.webp" },
    { id: 5, nome: "Caminhão AT", imagem: "/Imagens/caminhao05.webp" },
  ];

  const rolar = (delta) => {
    if (!faixaRef.current) return;
    const card = faixaRef.current.querySelector(".vd-card");
    const passo = card ? card.offsetWidth + 24 : 320;
    faixaRef.current.scrollBy({ left: delta * passo, behavior: "smooth" });
  };

  return (
    <section className="vd-wrapper">
      <div className="vd-title">Veículos em Destaque</div>

      <div className="vd-row-wrap">
        <Seta lado="esquerda" onClick={() => rolar(-1)} />
        <div className="vd-row" ref={faixaRef}>
          {itens.map((v) => (
            <article className="vd-card" key={v.id}>
              <div className="vd-top">
                <img src={v.imagem} alt={v.nome} loading="lazy" />
              </div>
              <div className="vd-bottom">
                <strong className="vd-nome">{v.nome}</strong>
                <button className="vd-btn" type="button">Ver detalhes</button>
              </div>
            </article>
          ))}
        </div>
        <Seta lado="direita" onClick={() => rolar(1)} />
      </div>
    </section>
  );
} 