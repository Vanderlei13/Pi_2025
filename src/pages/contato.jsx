import React from "react";

export default function Contato() {
  return (
    <div style={{ background: "#f0f0f0", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(180deg, #b71c1c 0%, #6d0b0b 100%)",
          color: "#fff",
          padding: "60px 0 30px 0",
          textAlign: "center",
          borderBottom: "4px solid #6c2eb7",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", margin: 0 }}>
          Entre em Contato
        </h1>
        <p style={{ fontSize: "1.25rem", marginTop: 20 }}>
          Estamos prontos para renovar seus equipamentos.
        </p>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          justifyContent: "center",
          alignItems: "flex-start",
          margin: "40px auto",
          maxWidth: 1100,
          flexWrap: "wrap",
        }}
      >
        {/* Informações de contato */}
        <div
          style={{
            background: "#fff",
            borderRadius: 28,
            padding: "32px 36px",
            minWidth: 340,
            flex: 1,
            boxShadow: "0 2px 8px #0001",
            maxWidth: 450,
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: 24 }}>
            Informações de contato
          </h2>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
            <span style={{ color: "#b71c1c", fontSize: 36 }}>
              {/* Email icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.217l8 5.333 8-5.333V6.5a.5.5 0 0 0-.5-.5h-15Zm15 2.783-7.5 5-7.5-5V17.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V8.783Z" fill="currentColor"/></svg>
            </span>
            <div>
              <strong>E-mail</strong>
              <div>bomberiospro@gmail.com</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
            <span style={{ color: "#b71c1c", fontSize: 36 }}>
              {/* Phone icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.72 11.72 0 0 0 3.69.59 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.47.59 3.69a1 1 0 0 1-.24 1.01l-2.2 2.2Z" fill="currentColor"/></svg>
            </span>
            <div>
              <strong>Telefone</strong>
              <div>(49) 98900-1505</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
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
            padding: "32px 36px",
            minWidth: 340,
            flex: 1,
            boxShadow: "0 2px 8px #0001",
            maxWidth: 450,
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: 24 }}>Redes Sociais</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ color: "#b71c1c", fontSize: 36 }}>
              {/* Facebook icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M13.5 12.5h1.5l.25-2H13.5V9.5c0-.29.21-.5.5-.5h1V7.5h-1.5A2 2 0 0 0 11.5 9.5v1H10v2h1.5v5h2v-5Z" fill="#fff"/></svg>
            </span>
            <div>
              <strong>Facebook</strong>
              <div>bomberiospro.br</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ color: "#b71c1c", fontSize: 36 }}>
              {/* X (Twitter) icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M15.5 8.5l-7 7M8.5 8.5l7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <div>
              <strong>X</strong>
              <div>bomberiosprobra</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "#b71c1c", fontSize: 36 }}>
              {/* Instagram icon */}
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="5" fill="currentColor"/><circle cx="12" cy="12" r="4" fill="#fff"/><circle cx="17" cy="7" r="1" fill="#fff"/></svg>
            </span>
            <div>
              <strong>Instagram</strong>
              <div>bomberiospro.br</div>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}