import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha todos os campos para entrar.");
      return;
    }
    setErro("");

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: email,
        senha: senha
      });
      alert("Login realizado!");

      console.log(res.data);
    } catch (error) {
      if (error.response) {
        console.error("Erro do backend:", error.response.data);
      } else {
        console.error("Erro:", error.message);
      }
    }
  }

  const carregarRegistro = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: email,
        senha: senha
      });

      console.log("Resposta login:", res.data);

      if (res.data.status === "Sucesso") {
        localStorage.setItem("id_usuario", res.data.id_usuario);
        alert("Logado com sucesso!");
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro do backend:", error.response.data);
        alert("Erro: " + JSON.stringify(error.response.data));
      } else {
        console.error("Erro:", error.message);
        alert("Erro: " + error.message);
      }
    }
  };

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
          <button type="submit" className="login-btn" onClick={carregarRegistro}>
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