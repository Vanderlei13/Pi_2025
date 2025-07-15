export default function Contato() {
  return (
    <section className="bg-gradient-to-b from-red-600 to-black text-white py-12">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Entre em Contato</h2>
        <p className="mt-4 text-lg">Estamos prontos pra renovar seus equipamentos.</p>
      </div>

      <div className="bg-gray-100 text-black mt-10 px-6 md:px-20 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-t-3xl">
        {/* Informações de Contato */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-6">Informações de contato</h3>

          <div className="mb-5">
            <strong className="block">E-mail</strong>
            <p>bomberiospro@gmail.com</p>
          </div>

          <div className="mb-5">
            <strong className="block">Telefone</strong>
            <p>(49) 98900-1505</p>
          </div>

          <div>
            <strong className="block">Endereço</strong>
            <p>Concórdia, SC</p>
          </div>
        </div>

        {/* Redes Sociais */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h3 className="text-xl font-semibold mb-6">Redes sociais</h3>

          <div className="mb-5">
            <strong className="block">Facebook</strong>
            <p>bomberiospro.br</p>
          </div>

          <div className="mb-5">
            <strong className="block">X (antigo Twitter)</strong>
            <p>bomberiosprobra</p>
          </div>

          <div>
            <strong className="block">Instagram</strong>
            <p>bomberiospro.br</p>
          </div>
        </div>
      </div>
    </section>
  );
}
