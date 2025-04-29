from flask import make_response, request, jsonify

from .database import (
    Recipe,
    Ingredient,
    IngredientRecipeBridge,
    Store,
    Tag,
    TagRecipeBridge,
    db,
)
from . import create_app, schemas

app = create_app()


@app.get("/recipe")
def recipe_list():
    recipes = Recipe.query.all()
    results = []
    for recipe in recipes:
        ingredients = []
        for link in recipe.ingredient_associations:
            ingredient = link.ingredient
            ingredient_data = schemas.RecipeIngredient(
                name=ingredient.name,
                units=ingredient.units,
                quantity=link.quantity,
                id=ingredient.id,
            )
            ingredients.append(ingredient_data)

        response_recipe = schemas.Recipe(
            id=recipe.id,
            name=recipe.name,
            servings=recipe.servings,
            cuisine=recipe.cuisine,
            meal_type=recipe.meal_type,
            tags=[
                schemas.Tag(id=association.tag.id, name=association.tag.name)
                for association in recipe.tag_associations
            ],
            ingredients=ingredients,
        )
        results.append(response_recipe)
    return make_response([result.model_dump() for result in results])


@app.get("/recipe/<int:id>")
def get_recipe(id: int):
    recipe = db.session.query(Recipe).filter_by(id=id).first()
    if recipe:
        ingredients = []
        for association in recipe.ingredient_associations:
            ingredient = association.ingredient
            ingredient_data = schemas.RecipeIngredient(
                name=ingredient.name,
                units=ingredient.units,
                quantity=association.quantity,
                id=ingredient.id,
            )
            ingredients.append(ingredient_data)

        tags = []
        for association in recipe.tag_associations:
            tag = association.tag
            tag_data = schemas.Tag(id=tag.id, name=tag.name)
            tags.append(tag_data)

        recipe_data = schemas.Recipe(
            id=recipe.id,
            name=recipe.name,
            servings=recipe.servings,
            cuisine=recipe.cuisine,
            meal_type=recipe.meal_type,
            tags=tags,
            ingredients=ingredients,
        )

        return make_response(recipe_data.model_dump())

    else:
        return make_response({"message": "Recipe by that id not found"}, 404)


@app.post("/recipe")
def add_recipe():
    data = request.get_json()
    recipe_data = schemas.RecipeCreate(**data)
    new_recipe = Recipe(
        name=recipe_data.name,
        cuisine=recipe_data.cuisine,
        meal_type=recipe_data.meal_type,
        servings=recipe_data.servings,
    )
    db.session.add(new_recipe)
    db.session.flush()

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
            recipe_id=new_recipe.id,
            ingredient_id=ingredient_id,
            quantity=ingredient.quantity,
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
    return make_response(f"Recipe {recipe_data.name} successfully added to database")


@app.put("/recipe/<int:id>")
def update_recipe(id: int):
    data = request.get_json()
    recipe_data = schemas.RecipeCreate(**data)
    recipe = db.session.query(Recipe).filter(Recipe.id == id).first()
    if recipe:
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
                new_ingredient = Ingredient(
                    name=ingredient.name, units=ingredient.units
                )
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
        return make_response(f"Recipe {recipe_data.name} successfully updated")

    return make_response(f"Unable to find object in database with id {id}")


@app.get("/stores")
def all_stores():
    stores = Store.query.all()
    response = [schemas.StoreBase(store).model_dump() for store in stores]
    make_response(response)


@app.get("/stores/<int:id>")
def get_store(id: int):
    store = Store.query.filter_by(id=id).first()
    if not Store:
        make_response(f"Unable to locate store with id {id}")
        return

    make_response(schemas.StoreBase(store).model_dump())


@app.get("/ingredients")
def ingredient_list():
    ingredients = Ingredient.query.all()
    response = [
        schemas.Ingredient(Ingredient).model_dump() for ingredient in ingredients
    ]
    make_response(response)


@app.get("/ingredients/<int:id>")
def get_ingredient(id: int):
    ingredient = Ingredient.query.filter_by(id=id).first()
    if not ingredient:
        make_response(f"Unable to locate ingredient with id {id}")

    make_response(schemas.Ingredient(ingredient).model_dump())


@app.get("/shopping-list")
def get_shopping_list():
    pass
