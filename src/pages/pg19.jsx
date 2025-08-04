import React, { useState } from 'react';
import '../style/pg19.css';

export default function Pg19() {
  const [info, setInfo] = useState('');
  return (
    <div className="pg19-bg">
      <form className="pg19-form">
        <h2>Adicione um Endereço</h2>
        <div className="pg19-row">
          <div className="pg19-field">
            <label>Rua / Avenida</label>
            <input type="text" />
          </div>
          <div className="pg19-field">
            <label>Número</label>
            <input type="text" />
          </div>
        </div>
        <div className="pg19-field">
          <label>Complemento (Opcional)</label>
          <input type="text" />
        </div>
        <div className="pg19-field">
          <label>Informações adicionais deste endereço (Opcional)</label>
          <textarea
            maxLength={128}
            value={info}
            onChange={e => setInfo(e.target.value)}
          />
          <div className="pg19-charcount">{info.length} / 128</div>
        </div>
        <div className="pg19-field">
          <label>Este é o seu trabalho ou na sua casa</label>
          <div className="pg19-radio-group">
            <label>
              <input type="radio" name="tipo" />
              <span className="pg19-radio-icon" role="img" aria-label="Casa">🏠</span>
              Casa
            </label>
            <label>
              <input type="radio" name="tipo" />
              <span className="pg19-radio-icon" role="img" aria-label="Trabalho">🏢</span>
              Trabalho
            </label>
          </div>
        </div>
        <div className="pg19-section">
          <h3>Dados de contato</h3>
          <span className="pg19-desc">
            Se houver algum problema no envio, você receberá um aviso neste telefone
          </span>
          <div className="pg19-field">
            <label>Nome e sobrenome</label>
            <input type="text" />
          </div>
          <div className="pg19-field">
            <label>Telefone de contato</label>
            <input type="text" />
          </div>
        </div>
      </form>
    </div>
  );
}