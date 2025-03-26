from typing import Dict, List, Optional

from pydantic import BaseModel


class IngredientBase(BaseModel):
    name: str
    units: Optional[str] = None


class Ingredient(IngredientBase):
    id: int

    class Config:
        orm_mode = True


class IngredientWithAmount(IngredientBase):
    amount: int


class RecipeBase(BaseModel):
    name: str
    ingredients: List[IngredientWithAmount]


class Recipe(RecipeBase):
    id: int

    class Config:
        orm_mode = True
