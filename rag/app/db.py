import os

import weaviate
from weaviate.classes.config import Configure, Property, DataType
from weaviate.connect import ConnectionParams

WEAVIATE_PORT = os.environ["WEAVIATE_PORT"]
WEAVIATE_GRPC_PORT = os.environ["WEAVIATE_GRPC_PORT"]

print(WEAVIATE_PORT)
print(WEAVIATE_GRPC_PORT)

client = weaviate.WeaviateClient(
    connection_params=ConnectionParams.from_params(
        http_host="weaviate",
        http_port=WEAVIATE_PORT,
        http_secure=False,
        grpc_host="weaviate",
        grpc_port=WEAVIATE_GRPC_PORT,
        grpc_secure=False,
    )
)


def initialize_collection():
    if not client.collections.exists("recipes"):
        client.collections.create(
            name="recipes",
            properties=[Property(name="recipe", data_type=DataType.TEXT)],
            vectorizer_config=Configure.Vectorizer.text2vec_ollama(
                api_endpoint="http://ollama:11434",
                model="snowflake-arctic-embed:latest",
            ),
            generative_config=Configure.Generative.ollama(
                api_endpoint="http://ollama:11434",
                model="qwen3:latest",
            ),
        )

        print("Collection 'recipes' created successfully.")
    else:
        print("Collection 'recipes' already exists. Skipping creation.")
