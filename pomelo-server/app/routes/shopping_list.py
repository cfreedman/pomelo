from flask import Blueprint, jsonify, make_response, request

from app import db
from app.models import Ingredient, IngredientShoppingListBridge, ShoppingList
import app.schema.shopping_list as schema

shopping_list_bp = Blueprint("shopping-list", __name__)


@shopping_list_bp.get("/<int:id>")
def get_shopping_list_by_id(id: int):
    shopping_list = ShoppingList.query.get_or_404(id)

    response = schema.ShoppingList.model_validate(
        shopping_list.to_shopping_list_schema()
    ).model_dump()
    return jsonify(response), 201


@shopping_list_bp.post("/")
def create_shopping_list():
    data = request.get_json()
    shopping_list_data = schema.ShoppingListCreate.model_validate(**data)

    new_shopping_list = ShoppingList()
    new_shopping_list.week_start = shopping_list_data.week_start
    db.session.add(new_shopping_list)
    db.session.flush()
    db.session.refresh(new_shopping_list)

    for item in shopping_list_data.items:
        ingredient = Ingredient.query.filter_by(
            name=item.name, units=item.units
        ).first()

        if not ingredient:
            ingredient = Ingredient(name=item.name, units=item.units)
            db.session.add(ingredient)
            db.session.flush()
            db.session.refresh(ingredient)

        shopping_ingredient = IngredientShoppingListBridge(
            shopping_list_id=new_shopping_list.id,
            ingredient_id=ingredient.id,
            quantity=item.quantity,
        )

        db.session.add(shopping_ingredient)
    db.session.commit()
    return jsonify(
        schema.ShoppingList.model_validate(**new_shopping_list).model_dump()
    ), 201


@shopping_list_bp.put("/<int:id>")
def update_shopping_list_by_id(id: int):
    data = request.get_json()
    shopping_list_data = schema.ShoppingListCreate.model_validate(**data)
    shopping_list = ShoppingList.query.get_or_404(id)

    db.session.query(IngredientShoppingListBridge).filter_by(
        shopping_list_id=id
    ).delete()
    db.session.flush()

    for item in shopping_list_data.items:
        ingredient = Ingredient.query.filter_by(
            name=item.name, units=item.units
        ).first()

        if not ingredient:
            ingredient = Ingredient(name=item.name, units=item.units)
            db.session.add(ingredient)
            db.session.flush()
            db.session.refresh(ingredient)

        shopping_ingredient = IngredientShoppingListBridge(
            shopping_list_id=shopping_list.id,
            ingredient_id=ingredient.id,
            quantity=item.quantity,
        )
        db.session.add(shopping_ingredient)

    db.session.commit()

    return jsonify(
        schema.ShoppingList.model_validate(**shopping_list).model_dump()
    ), 201


@shopping_list_bp.delete("/<int:id>")
def delete_shopping_list_by_id(id: int):
    shopping_list = ShoppingList.query.get_or_404(id)
    db.session.delete(shopping_list)
    db.commit()

    return make_response({"message": "Shopping list deleted successfully"}, 200)
