import React from "react";

export default function DescreverProduto() {
  return (
    <div style={{ background: "#e9e7e7", minHeight: "100vh", padding: "40px 0" }}>
      <div
        style={{
          display: "flex",
          gap: 32,
          justifyContent: "center",
          alignItems: "flex-start",
          maxWidth: 1200,
          margin: "0 auto",
          flexWrap: "wrap",
        }}
      >
        {/* Adicionar imagens */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "48px 0",
            minWidth: 420,
            minHeight: 420,
            flex: 1,
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px #0001",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: 32 }}>Adicionar imagens</div>
          <div style={{ fontSize: 80, color: "#888" }}>+</div>
        </div>

        {/* Formulário */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "32px 36px",
            minWidth: 420,
            flex: 1,
            maxWidth: 520,
            boxShadow: "0 2px 8px #0001",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: 24 }}>Descreva seu produto</h2>
          <form>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Nome do produto</label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #888",
                  marginTop: 4,
                  fontSize: 16,
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Tipo do produto</label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #888",
                  marginTop: 4,
                  fontSize: 16,
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Localização</label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #888",
                  marginTop: 4,
                  fontSize: 16,
                  outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontWeight: 500 }}>Descrição</label>
              <textarea
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #888",
                  marginTop: 4,
                  fontSize: 16,
                  outline: "none",
                  resize: "none",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#b71c1c",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 0",
                fontSize: 18,
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: 8,
              }}
            >
              Anunciar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}