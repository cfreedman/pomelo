import os

from weaviate import WeaviateClient
from weaviate.classes.config import Property, DataType
from weaviate.connect import ConnectionParams

from src.ollama import OllamaClient
from src.schema import RecipeMessage

WEAVIATE_PORT = os.environ["WEAVIATE_PORT"]
WEAVIATE_GRPC_PORT = os.environ["WEAVIATE_GRPC_PORT"]

print(WEAVIATE_PORT)
print(WEAVIATE_GRPC_PORT)


class VectorDatabaseClient:
    def __init__(self, embedding_client: OllamaClient):
        self.client = WeaviateClient(
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

        self.client.connect()

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
    def generate_properties(recipe_message: RecipeMessage):
        return {"recipe_name": recipe_message.name}

    def create_recipe(self, recipe_message: RecipeMessage):
        recipes = self.client.collections.get("recipes")

        properties = self.generate_properties(recipe_message)
        print(f"Properties for this create recipe are {properties}")
        vector = self.embedding_client.get_embedding(recipe_message)

        id = recipes.data.insert(
            properties=properties, vector=vector, uuid=recipe_message.id
        )
        print(f"Recipe vector with id {id} created successfully")

    def update_recipe(self, recipe_message: RecipeMessage):
        recipes = self.client.collections.get("recipes")

        updated_properties = self.generate_properties(recipe_message)
        print(f"Properties for this update recipe are {updated_properties}")
        updated_vector = self.embedding_client.get_embedding(recipe_message)

        recipes.data.update(
            uuid=recipe_message.id, properties=updated_properties, vector=updated_vector
        )
        print(f"Recipe with id {recipe_message.id} updated successfully")

    def delete_recipe(self, recipe_message: RecipeMessage):
        recipes = self.client.collections.get("recipes")

        recipes.data.delete_by_id(recipe_message.id)
        print(f"Recipe with id {recipe_message.id} deleted successfully")
