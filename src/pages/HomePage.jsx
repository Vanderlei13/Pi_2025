import Header from "../componentes/header.jsx";
import Carrossel from "../componentes/Carousel.jsx";
import Footer from "../componentes/footer.jsx";

export default function HomePage() {
  return (
    <>
      <Header />
      <Carrossel />
      {/* Conteúdo da página inicial pode ser adicionado aqui futuramente */}
      <main style={{ minHeight: "80vh", background: "#f2f2f2" }}>
        <div style={{ padding: "20px" }}>
          <h2>Bem-vindo ao BombeirosPro</h2>
          <p>Conteúdo principal da página com margem de 15px nas laterais.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
