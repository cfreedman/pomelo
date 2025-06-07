import datetime
from typing import List, Literal, TypedDict

from flask import Blueprint, jsonify, request
from sqlalchemy import select

from app.models import MealPlan, RecipeMealPlanBridge
import app.schema.meal_plan as schema
from app.extensions import db


meal_plan_bp = Blueprint("meal-plan", __name__)

Weekday = Literal[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

weekdays: List[Weekday] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]


class WeekdayDates(TypedDict):
    Sunday: datetime.date
    Monday: datetime.date
    Tuesday: datetime.date
    Wednesday: datetime.date
    Thursday: datetime.date
    Friday: datetime.date
    Saturday: datetime.date


def get_week_dates(week_start: datetime.date) -> WeekdayDates:
    """Get all of the  given a Sunday start date."""
    date = week_start
    week_dates: WeekdayDates = {}
    week_dates["Sunday"] = date
    for i in range(1, 7):
        date += datetime.timedelta(days=1)
        week_dates[weekdays[i]] = date

    return week_dates


@meal_plan_bp.get("/<week-start>")
def get_meal_plan_by_id(week_start: str):
    sunday_date = datetime.date.fromisoformat(week_start)
    week_dates = get_week_dates(sunday_date)

    week_meal_plan: schema.MealPlan = {}

    for weekday, weekday_date in week_dates.items():
        weekday_meal_plan = db.session.execute(
            select(MealPlan).filter_by(date=weekday_date)
        ).scalar_one_or_none()

        if not weekday_meal_plan:
            week_meal_plan[weekday] = []
            continue

        items = weekday_meal_plan.get_recipes()
        week_meal_plan[weekday] = items

    response = schema.MealPlan.model_validate(week_meal_plan).model_dump()
    return jsonify(response), 201


@meal_plan_bp.post("/")
def create_meal_plan():
    data = schema.MealPlan.model_validate(request.get_json())
    sunday = datetime.date.fromisoformat(data.week_start)
    week_dates = get_week_dates(sunday)

    for weekday in weekdays:
        date = week_dates[weekday]
        existing_meal_plan = db.session.execute(
            select(MealPlan).filter_by(date=date)
        ).scalar_one_or_none()

        if existing_meal_plan:
            return jsonify({"message": f"Meal plan for {date} already exists."}), 400

        new_meal_plan = MealPlan(date=date)
        db.session.add(new_meal_plan)
        db.session.flush()
        recipes = data.items.get(weekday, [])

        for recipe in recipes:
            link = RecipeMealPlanBridge(
                recipe_id=recipe.id,
                meal_plan_id=new_meal_plan.id,
                quantity=recipe.quantity,
            )

            db.session.add(link)

    db.session.commit()
    response = schema.MealPlan.model_validate(new_meal_plan).model_dump()
    return jsonify(response), 201


@meal_plan_bp.put("/<week-start>")
def update_meal_plan_by_id(week_start: str):
    data = schema.FoodCalendar.model_validate(request.get_json())
    sunday = datetime.date.fromisoformat(week_start)
    week_dates = get_week_dates(sunday)

    for weekday in weekdays:
        date = week_dates[weekday]
        existing_meal_plan = db.session.execute(
            select(MealPlan).filter_by(date=date)
        ).scalar_one_or_none()

        if not existing_meal_plan:
            return jsonify({"message": f"Meal plan for {date} does not exist."}), 404

        existing_meal_plan.recipe_links.clear()

        db.session.flush()

        recipes = data[
            weekday
        ]  # [BUG] - Check this wrong way to access pydantic model indexing
        for recipe in recipes:
            link = RecipeMealPlanBridge(
                recipe_id=recipe.id,
                meal_plan_id=existing_meal_plan.id,
                quantity=recipe.quantity,
            )
            db.session.add(link)

    db.session.commit()
    response = schema.MealPlan.model_validate(existing_meal_plan).model_dump()
    return jsonify(response), 201


@meal_plan_bp.delete("/<week-start>")
def delete_meal_plan_by_id(week_start: str):
    sunday = datetime.date.fromisoformat(week_start)
    week_dates = get_week_dates(sunday)

    for weekday in weekdays:
        date = week_dates[weekday]
        existing_meal_plan = db.session.execute(
            select(MealPlan).filter_by(date=date)
        ).scalar_one_or_none()

        if not existing_meal_plan:
            return jsonify({"message": f"Meal plan for {date} does not exist."}), 404

        db.session.delete(existing_meal_plan)

    db.session.commit()
    return jsonify({"message": "Meal plan deleted successfully."}), 204
