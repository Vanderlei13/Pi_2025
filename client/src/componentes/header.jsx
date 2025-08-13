import "../style/header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa"; // serve pra usar os icones
import { Link } from "react-router-dom"; // serve pra fazer links entre paginas

// funcao/constante do header
const Header = () => {
  // const navigate = useNavigate(); // Serve para navegar entre as paginas 
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
          <a href="/seus_anuncios">Locação</a>
          <Link to="/seus_anuncios">Anúncios</Link>
          <Link to="/contato">Contato</Link>
        </nav>

      <Link to="/">
        <div className="user-info">
          <div className="user-avatar">EM</div>
          <span>Emanuel</span>
        

          <button className="cart-button">
            <FaShoppingCart />
          </button>
        </div>
      </Link>
      </div>
    </header>
  );
};

export default Header;
