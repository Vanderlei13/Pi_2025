import { Link } from "react-router-dom";
import "../style/footer.css";

function Footer() {
  return (
    <footer className="rodape">
      <div className="rodape-conteudo">
        <div className="coluna">
          <h4 className="titulo">Links Rápidos</h4>
          <nav className="links">
            <Link to="/seus_anuncios">Anúncio</Link>
            <Link to="/anuncios_ativos">Locação</Link>
            <Link to="/carrinho_de_compras">Loja</Link>
            <Link to="/">Home</Link>
          </nav>
        </div>

        <div className="coluna">
          <h4 className="titulo">BombeirosPro</h4>
          <p className="slogan">Onde o fogo ameaça, a gente equipa quem enfrenta</p>
        </div>

        <div className="coluna">
          <h4 className="titulo">Contato</h4>
          <ul className="contatos">
            <li><a href="mailto:bombeirosprobr@gmail.com">bombeirosprobr@gmail.com</a></li>
            <li><a href="tel:+5549989001505">(49) 98900-1505</a></li>
            <li>Concórdia, SC</li>
          </ul>
          <div className="redes">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13.5 9.5H15V7h-1.5A2 2 0 0 0 11.5 9v1H10v2h1.5v5h2v-5H15l.25-2h-1.75V9.5c0-.28.22-.5.5-.5Z"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M16.5 7.5L7.5 16.5M7.5 7.5l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="4" fill="#fff"/><circle cx="17" cy="7" r="1" fill="#fff"/></svg>
            </a>
          </div>
        </div>

        <div className="coluna logo-coluna">
          <img src="/Imagens/Logo.png" alt="BombeirosPro" className="logo" />
        </div>
      </div>

      <div className="rodape-direitos">© 2025 BombeirosPro. Todos os direitos reservados.</div>
    </footer>
  );
}

export default Footer;
