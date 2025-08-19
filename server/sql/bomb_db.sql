CREATE DATABASE bombereiros_pro WITH LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8' ENCODING = 'UTF-8' TEMPLATE template0;

CREATE SCHEMA bomb_bd;

CREATE TABLE bomb_bd.usuario (
    id SERIAL PRIMARY KEY,
    senha VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    telefone CHAR(11) NOT NULL,
    nome VARCHAR NOT NULL,
    cep INTEGER,
    rua VARCHAR,
    bairro VARCHAR,
    cidade VARCHAR,
    estado VARCHAR
);

CREATE TABLE bomb_bd.anuncios (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER,
    CONSTRAINT fk_usuario_id
    FOREIGN KEY (idUsuario)
    REFERENCES bomb_bd.usuario(id),
    status_anuncio INTEGER,
    nome VARCHAR,
    descricao VARCHAR,
    quantidade INTEGER,
    preco FLOAT,
    total FLOAT
);

CREATE TABLE bomb_bd.pedidos (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER,
    CONSTRAINT fk_usuario_id
    FOREIGN KEY (idUsuario)
    REFERENCES bomb_bd.usuario(id),
    status_pedido INTEGER,
    data DATE
);

CREATE TABLE bomb_bd.pedido_itens (
    idPedido INTEGER,
    CONSTRAINT fk_pedido_id
    FOREIGN KEY (idPedido)
    REFERENCES bomb_bd.pedidos(id),
    idAnuncio INTEGER,
    CONSTRAINT fk_anuncio_id
    FOREIGN KEY (idAnuncio)
    REFERENCES bomb_bd.anuncios(id),
    nome VARCHAR,
    quantidade INTEGER,
    preco FLOAT,
    subtotal FLOAT
);

CREATE TABLE bomb_bd.msg (
    id SERIAL PRIMARY KEY,
    idUsuario INTEGER,
    CONSTRAINT fk_usuario_id
    FOREIGN KEY (idUsuario)
    REFERENCES bomb_bd.usuario(id),
    mensagem VARCHAR
);

CREATE TABLE bomb_bd.images (
    id SERIAL PRIMARY KEY,
    imgText VARCHAR()
)

-- INSERT INTO bomb_bd.usuario (id, senha, email, nome, sobrenome, cep, rua, bairro, cidade, estado)
-- VALUES
--     (1, 'senhaForte123', 'daniveriato@yahoo.com', 'Danimar', 'Veriato', 89708-234, 'Rua Grêmio Ruim', 'Inter Gigante', 'Não Me Toque', 'Rio Grande do Sul');

-- INSERT INTO bomb_bd.anuncios (id, idUsuario, status_anuncio, nome, descricao, quantidade, preco, total)
-- VALUES
--     (1, 1, 3, 'Camisa Grêmio Umbro 2026', 'Com patch Série B 2026', 2, 89.25, 178.50);

-- INSERT INTO bomb_bd.pedidos (id, idUsuario, status_pedido, data)
-- VALUES
--     (1, 1, 3, '2026-05-14');

-- INSERT INTO bomb_bd.pedido_itens (idPedido, idAnuncio, nome, quantidade, preco, subtotal)
-- VALUES
--     (1, 1, 'Camisa Inter Adidas 2026', 2, 359.00, 718.00);

-- INSERT INTO bomb_bd.msg (id, idUsuario, mensagem)
-- VALUES
--     (1, 1, 'Linda camisa do meu time do coração, dale dale Inter');