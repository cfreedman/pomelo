from typing import List, Optional
from pydantic import AliasChoices, BaseModel, ConfigDict, Field


class Tag(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class IngredientWithAmount(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    units: Optional[str] = None
    quantity: int


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


class BaseRecipeWithAmount(BaseModel):
    id: int
    name: str
    quantity: int


class FoodCalendar(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    Sunday: List[BaseRecipeWithAmount]
    Monday: List[BaseRecipeWithAmount]
    Tuesday: List[BaseRecipeWithAmount]
    Wednesday: List[BaseRecipeWithAmount]
    Thursday: List[BaseRecipeWithAmount]
    Friday: List[BaseRecipeWithAmount]
    Saturday: List[BaseRecipeWithAmount]
