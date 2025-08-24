import React, { useState } from "react";
import "../style/header.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

// Componente Header
const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Ao enviar a busca, navega para a página de pesquisa passando o termo via query string
  function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/pesquisa?q=${encodeURIComponent(searchTerm)}`);
  }

  // Limpa o termo ao digitar novamente
  function handleInputChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <header className="header">
      {/* Logo */}
      <Link to='/'>
        <div className="logo">
          <img src="/Imagens/Logo.png" alt="Logo BombeirosPro"/>
        </div>
      </Link>

      {/* Barra de pesquisa */}
      <div className="search-bar" style={{position: "relative"}}>
        <form onSubmit={handleSearch} style={{display: "flex", alignItems: "center"}}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="search-input"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className="search-button" aria-label="Buscar" type="submit">
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Navegação e usuário/carrinho */}
      <div className="header-right">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/seus_anuncios">Anúncios</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <div className="user-cart">
          {/* Link para login */}
          <Link to="/login" className="user-info">
            <div className="user-avatar">
              <FaUser />
            </div>
            <span>Login</span>
          </Link>
          {/* Link para carrinho */}
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