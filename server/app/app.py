from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/bombereiros_pro'

CORS(app)

db = SQLAlchemy(app)

from sqlalchemy import inspect, text

with app.app_context():
    inspector = inspect(db.engine)

    print(inspector.get_table_names(schema="bomb_bd"))

    columns = inspector.get_columns('msg', schema="bomb_bd")
    for col in columns:
        print(col['name'], col['type'])

    result = db.session.execute(text("SELECT * FROM bomb_bd.usuario LIMIT 5"))
    for row in result:
        print(row)


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
        return jsonify({"status": "deu boa", "message": "Adicionemo o gurizao do rs!"})
    except Exception as e:
        print("Erro:", e)
        return jsonify({"status": "faz direito", "message": "nao deu boa pia", "error": str(e)})

# @app.route("")