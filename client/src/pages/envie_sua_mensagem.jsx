import React, { useState } from "react";

export default function EnvieSuaMensagem() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        mensagem: ""
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
                background: "#fff",
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
                        color: "#fff",
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
                        style={{
                            marginBottom: "32px",
                            fontSize: "2.6rem",
                            fontWeight: "bold",
                        }}
                    >
                        Envie sua mensagem
                    </h2>
                    <svg
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
                            stroke="#fff"
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
                        }}
                    >
                        Enviar mensagem
                    </button>
                </form>
            </div>
            {/* CSS responsivo */}
            <style>
                {`
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