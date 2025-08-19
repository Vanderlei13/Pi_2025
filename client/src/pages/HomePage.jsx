import { useRef } from "react";
import Carrossel from "../componentes/Carousel.jsx";
import "../style/secoes_produtos.css";
import "../style/home_page.css";
import CarrosselVeiculos from "../componentes/CarrosselVeiculos.jsx";

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

function BannerPromocional() {
	return (
		<section className="promo-wrapper">
			<div className="promo-banner">
				<img src="/Imagens/bannerpromocional.png" alt="Equipamentos autônomos - tudo a pronta entrega" />
			</div>
		</section>
	);
}

function CardPromocional({ marca, titulo, descricao, imagem, textoAlternativo, alinhamento = "esquerda" }) {
	const invertido = alinhamento === "direita";
	return (
		<article className={`promo-card${invertido ? " invertido" : ""}`}>
			<div className="promo-content">
				<span className="promo-brand">{marca}</span>
				<h3 className="promo-title">{titulo}</h3>
				<p className="promo-desc">{descricao}</p>
				<a href="#" className="promo-link">Saiba mais <span>›</span></a>
			</div>
			<div className="promo-image">
				<img src={imagem} alt={textoAlternativo} loading="lazy" />
			</div>
		</article>
	);
}

export default function HomePage() {
	const conjuntos = [
		{ id: 1, nome: "Conjunto 1", imagem: "/Imagens/bombeiro.png" },
		{ id: 2, nome: "Conjunto 2", imagem: "/Imagens/jaqueta.png" },
		{ id: 3, nome: "Conjunto 3", imagem: "/Imagens/calca.png" },
		{ id: 4, nome: "Conjunto 4", imagem: "/Imagens/bota.png" },
		{ id: 5, nome: "Conjunto 5", imagem: "/Imagens/cinto.png" },
	];

	const equipamentos = [
		{ id: 101, nome: "Balaclava", imagem: "/Imagens/bombeiro.png" },
		{ id: 102, nome: "Mangueira", imagem: "/Imagens/mangueira.png" },
		{ id: 103, nome: "Capacete", imagem: "/Imagens/jaqueta.png" },
		{ id: 104, nome: "Óculos", imagem: "/Imagens/oculos.png" },
		{ id: 105, nome: "Luvas", imagem: "/Imagens/bota.png" },
	];

	return (
		<>
			{/* Conteúdo existente */}
			<Carrossel />
			<main>
				<LinhaCards titulo="Conjuntos em" itens={conjuntos} />
				<LinhaCards titulo="Equipamentos em" itens={equipamentos} />
			</main>

			{/* Cards promocionais (penúltimo bloco) */}
			<section className="promo-grid">
				<CardPromocional
					marca="Plastflex"
					titulo="Mangueira boa demais"
					descricao={"Mangueira especial para bombeiros"}
					imagem="/Imagens/mangueira.png"
					textoAlternativo="Mangueira Plastflex"
					alinhamento="direita"
				/>
				<CardPromocional
					marca="Casapete"
					titulo="Capacete bombeiro"
					descricao={"Capacete especial de resgate"}
					imagem="/Imagens/bombeiro.png"
					textoAlternativo="Capacete de bombeiro"
				/>
			</section>

			{/* Banner promocional */}
			<BannerPromocional />

			{/* Carrossel de veículos em destaque */}
			<CarrosselVeiculos />

			{/* Rodapé */}
		</>
	);
}
