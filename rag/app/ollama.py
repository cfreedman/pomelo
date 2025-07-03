import time
from typing import List, Sequence
from ollama import Client

from rag.app.schema import FoodCalendar, Recipe
from rag.app.prompts import (
    food_calendar_parser,
    food_calendar_template,
    food_calendar_system_prompt,
)


class OllamaClient:
    def __init__(
        self,
        generative_model: str = "qwen3:latest",
        embedding_model: str = "",
        max_retries: int = 3,
        retry_delay: float = 0.5,
    ):
        self.client = Client(host="http://ollama:11434")
        self.generative_model = generative_model
        self.embedding_model = embedding_model
        self.max_retries = max_retries
        self.retry_delay = retry_delay

    def get_embedding(self, object: str) -> Sequence[float]:
        attempt = 0

        while attempt < self.max_retries:
            try:
                result = self.client.embeddings(
                    model=self.embedding_model, prompt=object
                )
                print(f"Resulting embedding is {result.embedding}")
                return result.embedding
            except Exception as e:
                print(f"Issue with generating embedding from Ollama API with error {e}")
                attempt += 1
                if attempt > self.max_retries:
                    raise
                time.sleep(self.retry_delay)

    def generate_food_calendar(
        self, recipes: List[Recipe], user_input: str
    ) -> FoodCalendar:
        recipes_string = "\n\n".join([recipe.to_string() for recipe in recipes])

        prompt = food_calendar_template.invoke(
            {"recipes": recipes_string, "user_input": user_input}
        ).to_string()

        attempt = 0

        while attempt < self.max_retries:
            try:
                result = self.client.generate(
                    model=self.generative_model,
                    prompt=prompt,
                    system=food_calendar_system_prompt,
                )

                food_calendar = food_calendar_parser.parse(result)

                return food_calendar
            except Exception as e:
                print(
                    f"Issue with generating Food Calendar from generative model with error {e}"
                )
                attempt += 1
                if attempt > self.max_retries:
                    raise
                time.sleep(self.retry_delay)
