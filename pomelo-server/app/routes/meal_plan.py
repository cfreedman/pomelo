from flask import Blueprint, jsonify

from app.models import MealPlan
import app.schema.meal_plan as schema


meal_plan_bp = Blueprint("meal-plan", __name__)


@meal_plan_bp.get("/<int:id>")
def get_meal_plan_by_id(id: int):
    meal_plan = MealPlan.query.get_or_404(id)

    response = schema.MealPlan.model_validate(
        meal_plan.to_shopping_list_schema()
    ).model_dump()
    return jsonify(response), 201
