from datetime import datetime
from typing import List
from pydantic import AliasChoices, BaseModel, ConfigDict, Field

from app.schema.ingredients import IngredientWithAmount, IngredientWithAmountCreate


class ShoppingList(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    week_start: datetime = Field(
        validation_alias=AliasChoices("week_start", "weekStart")
    )
    items: List[IngredientWithAmount]


class ShoppingListCreate(BaseModel):
    week_start: datetime = Field(
        validation_alias=AliasChoices("week_start", "weekStart")
    )
    items: List[IngredientWithAmountCreate]
