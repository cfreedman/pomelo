from datetime import datetime
import click
import os

from flask import current_app, g
from dotenv import load_dotenv
import psycopg2

load_dotenv()
db_url = os.getenv("DATABASE_URL")


def init_db():
    db = get_db()


@click.command("init-db")
def init_db_command():
    init_db()
    click.echo("Initialized database...")


def get_db():
    if "db" not in g:
        g.db = psycopg2.connect(db_url)

    return g.db


def close_db():
    pass


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
