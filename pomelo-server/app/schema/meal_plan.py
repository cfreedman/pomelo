from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict

from app.schema.recipes import Recipe, RecipeCreate


class MealPlan(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    week_start: datetime
    items: List[Recipe]


class MealPlanCreate(BaseModel):
    week_start: datetime
    items: List[RecipeCreate]
