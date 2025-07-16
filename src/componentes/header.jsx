import "../style/header.css";

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-left">
          <img src="/logo.png" alt="BombeirosPro Logo" className="header-logo" />
        </div>
        <div className="header-search">
          <input type="text" placeholder="Buscar produtos..." className="header-input" />
          <button className="header-search-btn">
            <span role="img" aria-label="Buscar">🔍</span>
          </button>
        </div>
        <nav className="header-nav">
          <a href="#" className="header-link">Home</a>
          <a href="#" className="header-link">Locação</a>
          <a href="#" className="header-link">Anúncios</a>
          <a href="#" className="header-link">Contato</a>
        </nav>
        <div className="header-actions">
          <button className="header-btn header-btn-outline">Cadastrar</button>
          <button className="header-btn header-btn-solid">Entrar</button>
          <button className="header-cart-btn" title="Carrinho">
            <span role="img" aria-label="Carrinho">🛒</span>
          </button>
        </div>
      </div>
    </header>
  );
}
