import os

from flask import Flask
from flask_cors import CORS

from app.db import initialize_collection


def create_app():
    flask_app = Flask(__name__)
    CORS(flask_app)

    initialize_collection()

    return flask_app
