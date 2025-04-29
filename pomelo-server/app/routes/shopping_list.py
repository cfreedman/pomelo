from flask import Blueprint, make_response, request

from app import db
from app.models import ShoppingList

shopping_list_bp = Blueprint("shopping-list", __name__)


@shopping_list_bp.get("/<int:id>")
def get_shopping_list_by_id(id: int):
    pass


@shopping_list_bp.post("/")
def create_shopping_list():
    data = request.get_json()


@shopping_list_bp.put("/<int:id>")
def update_shopping_list_by_id(id: int):
    pass


@shopping_list_bp.delete("/<int:id>")
def delete_shopping_list_by_id(id: int):
    shopping_list = ShoppingList.query.get_or_404(id)
    db.session.delete(shopping_list)
    db.commit()

    return make_response({"message": "Shopping list deleted successfully"}, 200)
