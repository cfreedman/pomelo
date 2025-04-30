from typing import List, Optional

from pydantic import AliasChoices, BaseModel, ConfigDict, Field

from app.schema.ingredients import RecipeIngredient, RecipeIngredientCreate
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
    ingredients: List[RecipeIngredient]


class RecipeCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    cuisine: Optional[str]
    meal_type: Optional[str] = Field(
        validation_alias=AliasChoices("meal_type", "mealType")
    )
    servings: int
    tags: List[str]
    ingredients: List[RecipeIngredientCreate]


class RecipeUpdate(RecipeCreate):
    id: int
