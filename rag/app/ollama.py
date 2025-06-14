import time
from ollama import Client

from rag.app.schema import Recipe


class EmbeddingClient:
    def __init__(
        self,
        model: str = "snowflake-arctic-embed",
        max_retries: int = 3,
        retry_delay: float = 0.5,
    ):
        self.client = Client()
        self.model = model
        self.max_retries = max_retries
        self.retry_delay = retry_delay

    @staticmethod
    def serialize_recipe(recipe: Recipe) -> str:
        name = f"Recipe: {recipe.name}\n"
        features = f"Features: {recipe.cusine}, {recipe.meal_type}\n"
        servings = f"Servings: {recipe.servings}\n"
        ingredients = "\n".join(
            [
                f"{ingredient.quantity} {ingredient.units} {ingredient.name}"
                for ingredient in recipe.ingredients
            ]
        )
        tags = "Tags: " + " ".join([f"{tag.name}" for tag in recipe.tags])

        return name + features + servings + ingredients + tags

    def get_embedding(self, recipe: Recipe):
        attempt = 0
        serialized_recipe = self.serialize_recipe(recipe)

        while attempt < self.max_retries:
            try:
                result = self.client.embeddings(
                    model=self.model, prompt=serialized_recipe
                )
                return result["embeddings"][0]
            except Exception as e:
                print(f"Issue with generating embedding from Ollama API with error {e}")
                attempt += 1
                if attempt > self.max_retries:
                    raise
                time.sleep(self.retry_delay)

    def generate_meal_plan(self):
