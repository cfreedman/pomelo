import time
from typing import Sequence

from ollama import Client


class OllamaClient:
    def __init__(
        self,
        embedding_model: str = "snowflake-arctic-embed",
        max_retries: int = 3,
        retry_delay: float = 0.5,
    ):
        self.client = Client("http://ollama:11434")
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
