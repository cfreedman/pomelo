from typing import Optional

from pydantic import BaseModel, ConfigDict


class Ingredient(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    units: Optional[str] = None


class IngredientCreate(BaseModel):
    name: str
    units: Optional[str] = None


class IngredientWithAmount(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    units: Optional[str] = None
    quantity: int


class IngredientWithAmountCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    units: Optional[str] = None
    quantity: int
