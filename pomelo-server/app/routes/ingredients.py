from flask import Blueprint

ingredients_bp = Blueprint("ingredients", __name__)


@ingredients_bp.get("/")
def get_ingredients():
    pass


@ingredients_bp.get("/<int:id>")
def get_ingredient_by_id(id: int):
    pass


@ingredients_bp.post("/")
def create_ingredient():
    pass


@ingredients_bp.put("/<int:id>")
def update_ingredient_by_id(id: int):
    pass


@ingredients_bp.delete("/<int:id>")
def delete_ingredient_by_id(id: int):
    pass
