import os

import weaviate
from weaviate.classes.config import Configure, Property, DataType
from weaviate.connect import ConnectionParams

from rag.app.ollama import OllamaClient
from rag.app.schema import Recipe

WEAVIATE_PORT = os.environ["WEAVIATE_PORT"]
WEAVIATE_GRPC_PORT = os.environ["WEAVIATE_GRPC_PORT"]

print(WEAVIATE_PORT)
print(WEAVIATE_GRPC_PORT)


class VectorDatabaseClient:
    def __init__(self, embedding_client: OllamaClient):
        self.client = weaviate.WeaviateClient(
            connection_params=ConnectionParams.from_params(
                http_host="weaviate",
                http_port=WEAVIATE_PORT,
                http_secure=False,
                grpc_host="weaviate",
                grpc_port=WEAVIATE_GRPC_PORT,
                grpc_secure=False,
            )
        )
        self.embedding_client = embedding_client

        self._initialize_collection()

    def _initialize_collection(self):
        if not self.client.collections.exists("recipes"):
            self.client.collections.create(
                name="recipes",
                properties=[
                    Property(name="recipe_name", data_type=DataType.TEXT),
                ],
            )

            print("Collection 'recipes' created successfully.")
        else:
            print("Collection 'recipes' already exists. Skipping creation.")

    @staticmethod
    def generate_properties(recipe: Recipe):
        return {"recipe_name": recipe.name}

    def add_recipe(self, recipe: Recipe):
        recipes = self.client.collections.get("recipes")

        properties = self.generate_properties(recipe)
        vector = self.embedding_client.get_embedding(recipe)

        _ = recipes.data.insert(properties=properties, vector=vector, uuid=recipe.id)

    def update_recipe(self, recipe: Recipe):
        recipes = self.client.collections.get("recipes")

        updated_properties = self.generate_properties(recipe)
        updated_vector = self.embedding_client.get_embedding(recipe)

        recipes.data.update(
            uuid=recipe.id, properties=updated_properties, vector=updated_vector
        )

    def delete_recipe(self, recipe: Recipe):
        recipes = self.client.collections.get("recipes")

        recipes.data.delete_by_id(recipe.id)
