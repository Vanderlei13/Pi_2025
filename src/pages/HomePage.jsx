import Header from '../componentes/header.jsx';
import Carrossel from '../componentes/Carousel.jsx';
import Pg10 from '../pages/pg10.jsx';

export default function HomePage() {
  return (
    <>
      <Header />
      <Carrossel />
      <Pg10 />
      {/* Conteúdo da página inicial pode ser adicionado aqui futuramente */}
      <main style={{ minHeight: '80vh', background: '#f2f2f2' }}></main>
    </>
  );
} 