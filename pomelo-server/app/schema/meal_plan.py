from datetime import datetime
from typing import Dict, List
from pydantic import AliasChoices, BaseModel, ConfigDict, Field

from app.schema.recipes import BaseRecipe


class MealPlan(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    week_start: datetime = Field(
        validation_alias=AliasChoices("week_start", "weekStart")
    )
    items: Dict[str, List[BaseRecipe]]
