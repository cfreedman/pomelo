from datetime import datetime
import click
import os

from flask import current_app, g
from dotenv import load_dotenv
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

load_dotenv()
db_url = os.getenv("DATABASE_URL")


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


ingredients_recipes_bridge = db.Table(
    "ingredients_recipes_bridge",
    db.Column("recipe_id", Integer, ForeignKey("recipes.id")),
    db.Column("ingredient_id", Integer, ForeignKey("ingredients.id")),
    db.Column("quantity", Integer),
)


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[int] = mapped_column(String(50), nullable=False)
    units: Mapped[str] = mapped_column(String(20))
    # preferred_store: Mapped[int] = mapped_column(ForeignKey("stores.id"))

    def __repr__(self) -> str:
        return f"Ingredient id={self.id}, name={self.name}"


class Recipe(db.Model):
    __tablename__ = "recipes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[int] = mapped_column(String(50))
    # servings: Mapped[int] = mapped_column(Integer)
    ingredients = relationship(
        "Ingredient", secondary=ingredients_recipes_bridge, backref="associated_recipes"
    )

    def __repr__(self) -> str:
        return f"Recipe id={self.id}, name={self.name}"


# class IngredientRecipeBridge(db.Model):
#     __tablename__ = "ingredient_recipe_bridge"

#     id: Mapped[int] = mapped_column(Integer, primary_key=True)
#     recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), nullable=False)
#     ingredient_id: Mapped[int] = mapped_column(
#         ForeignKey("ingredients.id"), nullable=False
#     )
#     quantity: Mapped[int] = mapped_column(Integer, nullable=False)

#     def __repr__(self) -> str:
#         return f"Ingredient id={self.ingredient_id} appears in recipe {self.recipe_id} with quantity {self.quantity}"


class Stores(db.Model):
    __tablename__ = "stores"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    address: Mapped[str] = mapped_column(String(75))

    def __repr__(self) -> str:
        return f"Store {self.name} located at {self.address}"


# def init_db():
#     db = get_db()


# @click.command("init-db")
# def init_db_command():
#     init_db()
#     click.echo("Initialized database...")


# def get_db():
#     if "db" not in g:
#         g.db = psycopg2.connect(db_url)

#     return g.db


# def close_db():
#     pass


# def init_app(app):
#     app.teardown_appcontext(close_db)
#     app.cli.add_command(init_db_command)
