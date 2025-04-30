from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict

from app.schema.ingredients import IngredientWithAmount, IngredientWithAmountCreate


class ShoppingList(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    week: datetime
    items: List[IngredientWithAmount]


class ShoppingListCreate(BaseModel):
    week: datetime
    items: List[IngredientWithAmountCreate]
