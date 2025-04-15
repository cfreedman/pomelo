from typing import List, Optional

from pydantic import AliasChoices, BaseModel, Field


class Ingredient(BaseModel):
    id: int
    name: str
    units: Optional[str] = None


class RecipeIngredient(BaseModel):
    id: int
    name: str
    units: Optional[str] = None
    quantity: int


class RecipeIngredientCreate(BaseModel):
    name: str
    units: Optional[str] = None
    quantity: int


class Tag(BaseModel):
    id: int
    name: str


class Recipe(BaseModel):
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
    name: str
    cuisine: Optional[str]
    meal_type: Optional[str] = Field(
        validation_alias=AliasChoices("meal_type", "mealType")
    )
    servings: int
    tags: List[str]
    ingredients: List[RecipeIngredientCreate]
