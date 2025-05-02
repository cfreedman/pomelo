from typing import List, Optional

from pydantic import AliasChoices, BaseModel, ConfigDict, Field

from app.schema.ingredients import (
    IngredientCreate,
    IngredientWithAmount,
)
from app.schema.tags import Tag


class Recipe(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    cuisine: Optional[str]
    meal_type: Optional[str] = Field(
        validation_alias=AliasChoices("meal_type", "mealType")
    )
    servings: int
    tags: List[Tag]
    ingredients: List[IngredientWithAmount]


class RecipeCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    cuisine: Optional[str]
    meal_type: Optional[str] = Field(
        validation_alias=AliasChoices("meal_type", "mealType")
    )
    servings: int
    tags: List[str]
    ingredients: List[IngredientCreate]


class RecipeUpdate(RecipeCreate):
    id: int
