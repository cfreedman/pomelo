from quixstreams import Application

from src.db import VectorDatabaseClient
from src.ollama import OllamaClient


app = Application(broker_address="kafka:9092", consumer_group="recipe_consumer")

create_recipe_topic = app.topic("create_recipe", value_deserializer="json")
update_recipe_topic = app.topic("update_recipe", value_deserializer="json")
delete_recipe_topic = app.topic("delete_recipe")

ollama_client = OllamaClient()
db_client = VectorDatabaseClient(embedding_client=ollama_client)

print("Initialized all clients - now starting main worker")


def main():
    with app.get_consumer() as consumer:
        consumer.subscribe(topics=["create_recipe", "update_recipe", "delete_recipe"])

        while True:
            message = consumer.poll(0.5)

            if message is None:
                continue
            if message.error():
                print("Kafka incoming message error", message.error())
                continue

            topic = message.topic()
            recipe_message = message.value()

            print(topic)
            print(recipe_message)

            if topic == "create_recipe":
                # db_client.create_recipe(recipe=recipe_message)
                pass
            elif topic == "update_recipe":
                # db_client.update_recipe(recipe=recipe_message)
                pass
            else:
                # db_client.delete_recipe(recipe=recipe_message)
                pass


if __name__ == "__main__":
    print("Starting main")
    main()
    print("Done main")
