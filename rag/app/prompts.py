from langchain.output_parsers import PydanticOutputParser
from langchain_core.prompts import PromptTemplate

from rag.app.schema import FoodCalendar

food_calendar_prompt = """
You are a helpful assistant who is knowledgeable at crafting weekly meal plans
according to some input instructions by users and specific constraints. Use the context below and those specific recipes to form your answer:

Recipes:
{recipes}

User Input:
{user_input}

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

Do not include any extra explanation or markdown, just the JSON string.
"""

food_calendar_template = PromptTemplate.from_template(food_calendar_prompt)

food_calendar_parser = PydanticOutputParser(pydantic_object=FoodCalendar)

input_processor_prompt = """
You are a helpful assistant who is knowledgeable at crafting weekly meal plans
according to some input instructions by users and specific constraints. Use the user input below and extract
key components, concepts, or entity that relate to food and recipes such as ingredients, types of food, cuisines, and
other cooking related concepts:

User Input:
{user_input}

Return a list of the extract keywords and concepts. If you find that the user input is too unrelated to food and cooking
and no relevant keywords can be extracted for it, return 'Invalid user input - need more information'.

Do not include any extract explanation or markdown.
"""

input_processor_template = PromptTemplate.from_template(input_processor_prompt)
