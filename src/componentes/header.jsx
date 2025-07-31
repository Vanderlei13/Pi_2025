import "../style/header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";

// funcao/constante do header
const Header = () => {
  return (
    <header className="header">
      <div className="logo"><img src="/Imagens/Logo.png"/></div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="search-input"
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>

      <div className="header-right">
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Locação</a>
          <a href="#">Anúncios</a>
          <a href="#">Contato</a>
        </nav>

        <div className="user-info">
          <div className="user-avatar">EM</div>
          <span>Emanuel</span>
        </div>

        <button className="cart-button">
          <FaShoppingCart />
        </button>
      </div>
    </header>
  );
};

export default Header;
