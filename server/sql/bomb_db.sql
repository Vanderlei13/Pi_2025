CREATE DATABASE bombereiros_pro WITH LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8' ENCODING = 'UTF-8' TEMPLATE template0;

\c bombereiros_pro

CREATE SCHEMA bomb_bd;
DROP SCHEMA public;

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
    nome VARCHAR NOT NULL,
    img BYTEA,
    tipo VARCHAR,
    descricao VARCHAR,
    quantidade INTEGER NOT NULL,
    preco FLOAT NOT NULL,
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
    mensagem VARCHAR NOT NULL
);