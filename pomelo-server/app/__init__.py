import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from app.extensions import db


load_dotenv()
db_url = os.getenv("DATABASE_URL")


def create_app():
    flask_app = Flask(__name__)
    CORS(flask_app)
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = (
        "postgresql://postgres:postgres@localhost:5432/pomelo-db"
    )

    db.init_app(flask_app)

    with flask_app.app_context():
        from app.routes.ingredients import ingredients_bp
        from app.routes.stores import stores_bp
        from app.routes.shopping_list import shopping_list_bp
        from app.routes.recipes import recipes_bp

        flask_app.register_blueprint(ingredients_bp)
        flask_app.register_blueprint(stores_bp)
        flask_app.register_blueprint(shopping_list_bp)
        flask_app.register_blueprint(recipes_bp)
        db.create_all()

    return flask_app
