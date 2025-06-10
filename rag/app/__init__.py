import os

from flask import Flask
from flask_cors import CORS


def create_app():
    flask_app = Flask(__name__)
    CORS(flask_app)

    return flask_app
