import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style/carousel.css";

const Carrossel = () => {
  const [slideAtual, setSlideAtual] = useState(0);
  const [estaPausado, setEstaPausado] = useState(false);

  // Array com 5 imagens (você substituirá pelos caminhos das suas imagens)
  const slides = [
    {
      id: 1,
      imagem: "/carousel/bombeiro01.png",
      textoAlternativo: "Bombeiro em ação",
      titulo: "Profissionais Dedicados"
    },
    {
      id: 2,
      imagem: "https://picsum.photos/1200/500?random=2",
      textoAlternativo: "Slide 2",
      titulo: "Produtos de Qualidade"
    },
    {
      id: 3,
      imagem: "https://picsum.photos/1200/500?random=3",
      textoAlternativo: "Slide 3",
      titulo: "Atendimento Excepcional"
    },
    {
      id: 4,
      imagem: "https://picsum.photos/1200/500?random=4",
      textoAlternativo: "Slide 4",
      titulo: "Entrega Rápida"
    },
    {
      id: 5,
      imagem: "https://picsum.photos/1200/500?random=5",
      textoAlternativo: "Slide 5",
      titulo: "Satisfação Garantida"
    }
  ];

  // Navegação automática
  useEffect(() => {
    if (!estaPausado) {
      const temporizador = setTimeout(() => {
        setSlideAtual((anterior) => (anterior + 1) % slides.length);
      }, 4000);

      return () => clearTimeout(temporizador);
    }
  }, [slideAtual, estaPausado, slides.length]);

  // Funções de navegação
  const irParaSlide = (indice) => {
    setSlideAtual(indice);
  };

  const irParaAnterior = () => {
    setSlideAtual((anterior) => (anterior - 1 + slides.length) % slides.length);
  };

  const irParaProximo = () => {
    setSlideAtual((anterior) => (anterior + 1) % slides.length);
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => setEstaPausado(true)}
      onMouseLeave={() => setEstaPausado(false)}
    >
      <div className="carousel-wrapper">
        {slides.map((slide, indice) => (
          <div
            key={slide.id}
            className={`carousel-slide ${indice === slideAtual ? 'active' : ''}`}
          >
            <img 
              src={slide.imagem} 
              alt={slide.textoAlternativo}
              className="carousel-image"
            />
            <div className="carousel-content">
              <h2 className="carousel-title">{slide.titulo}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button className="carousel-button prev" onClick={irParaAnterior}>
        <FaChevronLeft />
      </button>
      <button className="carousel-button next" onClick={irParaProximo}>
        <FaChevronRight />
      </button>

      {/* Indicadores */}
      <div className="carousel-indicators">
        {slides.map((_, indice) => (
          <button
            key={indice}
            className={`indicator ${indice === slideAtual ? 'active' : ''}`}
            onClick={() => irParaSlide(indice)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carrossel; 