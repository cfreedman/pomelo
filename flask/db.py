from datetime import datetime
import click

from flask import current_app, g


def init_db():
    db = get_db()


@click.command("init-db")
def init_db_command():
    init_db()
    click.echo("Initialized database...")


def get_db():
    pass


def close_db():
    pass


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
