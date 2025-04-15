from typing import List, Optional

from pydantic import BaseModel


class IngredientBase(BaseModel):
    name: str
    units: Optional[str] = None


class IngredientDB(IngredientBase):
    id: int


class RecipeIngredient(IngredientBase):
    quantity: int


class RecipeIngredientDB(RecipeIngredient):
    id: int


class RecipeBase(BaseModel):
    name: str
    servings: int
    ingredients: List[RecipeIngredient]


class RecipeDB(RecipeBase):
    id: int
    ingredients: List[RecipeIngredientDB]
