from flask import Flask, request, make_response, jsonify
from flask_cors import CORS

from .db import db


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://postgres:postgres@localhost:5432/pomelo-db"
)

import lib.routes

db.init_app(app)

with app.app_context():
    db.create_all()


# if __name__ == "__main__":
#     app.run()
