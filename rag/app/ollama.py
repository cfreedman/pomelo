import time
from typing import List, Sequence
from ollama import Client

from rag.app.schema import FoodCalendar, Recipe
from rag.app.prompts import (
    meal_plan_parser,
    meal_plan_template,
)


class OllamaClient:
    def __init__(
        self,
        embedding_model: str = "snowflake-arctic-embed",
        generative_model: str = "qwen3:latest",
        max_retries: int = 3,
        retry_delay: float = 0.5,
    ):
        self.client = Client()
        self.embedding_model = embedding_model
        self.generative_model = generative_model
        self.max_retries = max_retries
        self.retry_delay = retry_delay

    def get_embedding(self, recipe: Recipe) -> Sequence[float]:
        attempt = 0
        serialized_recipe = recipe.to_string()

        while attempt < self.max_retries:
            try:
                result = self.client.embeddings(
                    model=self.embedding_model, prompt=serialized_recipe
                )
                return result.embedding
            except Exception as e:
                print(f"Issue with generating embedding from Ollama API with error {e}")
                attempt += 1
                if attempt > self.max_retries:
                    raise
                time.sleep(self.retry_delay)

    def generate_meal_plan(
        self, recipes: List[Recipe], user_input: str
    ) -> FoodCalendar:
        recipes_string = "\n\n".join([recipe.to_string() for recipe in recipes])

        prompt = meal_plan_template.invoke(
            {"recipes": recipes_string, "user_input": user_input}
        ).to_string()

        attempt = 0

        while attempt < self.max_retries:
            try:
                result = self.client.generate(
                    model=self.generative_model, prompt=prompt
                )

                meal_plan = meal_plan_parser.parse(result)

                return meal_plan
            except Exception as e:
                print(
                    f"Issue with generating Food Calendar from generative model with error {e}"
                )
                attempt += 1
                if attempt > self.max_retries:
                    raise
                time.sleep(self.retry_delay)
