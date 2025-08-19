from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect, text

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/bombereiros_pro'

CORS(app)

db = SQLAlchemy(app)


with app.app_context():
    inspector = inspect(db.engine)

    print(inspector.get_table_names(schema="bomb_bd"))

    columns = inspector.get_columns('msg', schema="bomb_bd")
    for col in columns:
        print(col['name'], col['type'])

    result = db.session.execute(text("SELECT * FROM bomb_bd.usuario LIMIT 5"))
    for row in result:
        print(row)

