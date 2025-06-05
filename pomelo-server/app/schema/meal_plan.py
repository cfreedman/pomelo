from typing import List
from pydantic import AliasChoices, BaseModel, ConfigDict, Field

from app.schema.recipes import BaseRecipeWithAmount


class FoodCalendar(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    Sunday: List[BaseRecipeWithAmount]
    Monday: List[BaseRecipeWithAmount]
    Tuesday: List[BaseRecipeWithAmount]
    Wednesday: List[BaseRecipeWithAmount]
    Thursday: List[BaseRecipeWithAmount]
    Friday: List[BaseRecipeWithAmount]
    Saturday: List[BaseRecipeWithAmount]


class MealPlan(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    week_start: str = Field(validation_alias=AliasChoices("week_start", "weekStart"))
    items: FoodCalendar
