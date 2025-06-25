import json
import uuid
from flask import Blueprint, jsonify, request
from sqlalchemy import select

from app.extensions import db
from app.models import Recipe
from app.producer import RecipeMessageProducer
import app.schema.recipes as schema
from app.services import create_new_recipe, update_existing_recipe


recipes_bp = Blueprint("recipes", __name__)


@recipes_bp.get("/")
def get_recipes():
    print("Fetching all recipes")
    recipes = db.session.execute(select(Recipe)).scalars().all()
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
def get_recipes_by_ids():
    recipe_ids = request.get_json()

    recipes = (
        db.session.execute(select(Recipe).where(Recipe.id.in_(recipe_ids)))
        .scalars()
        .all()
    )

    response = [
        schema.Recipe.model_validate(recipe.to_recipe_schema()).model_dump()
        for recipe in recipes
    ]

    return jsonify(response)


@recipes_bp.post("/")
def create_recipe():
    data = request.get_json()
    recipe_data = schema.RecipeCreate.model_validate(data)

    created_recipe = create_new_recipe(recipe_data, db)

    created_recipe = created_recipe.to_recipe_schema()
    created_recipe_message = created_recipe.to_recipe_message()

    producer = RecipeMessageProducer.get_instance()
    producer.produce(
        topic="create_recipe",
        key=uuid.uuid4(),
        value=json.dumps(created_recipe_message),
    )

    response = schema.Recipe.model_validate(created_recipe).model_dump()
    return jsonify(response), 201


@recipes_bp.put("/<int:id>")
def update_recipe_by_id(id: int):
    data = request.get_json()
    recipe_data = schema.RecipeCreate.model_validate(data)
    recipe = Recipe.query.get_or_404(id)

    updated_recipe = update_existing_recipe(recipe, recipe_data, db)
    updated_recipe = updated_recipe.to_recipe_schema()
    updated_recipe_message = updated_recipe.to_recipe_message()

    producer = RecipeMessageProducer.get_instance()
    producer.produce(
        topic="update_recipe",
        key=uuid.uuid4(),
        value=json.dumps(updated_recipe_message),
    )

    response = schema.Recipe.model_validate(updated_recipe).model_dump()
    return jsonify(response), 201


@recipes_bp.delete("/<int:id>")
def delete_recipe_by_id(id: int):
    recipe = Recipe.query.get_or_404(id)

    db.session.delete(recipe)
    db.session.commit()

    producer = RecipeMessageProducer.get_instance()
    producer.produce(topic="delete_recipe", key=uuid.uuid4(), value=str(recipe.id))

    return jsonify(f"Recipe {recipe.name} successfully deleted"), 200
