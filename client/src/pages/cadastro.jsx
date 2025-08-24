import React, { useState } from "react";
import axios from "axios";
import "../style/cadastro.css";
import bombeiroImg from "../../public/Imagens/bombeiro.png";

export default function Cadastro() {
  const [termos, setTermos] = useState(false);
  const [privacidade, setPrivacidade] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const postUsers = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!nome || !telefone || !email || !senha) {
      setErro("Os dados não foram inseridos. Preencha todos os campos.");
      return;
    }
    // Verifica se telefone é só números
    if (!/^\d+$/.test(telefone)) {
      setErro("O telefone deve conter apenas números.");
      return;
    }
    // Verifica se email tem @
    if (!email.includes("@")) {
      setErro("O email deve conter '@'.");
      return;
    }
    setErro("");
    try {
      const res = await axios.post("http://localhost:5000/add_usuario", {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone
      });
      console.log(res.data);
      alert("Usuário adicionado com sucesso!");
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
    <div className="cadastro-container">
      <h1 className="cadastro-title">Cadastro</h1>
      <div className="cadastro-content">
        <form className="cadastro-form" onSubmit={e => e.preventDefault()}>
          <label>
            Nome
            <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label>
            Telefone
            <input
              type="text"
              name="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ""))}
              maxLength={15}
            />
          </label>
          <label>
            Email
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Senha
            <input type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </label>
          {erro && (
            <div className="cadastro-erro">{erro}</div>
          )}
        </form>
        <div className="cadastro-side">
          <div className="cadastro-termos">
            <div className="termo-row">
              <span>Termos de Uso</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={termos}
                  onChange={() => setTermos(!termos)}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="termo-row">
              <span>Políticas de Privacidade</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={privacidade}
                  onChange={() => setPrivacidade(!privacidade)}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="img-and-button">
            <img src={bombeiroImg} alt="Bombeiro" id="bombeiro-img" />
            <button onClick={postUsers} className="cadastro-btn">Cadastrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}