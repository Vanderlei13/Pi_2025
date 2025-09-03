import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();

	const scroll = (delta) => {
		if (!rowRef.current) return;
		const card = rowRef.current.querySelector(".produto-card");
		const step = card ? card.offsetWidth + 16 : 320;
		rowRef.current.scrollBy({ left: delta * step, behavior: "smooth" });
	};

	const handleVerDetalhes = (produto) => {
		// Usar os dados completos do produto
		navigate("/compra_de_item", { state: { produto: produto } });
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
								<img src={p.imagem} alt={`Imagem do produto ${p.nome}`} loading="lazy" />
							</div>
							<div className="card-bottom">
								<strong className="nome">{p.nome}</strong>
								{p.preco !== undefined && (
									<span className="preco">R$ {Number(p.preco).toFixed(2)}</span>
								)}
								<button 
									className="btn-detalhes" 
									type="button"
									onClick={() => handleVerDetalhes(p)}
								>
									Ver detalhes
								</button>
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

function CardPromocional({ marca, titulo, descricao, imagem, textoAlternativo, alinhamento = "esquerda", produto }) {
	const navigate = useNavigate();
	const invertido = alinhamento === "direita";
	
	const handleSaibaMais = () => {
		if (produto) {
			navigate("/compra_de_item", { state: { produto } });
		}
	};
	
	return (
		<article className={`promo-card${invertido ? " invertido" : ""}`}>
			<div className="promo-content">
				<span className="promo-brand">{marca}</span>
				<h3 className="promo-title">{titulo}</h3>
				<p className="promo-desc">{descricao}</p>
				<button onClick={handleSaibaMais} className="promo-link">Saiba mais <span>›</span></button>
			</div>
			<div className="promo-image">
				<img src={imagem} alt={textoAlternativo} loading="lazy" />
			</div>
		</article>
	);
}

export default function HomePage() {
	const [conjuntos, setConjuntos] = useState([]);
	const [equipamentos, setEquipamentos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function carregarProdutos() {
			try {
				const response = await fetch("http://localhost:5000/anuncios_ativos");
				const data = await response.json();
				
				if (data.status === "Sucesso") {
					const produtos = data.data;
					
					// Filtrar conjuntos (IDs 5-9)
					const conjuntosData = produtos.filter(p => p.id >= 5 && p.id <= 9);
					
					// Filtrar equipamentos (IDs 10-14)
					const equipamentosData = produtos.filter(p => p.id >= 10 && p.id <= 14);
					
					// Adicionar imagens aos produtos
					const conjuntosComImagens = await adicionarImagens(conjuntosData);
					const equipamentosComImagens = await adicionarImagens(equipamentosData);
					
					setConjuntos(conjuntosComImagens);
					setEquipamentos(equipamentosComImagens);
				}
			} catch (error) {
				console.error("Erro ao carregar produtos:", error);
			} finally {
				setLoading(false);
			}
		}

		carregarProdutos();
	}, []);

	async function adicionarImagens(produtos) {
		try {
			const response = await fetch("http://localhost:5000/uploads_info");
			const imagens = await response.json();
			
			return produtos.map(produto => {
				const imagem = imagens.find(img => img.id_anuncio === produto.id);
				return {
					...produto,
					imagem: imagem ? `http://localhost:5000/uploads/${imagem.caminho}` : "/Imagens/bombeiro.png"
				};
			});
		} catch (error) {
			console.error("Erro ao carregar imagens:", error);
			return produtos.map(produto => ({
				...produto,
				imagem: "/Imagens/bombeiro.png"
			}));
		}
	}

	if (loading) {
		return (
			<>
				<Carrossel />
				<main>
					<div style={{ textAlign: 'center', padding: '40px' }}>
						<h2>Carregando produtos...</h2>
					</div>
				</main>
			</>
		);
	}

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
					produto={{
						id: 11,
						nome: "Mangueira Plastflex",
						preco: 89.90,
						quantidade: 15,
						imagem: "/Imagens/mangueira.png"
					}}
				/>
				<CardPromocional
					marca="Casapete"
					titulo="Capacete bombeiro"
					descricao={"Capacete especial de resgate"}
					imagem="/Imagens/bombeiro.png"
					textoAlternativo="Capacete de bombeiro"
					produto={{
						id: 10,
						nome: "Capacete de Bombeiro",
						preco: 156.80,
						quantidade: 8,
						imagem: "/Imagens/bombeiro.png"
					}}
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
