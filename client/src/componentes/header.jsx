import "../style/header.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa"; // Adicione FaUser
import { Link } from "react-router-dom"; // serve pra fazer links entre paginas

// funcao/constante do header
const Header = () => {
  // const navigate = useNavigate(); // Serve para navegar entre as paginas 
  return (
    <header className="header">
      <Link to='/'>
        <div className="logo">
          <img src="/Imagens/Logo.png" alt="Logo BombeirosPro"/>
        </div>
      </Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="search-input"
        />
        <button className="search-button" aria-label="Buscar">
          <FaSearch />
        </button>
      </div>

      <div className="header-right">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/anucnios_ativos">Locação</Link>
          <Link to="/seus_anuncios">Anúncios</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <div className="user-cart">
          <Link to="/cadastro-ritter" className="user-info">
            <div className="user-avatar">
              <FaUser />
            </div>
            <span>Login</span>
          </Link>
          <Link to="/carrinho_de_compras" className="cart-link">
            <button className="cart-button" style={{marginLeft: "8px"}}>
              <FaShoppingCart />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;