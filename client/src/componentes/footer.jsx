import "../style/main.css";

function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(to bottom, #000000, #b91c1c)",
      color: "white",
      padding: "20px",
      textAlign: "center",
      width: "100%",
      marginTop: "auto"
    }}>
      <p style={{ margin: 0, fontWeight: "bold" }}>© 2025 BombeirosPro - Todos os direitos reservados</p>
      <p style={{ margin: "10px 0 0 0", fontSize: "0.9rem" }}>Desenvolvido por Emanuel</p>
    </footer>
  );
}

export default Footer;
