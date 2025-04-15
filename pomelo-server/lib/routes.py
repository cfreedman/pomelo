from flask import make_response, request, jsonify

from .app import app
from .db import Recipe, Ingredient, IngredientRecipeBridge, db
from . import schemas


@app.get("/recipe")
def recipe_list():
    recipes = Recipe.query.all()
    results = []
    for recipe in recipes:
        results.append(schemas.RecipeDB.model_validate(recipe))
    return make_response(results)


@app.get("/recipe/<int:id>")
def get_recipe(id: int):
    recipe = db.session.query(Recipe).filter_by(id=id).first()
    if recipe:
        id = recipe.id
        name = recipe.name
        servings = recipe.servings
        ingredients = []
        for association in recipe.ingredient_associations:
            ingredient = association.ingredient
            ingredient_data = schemas.RecipeIngredientDB(
                name=ingredient.name,
                units=ingredient.units,
                quantity=association.quantity,
                id=ingredient.id,
            )
            ingredients.append(ingredient_data)

        recipe_data = schemas.RecipeDB(
            id=id,
            name=name,
            servings=servings,
            ingredients=ingredients,
        )

        return make_response(recipe_data.model_dump())

    else:
        return make_response({"message": "Recipe by that id not found"}, 404)


@app.post("/recipe")
def add_recipe():
    data = request.get_json()
    recipe_data = schemas.RecipeBase(**data)
    new_recipe = Recipe(name=recipe_data.name, servings=recipe_data.servings)
    db.session.add(new_recipe)
    db.session.flush()

    for ingredient in recipe_data.ingredients:
        existing_ingredient = Ingredient.query.filter_by(
            name=ingredient.name, units=ingredient.units
        ).first()
        if existing_ingredient:
            bridge = IngredientRecipeBridge(
                recipe_id=new_recipe.id,
                ingredient_id=existing_ingredient.id,
                quantity=ingredient.quantity,
            )
            db.session.add(bridge)
        else:
            new_ingredient = Ingredient(name=ingredient.name, units=ingredient.units)
            db.session.add(new_ingredient)
            db.session.flush()
            bridge = IngredientRecipeBridge(
                recipe_id=new_recipe.id,
                ingredient_id=new_ingredient.id,
                quantity=ingredient.quantity,
            )
            db.session.add(bridge)

    db.session.commit()
    return make_response(f"Recipe {recipe_data.name} successfully added to database")


@app.put("/recipe/<int:id>")
def update_recipe(id: int):
    data = request.get_json()
    recipe_data = schemas.RecipeBase(**data)
    recipe = db.session.query(Recipe).filter(Recipe.id == id).first()
    if recipe:
        recipe.name = recipe_data.name
        recipe.servings = recipe_data.servings

        # Clear existing associations
        recipe.ingredient_associations.clear()

        for ingredient in recipe_data.ingredients:
            existing_ingredient = Ingredient.query.filter_by(
                name=ingredient.name, units=ingredient.units
            ).first()
            if existing_ingredient:
                bridge = IngredientRecipeBridge(
                    recipe_id=recipe.id,
                    ingredient_id=existing_ingredient.id,
                    quantity=ingredient.quantity,
                )
                db.session.add(bridge)
            else:
                new_ingredient = Ingredient(
                    name=ingredient.name, units=ingredient.units
                )
                db.session.add(new_ingredient)
                db.session.flush()
                bridge = IngredientRecipeBridge(
                    recipe_id=recipe.id,
                    ingredient_id=new_ingredient.id,
                    quantity=ingredient.quantity,
                )
                db.session.add(bridge)

        db.session.commit()
        return make_response(f"Recipe {recipe_data.name} successfully updated")

    return make_response(f"Unable to find object in database with id {id}")
