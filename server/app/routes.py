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
            result = db.session.execute(
                text("""
                    SELECT id, nome, descricao, preco, img, quantidade
                    FROM bomb_bd.anuncios
                    WHERE status_anuncio = 1
                    AND (
                        LOWER(nome) LIKE :termo OR
                        LOWER(descricao) LIKE :termo OR
                        LOWER(tipo) LIKE :termo
                    )
                    ORDER BY id ASC
                """),
                {"termo": f"%{termo.lower()}%"}
            )
            anuncios = [dict(row) for row in result.mappings()]
            return jsonify({"status": "Sucesso", "data": anuncios})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Erro na busca", "error": str(e)})

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
                    INSERT INTO bomb_bd.anuncios (status_anuncio, nome, tipo, descricao, quantidade, preco, total)
                    VALUES (:status_anuncio, :nome, :tipo, :descricao, :quantidade, :preco, :total)
                    RETURNING id
                """),
                {
                    "status_anuncio": 1,
                    "nome": data.get("nome"),
                    "tipo": data.get("tipo"),
                    "quantidade": data.get("quantidade"),
                    "preco": data.get("preco"),
                    "descricao": data.get("descricao"),
                    "total": data.get("total")
                }
            )
            novo_id = result.scalar()  # agora retorna o ID real
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




    @app.route("/login", methods=["GET", "POST"])
    def login():
        data = request.get_json()
        email = data.get("email")
        senha = data.get("senha")

        if not email or not senha:
            return jsonify({"status": "Falha", "message": "Preencha email e senha"}), 400

        try:
            result = db.session.execute(
                text("SELECT id, email FROM bomb_bd.usuario WHERE email = :email AND senha = :senha"),
                {"email": email, "senha": senha}
            ).fetchone()

            if result:
                return jsonify({"status": "Sucesso", "message": "Logado com sucesso"})
            else:
                return jsonify({"status": "Falha", "message": "Email ou senha incorretos"}), 401

        except Exception as e:
            return jsonify({"status": "Falha", "message": "Erro no login", "error": str(e)}), 500


# GET


    @app.route("/anuncios_ativos", methods=["GET"])
    def show_anuncios_ativos():
        try:
            result = db.session.execute(
                text("""
                    SELECT id, nome, preco, tipo, descricao, quantidade, status_anuncio, img FROM bomb_bd.anuncios WHERE status_anuncio = 1
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

        arquivos = request.files.getlist("imagens")
        caminhos_salvos = []

        for idx, arquivo in enumerate(arquivos):
            filename = secure_filename(arquivo.filename)
            filename_salvo = f"{id_produto}_{filename}"
            caminho = os.path.join(UPLOAD_FOLDER, filename_salvo)
            arquivo.save(caminho)
            caminhos_salvos.append(filename_salvo)

            if idx == 0:
                db.session.execute(
                    text("UPDATE bomb_bd.anuncios SET img = :img WHERE id = :id"),
                    {"img": filename_salvo, "id": id_produto}
                )
                db.session.commit()

        return jsonify({"status": "Sucesso", "message": "Imagens salvas", "caminhos": caminhos_salvos})

    

    @app.route('/uploads/<filename>')
    def uploaded_file(filename):
        return send_from_directory(UPLOAD_FOLDER, filename)
        