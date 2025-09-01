CREATE DATABASE bombereiros_pro 
    WITH LC_COLLATE = 'pt_BR.UTF-8' 
         LC_CTYPE = 'pt_BR.UTF-8' 
         ENCODING = 'UTF-8' 
         TEMPLATE template0;

\c bombereiros_pro

CREATE SCHEMA bomb_bd;
DROP SCHEMA public;

CREATE TABLE bomb_bd.usuario (
    id SERIAL PRIMARY KEY,
    senha VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    telefone CHAR(11) NOT NULL UNIQUE,
    nome VARCHAR NOT NULL,
    cep INTEGER,
    rua VARCHAR,
    bairro VARCHAR,
    cidade VARCHAR,
    estado VARCHAR
);

CREATE TABLE bomb_bd.anuncios (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER,
    CONSTRAINT fk_anuncios_usuario FOREIGN KEY (id_usuario)
        REFERENCES bomb_bd.usuario(id),
    status_anuncio INTEGER,
    nome VARCHAR NOT NULL,
    tipo VARCHAR,
    descricao VARCHAR,
    quantidade INTEGER NOT NULL,
    preco FLOAT NOT NULL,
    total FLOAT
);

CREATE TABLE bomb_bd.imagens (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL REFERENCES bomb_bd.usuario(id),
    id_anuncio INTEGER NOT NULL REFERENCES bomb_bd.anuncios(id),
    caminho VARCHAR NOT NULL
);

CREATE TABLE bomb_bd.pedidos (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER,  
    CONSTRAINT fk_pedidos_usuario FOREIGN KEY (id_usuario)
        REFERENCES bomb_bd.usuario(id),
    status_pedido INTEGER,
    data DATE
);

CREATE TABLE bomb_bd.pedido_itens (
    id INTEGER,
    id_pedido INTEGER,
    CONSTRAINT fk_pedido FOREIGN KEY (id_pedido)
        REFERENCES bomb_bd.pedidos(id),
    id_anuncio INTEGER,
    CONSTRAINT fk_anuncio FOREIGN KEY (id_anuncio)
        REFERENCES bomb_bd.anuncios(id),
    nome VARCHAR,
    quantidade INTEGER,
    preco FLOAT,
    subtotal FLOAT
);

CREATE TABLE bomb_bd.msg (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER,
    CONSTRAINT fk_msg_usuario FOREIGN KEY (id_usuario)
        REFERENCES bomb_bd.usuario(id),
    mensagem VARCHAR NOT NULL
);

CREATE TABLE bomb_bd.carrinho (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    CONSTRAINT fk_carrinho_usuario FOREIGN KEY (id_usuario)
        REFERENCES bomb_bd.usuario(id),
    id_anuncio INTEGER NOT NULL,
    CONSTRAINT fk_carrinho_anuncio FOREIGN KEY (id_anuncio)
        REFERENCES bomb_bd.anuncios(id),
    quantidade INTEGER NOT NULL DEFAULT 1,
    data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

