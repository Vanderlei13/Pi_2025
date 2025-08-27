import React, { useRef, useState } from "react";
import axios from "axios";

export default function DescreverProduto() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [valor, setValor] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const postProduto = async () => {
    const id_usuario = localStorage.getItem("id_usuario");
    if (!id_usuario) {
      alert("Você precisa estar logado para anunciar.");
      return;
    }

    const formData = new FormData();
    formData.append("id_usuario", id_usuario);
    selectedFiles.forEach(file => {
      console.log(file);
      formData.append("imagens", file);
    });

    console.log(nome)
    console.log(tipo)
    console.log(quantidade)
    console.log(preco)
    console.log(descricao)
    console.log(valor)

    try {
      const res = await axios.post("http://localhost:5000/add_product", {
        nome,
        tipo,
        quantidade,
        preco: preco,
        descricao,
        total: preco * quantidade,
        id_usuario
      });

      const idProduto = res.data.id;
      console.lo

      if (selectedFiles.length > 0) {
        await axios.post(`http://localhost:5000/upload_imagens/${idProduto}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      console.log(res.data);
      alert("Anúncio adicionado com sucesso!");
    } catch (error) {
      if (error.response) {
        console.error("Erro do backend:", error.response.data);
        alert("Erro: " + JSON.stringify(error.response.data));
      } else {
        console.error("Erro:", error.message);
        alert("Erro: " + error.message);
      }
    }
  }

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
    setSelectedFiles(files);
  };

  // Formata o valor para R$ x,xx
  const handleValorChange = (e) => {
    let v = e.target.value.replace(/\D/g, "");
    v = (Number(v) / 100).toFixed(2);
    setValor(v === "0.00" ? "" : `R$ ${v.replace(".", ",")}`);
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
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: 340,
                gap: 16,
                padding: "24px",
              }}
            >
              {preview.map((src, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fafafa",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    width: "220px",
                    height: "220px",
                    margin: 4,
                  }}
                >
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    style={{
                      maxWidth: "90%",
                      maxHeight: "90%",
                      objectFit: "contain",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              let raw = e.target.value.replace(/\D/g, "");
              let num = (Number(raw) / 100).toFixed(2);
              setValor(num === "0.00" ? "" : `R$ ${num.replace(".", ",")}`);
              setPreco(Number(num));
            }}
            onClick={handleFileChange}
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
                value={nome}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #888",
                  marginTop: 4,
                  fontSize: 16,
                  outline: "none",
                }}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Tipo do produto</label>
              <input
                type="text"
                value={tipo}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #888",
                  marginTop: 4,
                  fontSize: 16,
                  outline: "none",
                }}
                onChange={(e) => setTipo(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Quantidade</label>
              <input
                type="number"
                min={1}
                value={quantidade}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #888",
                  marginTop: 4,
                  fontSize: 16,
                  outline: "none",
                }}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Valor</label>
              <input
                type="text"
                value={preco}
                placeholder="R$ 0,00"
                maxLength={15}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 10,
                  border: "1px solid #888",
                  marginTop: 4,
                  fontSize: 16,
                  outline: "none",
                }}
                onChange={(e) => {
                  handleValorChange(e);
                  setPreco(e.target.value);
                }}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontWeight: 500 }}>Descrição</label>
              <textarea
                rows={4}
                value={descricao}
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
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </form>
          <button
            type="submit"
            onClick={postProduto}
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