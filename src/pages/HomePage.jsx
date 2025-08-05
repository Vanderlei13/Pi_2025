import Header from '../componentes/header.jsx';
import Carrossel from '../componentes/Carousel.jsx';
import Pg9 from '../pages/pg9.jsx';

export default function HomePage() {
  return (
    <>
      <Header />
      <Carrossel />
      <Pg9 />
      {/* Conteúdo da página inicial pode ser adicionado aqui futuramente */}
      <main style={{ minHeight: '80vh', background: '#f2f2f2' }}></main>
    </>
  );
} 