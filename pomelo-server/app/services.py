from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import select

from app.models import Ingredient, IngredientRecipeBridge, Recipe, Tag
from app.schema.recipes import RecipeCreate


def create_new_recipe(recipe_data: RecipeCreate, db: SQLAlchemy) -> Recipe:
    new_recipe = Recipe()

    new_recipe.name = recipe_data.name
    new_recipe.cuisine = recipe_data.cuisine
    new_recipe.meal_type = recipe_data.meal_type
    new_recipe.servings = recipe_data.servings
    db.session.add(new_recipe)
    db.session.flush()

    for recipe_ingredient in recipe_data.ingredients:
        existing_ingredient = db.session.execute(
            select(Ingredient).filter_by(
                name=recipe_ingredient.name, units=recipe_ingredient.units
            )
        ).scalar_one_or_none()

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

    for tag_name in recipe_data.tags:
        tag = db.session.execute(
            select(Tag).filter_by(name=tag_name)
        ).scalar_one_or_none()
        if not tag:
            tag = Tag(name=tag_name)
            db.session.add(tag)
            db.session.flush()

        tag.recipes.append(new_recipe)

    db.session.commit()

    final_recipe = db.session.get(Recipe, new_recipe.id)
    return final_recipe


def update_existing_recipe(
    recipe: Recipe, new_recipe_data: RecipeCreate, db: SQLAlchemy
) -> Recipe:
    recipe.name = new_recipe_data.name
    recipe.cuisine = new_recipe_data.cuisine
    recipe.meal_type = new_recipe_data.meal_type
    recipe.servings = new_recipe_data.servings
    recipe.ingredient_links.clear()

    db.session.flush()

    for ingredient in new_recipe_data.ingredients:
        existing_ingredient = db.session.execute(
            select(Ingredient).filter_by(name=ingredient.name, units=ingredient.units)
        ).scalar_one_or_none()
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

    recipe.tags.clear()
    for tag_name in new_recipe_data.tags:
        tag = db.session.execute(
            select(Tag).filter_by(name=tag_name)
        ).scalar_one_or_none()
        if not tag:
            tag = Tag(name=tag_name)
            db.session.add(tag)
            db.session.flush()

        tag.recipes.append(recipe)

    db.session.commit()
    return recipe
