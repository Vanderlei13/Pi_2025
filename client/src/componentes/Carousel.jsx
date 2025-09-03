import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style/carousel.css";

const Carrossel = () => {
  const [slideAtual, setSlideAtual] = useState(0);
  const [estaPausado, setEstaPausado] = useState(false);

  const slides = [
    {
      id: 1,
      imagem: "/carousel/bombeiro01.png",
      textoAlternativo: "Bombeiro em ação",
      titulo: "Profissionais Dedicados"
    },
    {
      id: 2,
      imagem: "/Imagens/hero.jpeg",
      textoAlternativo: "Equipamentos de qualidade",
      titulo: "Produtos de Qualidade"
    },
    {
      id: 3,
      imagem: "/Imagens/hero2.jpg",
      textoAlternativo: "Atendimento especializado",
      titulo: "Atendimento Excepcional"
    },
    {
      id: 4,
      imagem: "/Imagens/hero 3.jpeg",
      textoAlternativo: "Entrega rápida e segura",
      titulo: "Entrega Rápida"
    },
    {
      id: 5,
      imagem: "/Imagens/hero 4.jpeg",
      textoAlternativo: "Satisfação garantida",
      titulo: "Satisfação Garantida"
    }
  ];

  useEffect(() => {
    if (!estaPausado) {
      const temporizador = setTimeout(() => {
        setSlideAtual((anterior) => (anterior + 1) % slides.length);
      }, 4000);

      return () => clearTimeout(temporizador);
    }
  }, [slideAtual, estaPausado, slides.length]);

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

      <button className="carousel-button prev" onClick={irParaAnterior} aria-label="Anterior" type="button">
        <FaChevronLeft />
      </button>
      <button className="carousel-button next" onClick={irParaProximo} aria-label="Próximo" type="button">
        <FaChevronRight />
      </button>

      <div className="carousel-indicators">
                  {slides.map((_, indice) => (
            <button
              key={indice}
              className={`indicator ${indice === slideAtual ? 'active' : ''}`}
              onClick={() => irParaSlide(indice)}
              aria-label={`Ir para o slide ${indice + 1}`}
              type="button"
            />
          ))}
      </div>
    </div>
  );
};

export default Carrossel; 