import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../style/carousel.css";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Array com 5 imagens (você substituirá pelos caminhos das suas imagens)
  const slides = [
    {
      id: 1,
      image: "/carousel/bombeiro01.png",
      alt: "Bombeiro em ação",
      title: "Profissionais Dedicados"
    },
    {
      id: 2,
      image: "https://picsum.photos/1200/500?random=2",
      alt: "Slide 2",
      title: "Produtos de Qualidade"
    },
    {
      id: 3,
      image: "https://picsum.photos/1200/500?random=3",
      alt: "Slide 3",
      title: "Atendimento Excepcional"
    },
    {
      id: 4,
      image: "https://picsum.photos/1200/500?random=4",
      alt: "Slide 4",
      title: "Entrega Rápida"
    },
    {
      id: 5,
      image: "https://picsum.photos/1200/500?random=5",
      alt: "Slide 5",
      title: "Satisfação Garantida"
    }
  ];

  // Navegação automática
  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isPaused, slides.length]);

  // Funções de navegação
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="carousel-image"
            />
            <div className="carousel-content">
              <h2 className="carousel-title">{slide.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button className="carousel-button prev" onClick={goToPrevious}>
        <FaChevronLeft />
      </button>
      <button className="carousel-button next" onClick={goToNext}>
        <FaChevronRight />
      </button>

      {/* Indicadores */}
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 