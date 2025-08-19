import React, { useState } from "react";
import axios from "axios";
import "../style/Cadastro.css";
import bombeiroImg from "../../public/Imagens/bombeiro.png";

export default function Cadastro() {
  const [termos, setTermos] = useState(false);
  const [privacidade, setPrivacidade] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

const postUsers = async () => {
  try {
    const res = await axios.post("http://localhost:5000/add_usuario", {
      id: 3,
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone
    });
    console.log(res.data); // mostra a resposta do backend
    alert("Usuário adicionado com sucesso!");
  } catch (error) {
    // se o backend retornar um JSON com erro
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
        <form className="cadastro-form">
          <label>
            Nome
            <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label>
            Telefone
            <input type="text" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
          </label>
          <label>
            Email
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label>
            Senha
            <input type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
          </label>
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