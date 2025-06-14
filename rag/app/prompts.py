from langchain.output_parsers import PydanticOutputParser

from rag.app.schema import FoodCalendar

meal_plan_template = """
You are a helpful assistant who is knowledgeable at crafting weekly meal plans
according to some input instructions by users and specific constraints. Use the context below and those specific recipes to form your answer:

Recipes:
{recipes}

Original Question:
{original_question}

Respond with a JSON object structured like this:

{
    "Sunday": [
        {"id": 1, "name": "Chicken Parm", "quantity": 3},
        {"id": 4, "name": "Green Curry", "quantity": 2},
        {"id": 5, "name": "Caesar Salad", "quantity": 2},
    ],
    "Monday": [
        {"id": 9, "name": "Spaghetti", "quantity": 2},
        {"id": 8, "name": "Brownie", "quantity": 2},
        {"id": 3, "name": "Salad Nicoise", "quantity": 2},
    ],
    "Tuesday": [
        {"id": 1, "name": "Chicken Parm", "quantity": 3},
        {"id": 4, "name": "Green Curry", "quantity": 2},
        {"id": 5, "name": "Caesar Salad", "quantity": 2},
    ],
    "Wednesday": [
        {"id": 9, "name": "Spaghetti", "quantity": 2},
        {"id": 8, "name": "Brownie", "quantity": 2},
        {"id": 3, "name": "Salad Nicoise", "quantity": 2},
    ],
    "Thursday": [
        {"id": 1, "name": "Chicken Parm", "quantity": 3},
        {"id": 4, "name": "Green Curry", "quantity": 2},
        {"id": 5, "name": "Caesar Salad", "quantity": 2},
    ],
    "Friday": [
        {"id": 9, "name": "Spaghetti", "quantity": 2},
        {"id": 8, "name": "Brownie", "quantity": 2},
        {"id": 3, "name": "Salad Nicoise", "quantity": 2},
    ],
    "Saturday": [
        {"id": 1, "name": "Chicken Parm", "quantity": 3},
        {"id": 4, "name": "Green Curry", "quantity": 2},
        {"id": 5, "name": "Caesar Salad", "quantity": 2},
    ]
}

This defines each of the weekdays and gives list of recipes taking the form
{ "id": integer, "name": string, "quantity": string } for each one.

Do no include any extra explanation or markdown, just the JSON string.
"""

meal_plan_parser = PydanticOutputParser(pydantic_object=FoodCalendar)
