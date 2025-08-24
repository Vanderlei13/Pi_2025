import React, { useState } from 'react';
import '../style/adicionar_inforcoes.css';

export default function Adicionar_informacoes() {
  const [info, setInfo] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  function handleFinalizarCompra(e) {
    e.preventDefault();
    setSucesso(false);
    if (!rua || !numero || !tipo || !nome || !telefone) {
      setErro('Erro: Preencha todos os campos obrigatórios.');
      setEnviando(false);
      return;
    }
    setErro('');
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setSucesso(true);
    }, 2000);
  }

  return (
    <div className="pg19-bg">
      <form className="pg19-form" onSubmit={handleFinalizarCompra}>
        <h2>Adicione um Endereço</h2>
        <div className="pg19-row">
          <div className="pg19-field">
            <label>Rua / Avenida</label>
            <input
              type="text"
              value={rua}
              onChange={e => setRua(e.target.value)}
            />
          </div>
          <div className="pg19-field">
            <label>Número</label>
            <input
              type="text"
              value={numero}
              onChange={e => setNumero(e.target.value)}
            />
          </div>
        </div>
        <div className="pg19-field">
          <label>Complemento (Opcional)</label>
          <input
            type="text"
            value={complemento}
            onChange={e => setComplemento(e.target.value)}
          />
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
              <input
                type="radio"
                name="tipo"
                value="casa"
                checked={tipo === 'casa'}
                onChange={e => setTipo(e.target.value)}
              />
              <span className="pg19-radio-icon" role="img" aria-label="Casa">🏠</span>
              Casa
            </label>
            <label>
              <input
                type="radio"
                name="tipo"
                value="trabalho"
                checked={tipo === 'trabalho'}
                onChange={e => setTipo(e.target.value)}
              />
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
            <input
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </div>
          <div className="pg19-field">
            <label>Telefone de contato</label>
            <input
              type="text"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            />
          </div>
        </div>
        {erro && (
          <div className="pg19-error">{erro}</div>
        )}
        <button type="submit" className="cart-summary-btn" disabled={enviando}>
          Finalizar Compra
        </button>
        {enviando && (
          <div className="pg19-enviando">
            Sua compra está sendo enviada...
          </div>
        )}
        {sucesso && (
          <div className="pg19-enviando" style={{background: "#388e3c"}}>
            Compra enviada com sucesso!
          </div>
        )}
      </form>
    </div>
  );
}