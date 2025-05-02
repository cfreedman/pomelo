from flask import Blueprint, jsonify, request

from app import db
from app.models import Ingredient, IngredientRecipeBridge, Recipe, Tag
import app.schema.recipes as schema
from app.services import create_new_recipe, update_existing_recipe


recipes_bp = Blueprint("recipes", __name__)


@recipes_bp.get("/")
def get_recipes():
    print("Fetching all recipes")
    recipes = db.session.query(Recipe).all()
    result = [
        schema.Recipe.model_validate(recipe.to_recipe_schema()).model_dump()
        for recipe in recipes
    ]

    return jsonify(result)


@recipes_bp.get("/<int:id>")
def get_recipe_by_id(id: int):
    recipe = Recipe.query.get_or_404(id)
    result = schema.Recipe.model_validate(recipe.to_recipe_schema()).model_dump()

    return jsonify(result)


@recipes_bp.post("/")
def create_recipe():
    data = request.get_json()
    recipe_data = schema.RecipeCreate.model_validate(data)

    final_recipe = create_new_recipe(recipe_data, db)

    response = schema.Recipe.model_validate(
        final_recipe.to_recipe_schema()
    ).model_dump()
    return jsonify(response), 201


@recipes_bp.put("/<int:id>")
def update_recipe_by_id(id: int):
    data = request.get_json()
    recipe_data = schema.RecipeCreate.model_validate(data)
    recipe = Recipe.query.get_or_404(id)

    updated_recipe = update_existing_recipe(recipe, recipe_data, db)
    response = schema.Recipe.model_validate(
        updated_recipe.to_recipe_schema()
    ).model_dump()
    return jsonify(response), 201


@recipes_bp.delete("/<int:id>")
def delete_recipe_by_id(id: int):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify(f"Recipe {recipe.name} successfully deleted"), 200
