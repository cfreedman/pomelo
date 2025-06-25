from quixstreams import Application
from quixstreams.kafka.producer import Producer


class RecipeMessageProducer:
    _instance = None

    @classmethod
    def get_instance(cls) -> Producer:
        if cls._instance is None:
            app = Application(broker_address="localhost:9092")
            create_recipe_topic = app.topic(name="create_recipe")
            update_recipe_topic = app.topic(name="update_recipe")
            delete_recipe_topic = app.topic(name="delete_recipe")

            cls._instance = app.get_producer()

        return cls._instance
