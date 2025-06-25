from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class RecipeMessage(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    cuisine: Optional[str]
    meal_type: Optional[str]
    servings: int
    tags: List[str]
    ingredients: List[str]

    def to_embedding_string(self) -> str:
        name = f"Recipe: {self.name}\n"
        features = f"Features: {self.cusine}, {self.meal_type}\n"
        servings = f"Servings: {self.servings}\n"
        ingredients = "Ingredients: " + ", ".join(self.ingredient)
        tags = "Tags: " + ", ".join(self.tags)

        return name + features + servings + ingredients + tags
