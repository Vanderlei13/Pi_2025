import React, { useState } from "react";
import "../style/Cadastro.css";
import bombeiroImg from "../../public/Imagens/bombeiro.png";

export default function Cadastro() {
  const [termos, setTermos] = useState(false);
  const [privacidade, setPrivacidade] = useState(false);

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-title">Cadastro</h1>
      <div className="cadastro-content">
        <form className="cadastro-form">
          <label>
            Nome
            <input type="text" name="nome" />
          </label>
          <label>
            Telefone
            <input type="text" name="telefone" />
          </label>
          <label>
            Email
            <input type="email" name="email" />
          </label>
          <label>
            Senha
            <input type="password" name="senha" />
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
            <button className="cadastro-btn">Cadastrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}