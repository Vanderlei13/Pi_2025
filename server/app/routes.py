from flask import request, jsonify
from flask import send_from_directory
from sqlalchemy import text
from app import db
import os
from werkzeug.utils import secure_filename

def init_routes(app):
    @app.route("/search_anuncios", methods=["GET"])
    def search_anuncios():
        termo = request.args.get("q", "").strip()
        try:
            if not termo:
                return jsonify({"status": "Sucesso", "data": []})

            result = db.session.execute(text("""
                SELECT
                    a.id,
                    a.nome,
                    a.descricao,
                    a.preco,
                    a.quantidade,
                    (
                        SELECT i.caminho
                        FROM bomb_bd.imagens i
                        WHERE i.id_anuncio = a.id
                        ORDER BY i.id ASC
                        LIMIT 1
                    ) AS imagem_principal
                FROM bomb_bd.anuncios a
                WHERE a.status_anuncio = 1
                AND (
                    LOWER(a.nome) LIKE :termo
                    OR LOWER(a.descricao) LIKE :termo
                    OR LOWER(a.tipo) LIKE :termo
                )
                ORDER BY a.id ASC
            """), {"termo": f"%{termo.lower()}%"}).mappings()

            anuncios = [dict(row) for row in result]
            return jsonify({"status": "Sucesso", "data": anuncios})

        except Exception as e:
            return jsonify({
                "status": "Falha",
                "message": "Erro na busca",
                "error": str(e)
            })

    @app.route("/add_usuario", methods=["POST"])
    def adicio_usuario():
        data = request.json
        try:
            db.session.execute(
                text("""
                    INSERT INTO bomb_bd.usuario (senha, email, nome, telefone)
                    VALUES (:senha, :email, :nome, :telefone)
                """),
                {
                    "senha": data.get("senha"),
                    "email": data.get("email"),
                    "nome": data.get("nome"),
                    "telefone": data.get("telefone")
                }
            )
            db.session.commit()
            return jsonify({"status": "Sucesso", "message": "Usuário adicionado"})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Usuário não adicionado", "error": str(e)})
   


    @app.route("/add_product", methods=["POST"])
    def adicio_produto():
        data = request.json
        try:
            result = db.session.execute(
                text("""
                    INSERT INTO bomb_bd.anuncios (status_anuncio, nome, tipo, descricao, quantidade, preco, total, id_usuario)
                    VALUES (:status_anuncio, :nome, :tipo, :descricao, :quantidade, :preco, :total, :id_usuario)
                    RETURNING id
                """),
                {
                    "status_anuncio": 1,
                    "nome": data.get("nome"),
                    "tipo": data.get("tipo"),
                    "quantidade": data.get("quantidade"),
                    "preco": data.get("preco"),
                    "descricao": data.get("descricao"),
                    "total": data.get("total"),
                    "id_usuario": data.get("id_usuario")  # <-- pega do frontend
                }
            )
            novo_id = result.scalar()
            db.session.commit()
            return jsonify({"status": "Sucesso", "message": "Anúncio adicionado", "id": novo_id})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Anúncio não adicionado", "error": str(e)})



    @app.route("/tornar_ativo", methods=["POST"])
    def switch_active():
        data = request.json
        try:
            result = db.session.execute(
                text(f"""
                    UPDATE bomb_bd.anuncios
                    SET status_anuncio = 1
                    WHERE id = {data.get("id")}
                """)
            )
            db.session.commit()
            return jsonify({"status": "Sucesso", "message": "Anúncio ativado"})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Anúncio não ativado", "error": str(e)})



    @app.route("/tornar_inativo", methods=["POST"])
    def switch_inactive():
        data = request.json
        try:
            result = db.session.execute(
                text(f"""
                    UPDATE bomb_bd.anuncios
                    SET status_anuncio = 2
                    WHERE id = {data.get("id")}
                """)
            )
            db.session.commit()
            return jsonify({"status": "Sucesso", "message": "Anúncio inativado"})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Anúncio não inativado", "error": str(e)})




    @app.route("/login", methods=["POST"])
    def login():
        data = request.get_json()
        email = data.get("email")
        senha = data.get("senha")

        if not email or not senha:
            return jsonify({"status": "Falha", "message": "Preencha email e senha"}), 400

        try:
            result = db.session.execute(
                text("SELECT id, email, nome FROM bomb_bd.usuario WHERE email = :email AND senha = :senha"),
                {"email": email, "senha": senha}
            ).fetchone()

            if result:
                return jsonify({
                    "status": "Sucesso",
                    "message": "Logado com sucesso",
                    "id_usuario": result.id,
                    "nome_usuario": result.nome
                })
            else:
                return jsonify({"status": "Falha", "message": "Email ou senha incorretos"}), 401

        except Exception as e:
            return jsonify({"status": "Falha", "message": "Erro no login", "error": str(e)}), 500

    @app.route("/usuario/<int:id_usuario>", methods=["GET"])
    def get_usuario(id_usuario):
        try:
            result = db.session.execute(
                text("SELECT id, nome, email, telefone FROM bomb_bd.usuario WHERE id = :id_usuario"),
                {"id_usuario": id_usuario}
            ).fetchone()

            if result:
                return jsonify({
                    "status": "Sucesso",
                    "data": {
                        "id": result.id,
                        "nome": result.nome,
                        "email": result.email,
                        "telefone": result.telefone
                    }
                })
            else:
                return jsonify({"status": "Falha", "message": "Usuário não encontrado"}), 404

        except Exception as e:
            return jsonify({"status": "Falha", "message": "Erro ao buscar usuário", "error": str(e)}), 500

