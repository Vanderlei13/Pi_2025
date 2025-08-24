import React, { useState } from "react";
import "../style/login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha todos os campos para entrar.");
      return;
    }
    setErro("");
    // Adicione aqui a lógica de autenticação
    alert("Login realizado (simulação)!");
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="login-content">
        <form className="login-form" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <button type="submit" className="login-btn">
            Entrar
          </button>
          {erro && (
            <div className="login-error">{erro}</div>
          )}
        </form>
      </div>
      <Link to="/cadastro" style={{ textDecoration: "none" }}>
        <div className="login-bottom-text">
          Ainda não tem uma conta? <b>Inscreva-se agora!</b>
        </div>
      </Link>
    </div>
  );
}