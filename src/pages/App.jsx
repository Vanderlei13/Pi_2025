import Header from "../componentes/header.jsx";
import Carrossel from "../componentes/Carousel.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Contato from "./contato.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Carrossel />} />
                {/* <Route path="/contato" element={<Contato />}/> */}
            </Routes>
        </BrowserRouter>
    );
}
