import Header from "../componentes/header.jsx";
import Carrossel from "../componentes/Carousel.jsx";
import Pg14 from "../pages/pg14.jsx";

export default function HomePage() {
  return (
    <>
      <Header />
      <Carrossel />
      <Pg14 />
      {/* Conteúdo da página inicial pode ser adicionado aqui futuramente */}
      <main style={{ minHeight: "80vh", background: "#f2f2f2" }}></main>
    </>
  );
}
