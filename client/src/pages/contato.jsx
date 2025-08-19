import React from "react";

function EnvieSuaMensagem() {
  const [form, setForm] = React.useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada!");
    setForm({ nome: "", email: "", telefone: "", mensagem: "" });
  };

  return (
    <div
      style={{
        background: "#ffffffff",
        borderRadius: "24px",
        padding: "32px",
        maxWidth: "900px",
        margin: "40px auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 40px 1fr",
          alignItems: "center",
          gap: "0px",
          width: "100%",
          justifyItems: "center",
        }}
        className="envie-mensagem-grid"
      >
        <div
          style={{
            background: "linear-gradient(180deg, #c62828 0%, #8b0000 100%)",
            borderRadius: "12px",
            padding: "32px 24px",
            color: "#ffffffff",
            textAlign: "center",
            minWidth: "220px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="envie-mensagem-caixa"
        >
          <h2
            className="envie-mensagem-titulo"
            style={{
              marginBottom: "32px",
              fontSize: "2.6rem",
              fontWeight: "bold",
            }}
          >
            Envie sua mensagem
          </h2>
          <svg
            className="envie-mensagem-icone"
            width="180"
            height="140"
            viewBox="0 0 24 24"
            fill="none"
            style={{ margin: "0 auto", maxWidth: "100%" }}
          >
            <rect
              x="2"
              y="6"
              width="20"
              height="12"
              rx="2"
              stroke="#ffffffff"
              strokeWidth="2"
            />
            <path
              d="M2 6l10 7 10-7"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div /> {/* Espaço entre as caixas */}
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "220px",
          }}
          onSubmit={handleSubmit}
          className="envie-mensagem-form"
        >
          <div style={{ marginBottom: "16px" }}>
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "4px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "4px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Telefone</label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>Mensagem</label>
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              rows={3}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginTop: "4px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="envie-mensagem-botao"
            style={{
              width: "100%",
              background: "#c62828",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: "bold",
              fontSize: "16px",
              marginTop: "32px",
              cursor: "pointer",
              transition: "background 0.3s, transform 0.2s",
            }}
          >
            Enviar mensagem
          </button>
        </form>
      </div>
      {/* CSS responsivo */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.12); }
            100% { transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .envie-mensagem-icone {
            animation: pulse 1.5s infinite;
          }
          .envie-mensagem-titulo {
            animation: fadeIn 1.2s ease;
          }
          .envie-mensagem-botao:hover {
            background: #8b0000;
            transform: scale(1.06);
          }
          @media (max-width: 900px) {
            .envie-mensagem-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }
            .envie-mensagem-caixa,
            .envie-mensagem-form {
              min-width: 0;
              width: 100%;
            }
          }
          @media (max-width: 600px) {
            .envie-mensagem-caixa h2 {
              font-size: 2rem;
            }
            .envie-mensagem-caixa svg {
              width: 120px !important;
              height: 90px !important;
            }
            .envie-mensagem-form button {
              font-size: 15px !important;
              padding: 10px !important;
            }
            div[style*="padding: 32px"] {
              padding: 12px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default function Contato() {
  return (
    <div style={{ background: "#d6d6d6ff", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(180deg, #b71c1c 0%, #6d0b0b 100%)",
          color: "#fff",
          padding: "120px 0 80px 0", // aumentei o padding para deixar a caixa maior
          textAlign: "center",
          // borderBottom: "4px solid #6c2eb7",
        }}
      >
        <h1 style={{ fontSize: "3.2rem", fontWeight: "bold", margin: 0 }}>
          Entre em Contato
        </h1>
        <p style={{ fontSize: "1.5rem", marginTop: 40 }}>
          Estamos prontos para renovar seus equipamentos.
        </p>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          gap: "48px", // aumentei o gap entre os cards
          justifyContent: "center",
          alignItems: "flex-start",
          margin: "60px auto", // aumentei o margin
          maxWidth: 1100,
          flexWrap: "wrap",
        }}
        className="contato-main"
      >
        {/* Informações de contato */}
        <div
          style={{
            background: "#fff",
            borderRadius: 28,
            padding: "40px 44px", // aumentei o padding
            minWidth: 340,
            flex: 1,
            boxShadow: "0 2px 8px #0001",
            maxWidth: 450,
          }}
          className="contato-card"
        >
          <h2 style={{ fontWeight: "bold", marginBottom: 32 }}>
            Informações de contato
          </h2>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 32 }}>
            <span style={{ color: "#b71c1c", fontSize: 36 }}>
              {/* Email icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.217l8 5.333 8-5.333V6.5a.5.5 0 0 0-.5-.5h-15Zm15 2.783-7.5 5-7.5-5V17.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V8.783Z" fill="currentColor"/></svg>
            </span>
            <div>
              <strong>E-mail</strong>
              <div>bomberiospro@gmail.com</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 32 }}>
            <span style={{ color: "#b71c1c", fontSize: 36 }}>
              {/* Phone icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.72 11.72 0 0 0 3.69.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.47.59 3.69a1 1 0 0 1-.24 1.01l-2.2 2.2Z" fill="currentColor"/></svg>
            </span>
            <div>
              <strong>Telefone</strong>
              <div>(49) 98900-1505</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <span style={{ color: "#b71c1c", fontSize: 36 }}>
              {/* Location icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z" fill="currentColor"/></svg>
            </span>
            <div>
              <strong>Endereço</strong>
              <div>Concórdia, SC</div>
            </div>
          </div>
        </div>

        {/* Redes Sociais */}
        <div
          style={{
            background: "#fff",
            borderRadius: 28,
            padding: "40px 44px",
            minWidth: 340,
            flex: 1,
            boxShadow: "0 2px 8px #0001",
            maxWidth: 450,
          }}
          className="contato-card"
        >
          <h2 style={{ fontWeight: "bold", marginBottom: 32 }}>Redes Sociais</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <span>
              {/* Facebook icon vermelho */}
              <img
                src="https://img.icons8.com/ios-filled/50/facebook-new.png"
                alt="Facebook"
                style={{
                  width: 36,
                  height: 36,
                  filter: "invert(32%) sepia(98%) saturate(7482%) hue-rotate(356deg) brightness(90%) contrast(110%)"
                }}
              />
            </span>
            <div>
              <strong>Facebook</strong>
              <div>bomberiospro.br</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
            <span>
              {/* X (Twitter) icon vermelho */}
              <img
                src="https://img.icons8.com/ios-filled/50/twitterx--v2.png"
                alt="X"
                style={{
                  width: 36,
                  height: 36,
                  filter: "invert(32%) sepia(98%) saturate(7482%) hue-rotate(356deg) brightness(90%) contrast(110%)"
                }}
              />
            </span>
            <div>
              <strong>X</strong>
              <div>bomberiosprobra</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span>
              {/* Instagram icon vermelho */}
              <img
                src="https://img.icons8.com/ios-filled/50/instagram-new.png"
                alt="Instagram"
                style={{
                  width: 36,
                  height: 36,
                  filter: "invert(32%) sepia(98%) saturate(7482%) hue-rotate(356deg) brightness(90%) contrast(110%)"
                }}
              />
            </span>
            <div>
              <strong>Instagram</strong>
              <div>bomberiospro.br</div>
            </div>
          </div>
        </div>
      </div>
      {/* Separador visual */}
      <hr
        style={{
          border: "none",
          borderTop: "2px solid #e0e0e0",
          margin: "64px auto 48px auto", // aumentei o margin
          width: "80%",
        }}
      />
      <div style={{ marginBottom: "64px" }}>
        <EnvieSuaMensagem />
      </div>
      {/* CSS responsivo */}
      <style>
        {`
          @media (max-width: 900px) {
            .contato-main {
              flex-direction: column;
              align-items: stretch;
              gap: 36px;
              max-width: 98vw;
            }
            .contato-card {
              min-width: 0 !important;
              max-width: 100% !important;
              width: 100% !important;
              padding: 32px 12px !important;
            }
          }
          @media (max-width: 600px) {
            .contato-card h2 {
              font-size: 1.2rem !important;
            }
            .contato-card svg {
              width: 28px !important;
              height: 28px !important;
            }
            .contato-card {
              padding: 20px 4px !important;
            }
            div[style*="padding: 80px 0 50px 0"] h1 {
              font-size: 2rem !important;
            }
            div[style*="padding: 80px 0 50px 0"] p {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}