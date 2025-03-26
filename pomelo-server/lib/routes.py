from app import app
from flask import make_response, request
from db import Ingredient, Recipe, db
import schemas


@app.get("/recipe")
def recipe_list():
    all_recipes = [schemas.Recipe.from_orm(recipe) for recipe in Recipe.query.all()]
    if all_recipes:
        return make_response({"blank": "blank"})


@app.get("/recipe/<int:id>")
def get_recipe(id: int):
    recipe = Recipe.query.filter_by(id=id).first()
    if recipe:
        return make_response({"recipe": recipe.serialize})
    else:
        return make_response({"message": "Recipe by that id not found"}, 404)


@app.post("/recipe")
def add_recipe(recipe: Recipe):
    data = request.json
    name = data.get("name")
    ingredients = data.get("ingredients")
    if not name or not ingredients:
        return make_response(
            {"message": "Invalid recipe - need a name and ingredients"}, 400
        )

    recipe = Recipe(name)
    for ingredient in ingredients:
        if not (
            ingredient_query := Ingredient.query.filter_by(name=ingredient.name).first()
        ):
            ingredient = Ingredient(ingredient.name)
            db.session.add(ingredient)
        else:
            ingredient = ingredient_query

        recipe.ingredients.append(ingredient)

    db.session.add(recipe)
    db.session.commit()
    return make_response({"message": "Recipe successfully saved"}, 201)
