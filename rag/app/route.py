import requests

from flask import request
from weaviate.classes.query import MetadataQuery

from app import app
from rag.app.constants import RECIPE_SERVICE_URL
from rag.app.db import VectorDatabaseClient
from rag.app.ollama import OllamaClient
from rag.app.schema import FoodCalendar, Recipe


@app.get("/")
def get_suggestion():
    data = request.get_json()
    input_string = data.get("text")

    ollama_client = OllamaClient()
    weaviate_client = VectorDatabaseClient(ollama_client)

    input_vector = ollama_client.get_embedding(input_string)

    recipe_collection = weaviate_client.client.collections.get("recipes")
    search_results = recipe_collection.query.near_vector(
        near_vector=input_vector,
        limit=20,
    )

    search_ids = [result.uuid for result in search_results.objects]

    recipes_json = requests.post(
        url=f"{RECIPE_SERVICE_URL}/recipes", json=search_ids
    ).json()

    recipes = [Recipe.model_validate(recipe) for recipe in recipes_json]

    food_calendar = ollama_client.generate_meal_plan(
        recipes=recipes, question=input_string
    )

    return FoodCalendar.model_validate(food_calendar).model_dump(), 200
