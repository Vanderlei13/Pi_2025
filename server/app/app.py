from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:Gustav0br07?psql@localhost/bombereiros_pro'

db = SQLAlchemy(app)

from sqlalchemy import inspect, text

eu = {
"id": 2,
"senha": "senhafrraca",
"email": "gusborsatto@maigl.com",
"nome": "Gustavo",
"sobrenome": "Borsatto Ritter",
"cep": 890708072,
"rua": "Canadá",
"bairro": "Guilherme Reich",
"cidade": "Concórdia",
"estado": "Santa Catarina"
}


with app.app_context():
    inspector = inspect(db.engine)

    print(inspector.get_table_names(schema="bomb_bd"))

    columns = inspector.get_columns('msg', schema="bomb_bd")
    for col in columns:
        print(col['name'], col['type'])

    # db.session.execute(text("""
    #     INSERT INTO bomb_bd.usuario 
    #     (id, senha, email, nome, sobrenome, cep, rua, bairro, cidade, estado) 
    #     VALUES (:id, :senha, :email, :nome, :sobrenome, :cep, :rua, :bairro, :cidade, :estado)
    # """), eu)
    # db.session.commit()
    result = db.session.execute(text("SELECT * FROM bomb_bd.usuario LIMIT 5"))
    for row in result:
        print(row)


@app.route("/add_usuario", methods=["POST"])
def adicio_usuario():
    data = request.json()
    try:
        db.session.execute(
            text("""
                INSERT INTO bomb_bd.usuario 
                (id, senha, email, nome, sobrenome, cep, rua, bairro, cidade, estado)
                VALUES (:id, :senha, :email, :nome, :sobrenome, :cep, :rua, :bairro, :cidade, :estado)
            """),
            data
        )
        db.session.commit()
        return jsonify({"status": "deu boa", "message": "Adicionemo o gurizao do rs!"})
    except:
        return jsonify({"status": "faz direito", "message": "nao deu boa pia"})