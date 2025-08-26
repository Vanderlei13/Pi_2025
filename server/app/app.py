from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    upload_folder = os.path.join(os.getcwd(), "uploads")
    os.makedirs(upload_folder, exist_ok=True)
    app.config["upload_folder"] = upload_folder
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/bombereiros_pro'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)

    db.init_app(app)

    from app import routes
    routes.init_routes(app)

    with app.app_context():
        inspector = inspect(db.engine)
        print("Tabelas no schema bomb_bd:", inspector.get_table_names(schema="bomb_bd"))

    return app
