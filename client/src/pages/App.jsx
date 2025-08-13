import Header from "../componentes/header.jsx";
// import Carrossel from "../componentes/Carousel.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contato from "./contato.jsx";
// import Banner from "./banner.jsx";
import Anuncios_ativos from "./anuncios_ativos.jsx";
import Anuncios_inativos from "./anuncios_inativos.jsx";
import Seus_anuncios from "./seus_anuncios.jsx";
import HomePage from "./HomePage.jsx";
import DescreverProduto from "./descrever_produto.jsx";
import Carrinho_de_compras from "./carrinho_de_compras.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* <Route path="/" element={<Carrossel />} /> */}
                <Route path="/contato" element={<Contato />}/>
                <Route path="/anuncios_ativos" element={< Anuncios_ativos />}/>
                <Route path="/anuncios_inativos" element={< Anuncios_inativos />}/>
                <Route path="/seus_anuncios" element={<Seus_anuncios />}/>
                <Route path="/" element={<HomePage />} />
                <Route path="/descrever_produto" element={<DescreverProduto />}/>
                <Route path="/carrinho_de_compras" element={<Carrinho_de_compras/>}/>
            </Routes>
        </BrowserRouter>
    );
}
