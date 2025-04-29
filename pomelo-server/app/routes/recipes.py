from flask import Blueprint, jsonify, request

from app import db
from app.models import Ingredient, IngredientRecipeBridge, Recipe, Tag, TagRecipeBridge
from app.schemas import Recipe as RecipeSchema, RecipeCreate


recipes_bp = Blueprint("recipes", __name__)


@recipes_bp.get("/")
def get_recipes():
    recipes = Recipe.query.all()
    result = [RecipeSchema.model_validate(**recipe).model_dump() for recipe in recipes]

    return jsonify(result)


@recipes_bp.get("/<int:id>")
def get_recipe_by_id(id: int):
    recipe = Recipe.query.get_or_404(id)
    result = RecipeSchema.model_validate(**recipe).model_dump()

    return jsonify(result)


@recipes_bp.post("/")
def create_recipe():
    data = request.get_json()
    recipe_data = RecipeCreate.model_validate(**data)

    new_recipe = Recipe()
    new_recipe.name = recipe_data.name
    new_recipe.cuisine = recipe_data.cuisine
    new_recipe.meal_type = recipe_data.meal_type
    new_recipe.servings = recipe_data.servings
    db.session.add(new_recipe)
    db.session.flush()

    db.session.commit()

    for recipe_ingredient in recipe_data.ingredients:
        existing_ingredient = Ingredient.query.filter_by(
            name=recipe_ingredient.name, units=recipe_ingredient.units
        ).first()

        if existing_ingredient:
            ingredient_id = existing_ingredient.id
        else:
            new_ingredient = Ingredient(
                name=recipe_ingredient.name, units=recipe_ingredient.units
            )
            db.session.add(new_ingredient)
            db.session.flush()
            ingredient_id = new_ingredient.id

        bridge = IngredientRecipeBridge(
            recipe_id=new_recipe.id,
            ingredient_id=ingredient_id,
            quantity=recipe_ingredient.quantity,
        )
        db.session.add(bridge)

    for tag in recipe_data.tags:
        existing_tag = Tag.query.filter_by(name=tag).first()
        if existing_tag:
            tag_id = existing_tag.id
        else:
            new_tag = Tag(name=tag)
            db.session.add(new_tag)
            db.session.flush()
            tag_id = new_tag.id
        bridge = TagRecipeBridge(
            recipe_id=new_recipe.id,
            tag_id=tag_id,
        )
        db.session.add(bridge)

    db.session.commit()

    full_recipe = Recipe.query.get(new_recipe.id)
    response = RecipeSchema.model_validate(**full_recipe).model_dump()
    return jsonify(response), 201


@recipes_bp.put("/<int:id>")
def update_recipe_by_id(id: int):
    data = request.get_json()
    recipe_data = RecipeCreate.model_validate(**data)
    recipe = Recipe.query.get_or_404(id)

    recipe.name = recipe_data.name
    recipe.cuisine = recipe_data.cuisine
    recipe.meal_type = recipe_data.meal_type
    recipe.servings = recipe_data.servings
    recipe.ingredient_associations.clear()

    for ingredient in recipe_data.ingredients:
        existing_ingredient = Ingredient.query.filter_by(
            name=ingredient.name, units=ingredient.units
        ).first()
        if existing_ingredient:
            ingredient_id = existing_ingredient.id
        else:
            new_ingredient = Ingredient(name=ingredient.name, units=ingredient.units)
            db.session.add(new_ingredient)
            db.session.flush()
            ingredient_id = new_ingredient.id
        bridge = IngredientRecipeBridge(
            recipe_id=recipe.id,
            ingredient_id=ingredient_id,
            quantity=ingredient.quantity,
        )
        db.session.add(bridge)

    recipe.tag_associations.clear()
    for tag in recipe_data.tags:
        existing_tag = Tag.query.filter_by(name=tag).first()
        if existing_tag:
            tag_id = existing_tag.id
        else:
            new_tag = Tag(name=tag)
            db.session.add(new_tag)
            db.session.flush()
            tag_id = new_tag.id
        bridge = TagRecipeBridge(
            recipe_id=recipe.id,
            tag_id=tag_id,
        )
    db.session.add(bridge)
    db.session.commit()
    return jsonify(f"Recipe {recipe_data.name} successfully updated"), 200


@recipes_bp.delete("/<int:id>")
def delete_recipe_by_id(id: int):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify(f"Recipe {recipe.name} successfully deleted"), 200
