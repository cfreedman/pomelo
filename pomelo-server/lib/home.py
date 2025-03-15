from flask import Blueprint, flash, g, redirect, url_for, request

from auth import login_required
from db import get_db
from queries import CREATE_RECIPES_TABLE, ADD_RECIPE, LIST_RECIPES

bp = Blueprint("home", __name__)


@bp.route("/")
def index():
    db = get_db()
    # Fetch view


@bp.route("/recipes", method=("GET", "POST"))
@login_required
def recipes():
    if request.method == "POST":
        # Form data here
        recipe_title = request.form["recipe_title"]

        # Validate data here
        error = None
        if not recipe_title:
            error = "Recipe title is required."

        if error:
            flash(error)
        else:
            db = get_db()
            with db:
                with db.cursor() as cursor:
                    cursor.execute(CREATE_RECIPES_TABLE)
                    cursor.execute(ADD_RECIPE, (recipe_title,))
                    recipe_id = cursor.fetchone()[0]

            return {
                "recipe_id": recipe_id,
                "message": f"Recipe for {recipe_title} successfully created.",
            }, 201

    db = get_db()
    with db:
        with db.cursor as cursor:
            cursor.execute(CREATE_RECIPES_TABLE)
            cursor.execute(LIST_RECIPES)
            recipes = [
                {"recipe_id": recipe_id, "recipe_title": recipe_title}
                for (recipe_id, recipe_title) in cursor.fetchall()
            ]

    return recipes
