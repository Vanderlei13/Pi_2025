import React from "react";

const produtos = [
  {
    nome: "Calça civil",
    descricao: "Proteção, mobilidade e durabilidade",
    preco: "R$ 350,00",
    imagem: "/imagens/calca.png"
  },
  {
    nome: "Jaqueta civil",
    descricao: "Proteção, mobilidade e durabilidade",
    preco: "R$ 350,00",
    imagem: "/imagens/jaqueta.png"
  },
  {
    nome: "Bota civil",
    descricao: "Proteção, mobilidade e durabilidade",
    preco: "R$ 350,00",
    imagem: "/imagens/bota.png"
  }
];

export default function AnunciosInativos() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-red-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <input
            type="text"
            placeholder="Buscar produtos"
            className="px-2 py-1 rounded"
          />
        </div>
        <nav className="flex gap-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Locação</a>
          <a href="#" className="hover:underline">Anúncios</a>
          <a href="#" className="hover:underline">Contato</a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="bg-white text-red-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">EM</div>
          <span>Emanuel</span>
          <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24"><path d="M7 4h-2l-2 6v2h1v10h18v-10h1v-2l-2-6h-2"/></svg>
        </div>
      </header>

      <main className="py-10 px-4 text-center">
        <h1 className="text-3xl font-semibold mb-10">Seus Anúncios Inativos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {produtos.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-lg w-72">
              <div className="bg-gradient-to-b from-red-800 to-black p-4 rounded-t-xl">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="h-48 mx-auto object-contain"
                />
              </div>
              <div className="bg-black text-white py-4 px-2 rounded-b-xl">
                <h2 className="text-xl font-bold mb-1">{item.nome}</h2>
                <p className="text-sm mb-2">{item.descricao}</p>
                <p className="font-semibold mb-4">{item.preco}</p>
                <button className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded text-white">
                  Ver detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
