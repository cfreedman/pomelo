from datetime import datetime
from typing import List
import click
import os


from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

load_dotenv()
db_url = os.getenv("DATABASE_URL")


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    units: Mapped[str] = mapped_column(String(20), nullable=True)
    # preferred_store: Mapped[int] = mapped_column(ForeignKey("stores.id"))

    # Field to select list of ingredient-recipe-bridge rows for data stored there
    recipe_associations: Mapped[List["IngredientRecipeBridge"]] = relationship(
        back_populates="ingredient"
    )

    def __repr__(self) -> str:
        return f"Ingredient id={self.id}, name={self.name}"


class Tag(db.Model):
    __tablename__ = "tags"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))

    recipe_associations: Mapped[List["TagRecipeBridge"]] = relationship(
        back_populates="tag"
    )

    def __repr__(self) -> str:
        return f"Tag id={self.id}, name={self.name}"


class Recipe(db.Model):
    __tablename__ = "recipes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    cuisine: Mapped[str] = mapped_column(String(100), nullable=True)
    meal_type: Mapped[str] = mapped_column(String(50), nullable=True)
    servings: Mapped[int] = mapped_column(Integer)

    # Field to select list of ingredient-recipe-bridge rows for data stored there
    ingredient_associations: Mapped[List["IngredientRecipeBridge"]] = relationship(
        back_populates="recipe"
    )
    tag_associations: Mapped[List["TagRecipeBridge"]] = relationship(
        back_populates="recipe"
    )

    def __repr__(self) -> str:
        return f"Recipe id={self.id}, name={self.name}"


class IngredientRecipeBridge(db.Model):
    __tablename__ = "ingredient_recipe_bridge"

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), primary_key=True)
    ingredient_id: Mapped[int] = mapped_column(
        ForeignKey("ingredients.id"), primary_key=True
    )
    quantity: Mapped[int] = mapped_column(Integer)
    recipe = relationship("Recipe", back_populates="ingredient_associations")
    ingredient = relationship("Ingredient", back_populates="recipe_associations")

    def __repr__(self) -> str:
        return f"Ingredient id={self.ingredient_id} appears in recipe {self.recipe_id} with quantity {self.quantity}"


class TagRecipeBridge(db.Model):
    __tablename__ = "tag_recipe_bridge"

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"), primary_key=True)
    recipe = relationship("Recipe", back_populates="tag_associations")
    tag = relationship("Tag", back_populates="recipe_associations")

    def __repr__(self) -> str:
        return f"Tag id={self.tag_id} appears in recipe {self.recipe_id}"


class Store(db.Model):
    __tablename__ = "stores"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    address: Mapped[str] = mapped_column(String(75))
    geolocation: Mapped[(float, float)] = mapped_column(
        Integer
    )  # Change this type later

    def __repr__(self) -> str:
        return f"Store {self.name} located at {self.address}"


# This hsould have a many to one relationship (many ingredients mapped to one store) - change this
class IngredientStoreBridge(db.Model):
    __tablename__ = "ingredient_store_bridge"

    ingredient_id: Mapped[int] = mapped_column(
        ForeignKey("ingredients.id"), primary_key=True
    )
    store_id: Mapped[int] = mapped_column(ForeignKey("stores.id"), primary_key=True)


class MealPlan(db.Model):
    __tablename__ = "meal_plans"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    week: Mapped[datetime] = mapped_column()  # Fill in weekly date type for this


# Many to many for recipes appearing in weekly meal plans
class RecipeMealPlanBridge(db.Model):
    __tablename__ = "recipe_meal_plan_bridge"

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), primary_key=True)
    meal_plan_id: Mapped[int] = mapped_column(
        ForeignKey("meal_plans.id"), primary_key=True
    )
    amount: Mapped[int] = mapped_column(Integer, default=1)


class ShoppingList(db.Model):
    __tablename__ = "shopping_lists"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    week: Mapped[datetime] = mapped_column()  # Fill in weekly date type for this


# Many to many for ingredients appearing in weekly hsopping lists
class IngredientShoppingListBridge(db.Model):
    __tablename__ = "ingredient_shopping_list_bridge"

    ingredient_id: Mapped[int] = mapped_column(
        ForeignKey("ingredients.id"), primary_key=True
    )
    shopping_list_id: Mapped[int] = mapped_column(
        ForeignKey("shopping_lists.id"), primary_key=True
    )
    amount: Mapped[int] = mapped_column(Integer, default=1)


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
