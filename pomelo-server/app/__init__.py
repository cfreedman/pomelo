import os

from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_cors import CORS

from app.models import Base


load_dotenv()
db_url = os.getenv("DATABASE_URL")
db = SQLAlchemy(model_class=Base)


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["SQLALCHEMY_DATABASE_URI"] = (
        "postgresql://postgres:postgres@localhost:5432/pomelo-db"
    )

    db.init_app(app)

    with app.app_context():
        import app.routes

        db.create_all()

    return app
