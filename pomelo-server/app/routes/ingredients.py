from flask import Blueprint, jsonify, request

from app import db
from app.models import Ingredient
import app.schema.ingredients as schema

ingredients_bp = Blueprint("ingredients", __name__)


@ingredients_bp.get("/")
def get_ingredients():
    ingredients = Ingredient.query.all()
    result = [
        schema.Ingredient.model_validate(**ingredient).model_dump()
        for ingredient in ingredients
    ]

    return jsonify(result)


@ingredients_bp.get("/<int:id>")
def get_ingredient_by_id(id: int):
    ingredient = Ingredient.query.get_or_404()
    result = schema.Ingredient.model_validate(**ingredient).model_dump()

    return jsonify(result)


@ingredients_bp.post("/")
def create_ingredient():
    data = request.get_json()
    ingredient_data = schema.Ingredient.model_validate(**data)

    new_ingredient = Ingredient()
    new_ingredient.name = ingredient_data.name
    new_ingredient.units = ingredient_data.units

    db.session.commit()
    return jsonify(ingredient_data), 201


@ingredients_bp.put("/<int:id>")
def update_ingredient_by_id(id: int):
    data = request.get_json()
    ingredient_data = schema.IngredientCreate.model_validate(**data)
    ingredient = Ingredient.query.get_or_404(id)

    ingredient.name = ingredient_data.name
    ingredient.units = ingredient_data.units

    db.session.commit()
    return jsonify(ingredient_data), 201


@ingredients_bp.delete("/<int:id>")
def delete_ingredient_by_id(id: int):
    ingredient = Ingredient.query.get_or_404(id)
    db.session.delete(ingredient)
    db.session.commit()
    return jsonify(f"Ingredient {ingredient.name} successfully deleted")
