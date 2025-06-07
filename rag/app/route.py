from flask import request

from app import app


@app.get("/")
def get_suggestion():
    input_string = request.data
