import React, { useRef, useState } from "react";

// const addProduct = async () => {

// }


export default function DescreverProduto() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState([]);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  return (
    <div style={{ background: "#e9e7e7", minHeight: "100vh", padding: "40px 0" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Adicionar imagens */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "48px 0",
            minWidth: 0,
            minHeight: 420,
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px #0001",
            cursor: "pointer",
            position: "relative",
            transition: "box-shadow 0.3s, transform 0.3s",
            height: "100%",
          }}
          className="upload-box"
          onClick={handleBoxClick}
        >
          {preview.length === 0 ? (
            <>
              <div style={{ fontSize: "2.5rem", marginBottom: 32 }}>Adicionar imagens</div>
              <div style={{ fontSize: 80, color: "#888" }}>+</div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: "24px",
              }}
            >
              {preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "340px",
                    objectFit: "contain",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    background: "#fafafa",
                    display: "block",
                  }}
                />
              ))}
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        {/* Formulário */}
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "32px 36px",
            minWidth: 0,
            maxWidth: "100%",
            boxShadow: "0 2px 8px #0001",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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

      {/* Animação leve ao passar o mouse */}
      <style>
        {`
          .upload-box:hover {
            box-shadow: 0 6px 24px #b71c1c44;
            transform: translateY(-4px) scale(1.03);
          }
          @media (max-width: 900px) {
            div[style*="display: grid"] {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
              max-width: 98vw !important;
            }
          }
        `}
      </style>
    </div>
  );
}