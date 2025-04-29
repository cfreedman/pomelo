from typing import List, Optional

from pydantic import AliasChoices, BaseModel, ConfigDict, Field


class Ingredient(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    units: Optional[str] = None


class RecipeIngredient(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    ingredient: Ingredient
    quantity: int


class RecipeIngredientCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    units: Optional[str] = None
    quantity: int


class Tag(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


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


class StoreBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    address: str
    latitude: float
    longitude: float


class StoreCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    address: str
    latitude: float
    longitude: float