# GET


    @app.route("/anuncios_ativos", methods=["GET"])
    def show_anuncios_ativos():
        try:
            result = db.session.execute(
                text("""
                    SELECT id, nome, preco, tipo, descricao, quantidade, status_anuncio FROM bomb_bd.anuncios WHERE status_anuncio = 1
                    ORDER BY id ASC
                """)
            )
            anuncios = [dict(row) for row in result.mappings()]
            return jsonify({"status": "Sucesso", "data": anuncios})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Não ta showing", "error": str(e)})
        

    @app.route("/anuncios_inativos", methods=["GET"])
    def show_anuncios_inativos():
        try:
            result = db.session.execute(
                text("""
                    SELECT id, nome, preco, tipo, descricao, quantidade, status_anuncio FROM bomb_bd.anuncios WHERE status_anuncio = 2
                    ORDER BY id ASC
                """)
            )
            anuncios = [dict(row) for row in result.mappings()]
            return jsonify({"status": "Sucesso", "data": anuncios})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Não ta showing", "error": str(e)})
    

    
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # cria se não existir

    @app.route("/upload_imagens/<int:id_produto>", methods=["POST"])
    def upload_imagens(id_produto):
        if "imagens" not in request.files:
            return jsonify({"status": "Falha", "message": "Nenhum arquivo enviado"}), 400

        # agora esperamos que o frontend envie também o id_usuario no form-data
        id_usuario = request.form.get("id_usuario")
        if not id_usuario:
            return jsonify({"status": "Falha", "message": "id_usuario é obrigatório"}), 400

        arquivos = request.files.getlist("imagens")
        caminhos_salvos = []

        for arquivo in arquivos:
            filename = secure_filename(arquivo.filename)
            filename_salvo = f"{id_produto}_{filename}"
            caminho = os.path.join(UPLOAD_FOLDER, filename_salvo)
            arquivo.save(caminho)
            caminhos_salvos.append(filename_salvo)

            # agora insere também o id_usuario
            db.session.execute(
                text("""
                    INSERT INTO bomb_bd.imagens (id_anuncio, id_usuario, caminho) 
                    VALUES (:id_anuncio, :id_usuario, :caminho)
                """),
                {"id_anuncio": id_produto, "id_usuario": id_usuario, "caminho": filename_salvo}
            )

        db.session.commit()

        return jsonify({"status": "Sucesso", "message": "Imagens salvas", "caminhos": caminhos_salvos})

    @app.route("/carregar_imagem", methods=["GET", "POST"])
    def carregar_imagem():
        data = request.json
        try:
            result = db.session.execute(
                text("""
                    SELECT caminho from bomb_bd.imagens WHERE id = :id_imagem
                """),
                {"id_imagem": data["id"]}
            )
            images = [dict(row) for row in result.mappings()]
            return jsonify({"status": "Sucesso", "data": images})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Não ta showing", "error": str(e)})



    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(UPLOAD_FOLDER, filename)


    @app.route("/uploads_info", methods=["GET"])
    def uploads_info():
        result = db.session.execute(
            text("SELECT id_anuncio, caminho FROM bomb_bd.imagens ORDER BY id ASC")
        )
        dados = [dict(row) for row in result.mappings()]
        return jsonify(dados)
        
    # Rotas para o carrinho de compras
    @app.route("/cart/add", methods=["POST"])
    def add_to_cart():
        data = request.json
        try:
            # Verificar se o item já existe no carrinho
            existing_item = db.session.execute(
                text("""
                    SELECT id, quantidade FROM bomb_bd.carrinho 
                    WHERE id_usuario = :id_usuario AND id_anuncio = :id_anuncio
                """),
                {
                    "id_usuario": data.get("id_usuario"),
                    "id_anuncio": data.get("id_anuncio")
                }
            ).fetchone()
            
            if existing_item:
                # Atualizar a quantidade
                nova_quantidade = existing_item.quantidade + data.get("quantidade", 1)
                if nova_quantidade <= 0:
                    # Se a quantidade for zero ou negativa, remover o item
                    db.session.execute(
                        text("DELETE FROM bomb_bd.carrinho WHERE id = :id"),
                        {"id": existing_item.id}
                    )
                else:
                    # Atualizar a quantidade
                    db.session.execute(
                        text("""
                            UPDATE bomb_bd.carrinho 
                            SET quantidade = :quantidade 
                            WHERE id = :id
                        """),
                        {
                            "quantidade": nova_quantidade,
                            "id": existing_item.id
                        }
                    )
            else:
                # Adicionar novo item ao carrinho
                db.session.execute(
                    text("""
                        INSERT INTO bomb_bd.carrinho (id_usuario, id_anuncio, quantidade)
                        VALUES (:id_usuario, :id_anuncio, :quantidade)
                    """),
                    {
                        "id_usuario": data.get("id_usuario"),
                        "id_anuncio": data.get("id_anuncio"),
                        "quantidade": data.get("quantidade", 1)
                    }
                )
                
            db.session.commit()
            return jsonify({"status": "Sucesso", "message": "Item adicionado ao carrinho"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"status": "Falha", "message": "Erro ao adicionar item ao carrinho", "error": str(e)}), 500
    
    @app.route("/cart/<int:id_usuario>", methods=["GET"])
    def get_cart(id_usuario):
        try:
            result = db.session.execute(
                text("""
                    SELECT c.id, c.id_anuncio, c.quantidade, a.nome, a.preco, a.tipo, 
                           (c.quantidade * a.preco) as subtotal,
                           (SELECT i.caminho FROM bomb_bd.imagens i 
                            WHERE i.id_anuncio = a.id ORDER BY i.id ASC LIMIT 1) as imagem
                    FROM bomb_bd.carrinho c
                    JOIN bomb_bd.anuncios a ON c.id_anuncio = a.id
                    WHERE c.id_usuario = :id_usuario
                """),
                {"id_usuario": id_usuario}
            ).mappings()
            
            cart_items = [dict(row) for row in result]
            return jsonify(cart_items)
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Erro ao buscar carrinho", "error": str(e)}), 500
    
    @app.route("/cart/remove/<int:item_id>", methods=["DELETE"])
    def remove_from_cart(item_id):
        try:
            db.session.execute(
                text("DELETE FROM bomb_bd.carrinho WHERE id = :id"),
                {"id": item_id}
            )
            db.session.commit()
            return jsonify({"status": "Sucesso", "message": "Item removido do carrinho"})
        except Exception as e:
            db.session.rollback()
            return jsonify({"status": "Falha", "message": "Erro ao remover item do carrinho", "error": str(e)}), 500