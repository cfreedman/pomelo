import os

import weaviate
from weaviate.classes.config import Configure, Property, DataType
from weaviate.connect import ConnectionParams

WEAVIATE_PORT = os.environ["WEAVIATE_PORT"]
WEAVIATE_GRPC_PORT = os.environ["WEAVIATE_GRPC_PORT"]

client = weaviate.WeaviateClient(
    connection_params=ConnectionParams.from_params(
        http_host="localhost",
        http_port=WEAVIATE_PORT,
        http_secure=False,
        grpc_host="localhost",
        grpc_port=WEAVIATE_GRPC_PORT,
        grpc_secure=False,
    )
)


def initialize_collection():
    if not client.collections.exists("recipes"):
        client.collections.create(
            name="recipes",
            vectorizer_config=Configure.NamedVectors.text2vec_ollama(
                name="recipe_vector",
                source_properties=["recipe"],
                api_endpoint="http://host.docker.internal:11434",
                model="llama3-70b",
            ),
            generative_config=Configure.Generative.ollama(
                api_endpoint="http://host.docker.internal:11434",
                model="llama3-70b",
            ),
            properties=[Property(name="recipe", data_type=DataType.TEXT)],
        )

        print("Collection 'recipes' created successfully.")
    else:
        print("Collection 'recipes' already exists. Skipping creation.")
