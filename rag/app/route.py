import requests

from flask import request
from weaviate.classes.query import MetadataQuery

from app import app
from rag.app.constants import RECIPE_SERVICE_URL
from rag.app.db import VectorDatabaseClient
from rag.app.ollama import EmbeddingClient
from rag.app.schema import Recipe


@app.get("/")
def get_suggestion():
    data = request.get_json()
    input_string = data.get("text")

    embedding_client = EmbeddingClient()
    weaviate_client = VectorDatabaseClient(embedding_client)

    input_vector = embedding_client.get_embedding(input_string)

    recipe_collection = weaviate_client.client.collections.get("recipes")
    search_results = recipe_collection.query.near_vector(
        near_vector=input_vector,
    )

    search_ids = [result.id for result in search_results.objects]

    recipes_json = requests.post(
        url=f"{RECIPE_SERVICE_URL}/recipes", json=search_results
    ).json()

    recipes = [Recipe.model_validate(recipe) for recipe in recipes_json]
