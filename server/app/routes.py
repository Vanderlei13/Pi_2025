from flask import request, jsonify
from sqlalchemy import text
from app import db, app

def init_routes(app):
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
            db.session.execute(
                text("""
                    INSERT INTO bomb_bd.anuncios (status_anuncio, nome, tipo, descricao, quantidade, preco, total)
                    VALUES (:status_anuncio, :nome, :tipo, :descricao, :quantidade, :preco, :total)
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
            db.session.commit()
            return jsonify({"status": "Sucesso", "message": "Anúncio adicionado"})
        except Exception as e:
            return jsonify({"status": "Falha", "message": "Anúncio não adicionado", "error": str(e)})
    




