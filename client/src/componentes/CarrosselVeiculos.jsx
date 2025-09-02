import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const resp = await fetch("http://localhost:5000/caminhoes_anuncios");
        const dados = await resp.json();
        if (dados.status === "Sucesso") {
          const base = [
            { nome: "Caminhão ABT", imagem: "/Imagens/caminhao01.webp", imagens: ["/Imagens/caminhao01.webp"] },
            { nome: "Caminhão ABTR", imagem: "/Imagens/caminhao02.webp", imagens: ["/Imagens/caminhao02.webp"] },
            { nome: "Caminhão ABPE", imagem: "/Imagens/caminhao03.webp", imagens: ["/Imagens/caminhao03.webp"] },
            { nome: "Caminhão AHQ", imagem: "/Imagens/caminhao04.webp", imagens: ["/Imagens/caminhao04.webp"] },
            { nome: "Caminhão AT", imagem: "/Imagens/caminhao05.webp", imagens: ["/Imagens/caminhao05.webp"] },
          ];
          const combinados = base.map((b) => {
            const encontrado = dados.data.find((d) => d.nome === b.nome);
            return {
              id: encontrado?.id,
              nome: b.nome,
              preco: encontrado?.preco ?? 0,
              imagem: b.imagem,
              imagens: b.imagens,
            };
          });
          setItens(combinados.filter((c) => Number.isInteger(c.id) && c.id > 0));
        }
      } catch (_) {
        setItens([]);
      }
    }
    carregar();
  }, []);

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
                <button 
                  className="vd-btn" 
                  type="button"
                  onClick={() => navigate("/compra_de_item", { state: { 
                    produto: {
                      id: v.id, // id real de anúncio
                      nome: v.nome,
                      tipo: "Veículo de Combate a Incêndio",
                      quantidade: 1,
                      preco: v.preco,
                      imagem: v.imagem,
                      imagens: v.imagens,
                      descricao: `Informações do ${v.nome}. Consulte nossa equipe para detalhes técnicos e disponibilidade.`
                    }
                  }})}
                >
                  Ver detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
        <Seta lado="direita" onClick={() => rolar(1)} />
      </div>
    </section>
  );
} 