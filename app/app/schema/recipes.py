from typing import List, Optional

from pydantic import AliasChoices, BaseModel, ConfigDict, Field

from app.schema.ingredients import (
    IngredientWithAmount,
    IngredientWithAmountCreate,
)
from app.schema.tags import Tag


class BaseRecipe(BaseModel):
    id: int
    name: str


class BaseRecipeWithAmount(BaseModel):
    id: int
    name: str
    quantity: int


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
    ingredients: List[IngredientWithAmount]

    def to_recipe_message(self):
        ingredients = [ingredient.name for ingredient in self.ingredients]
        tags = [tag.name for tag in self.tags]

        return RecipeMessage(
            id=self.id,
            name=self.name,
            cuisine=self.cuisine,
            meal_type=self.meal_type,
            servings=self.servings,
            tags=tags,
            ingredients=ingredients,
        )


class RecipeCreate(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    cuisine: Optional[str]
    meal_type: Optional[str] = Field(
        validation_alias=AliasChoices("meal_type", "mealType")
    )
    servings: int
    tags: List[str]
    ingredients: List[IngredientWithAmountCreate]


class RecipeMessage(BaseModel):
    id: int
    name: str
    cuisine: Optional[str]
    meal_type: Optional[str]
    servings: int
    tags: List[str]
    ingredients: List[str]


# Don't need just specify id in API hit
# class RecipeUpdate(RecipeCreate):
#     id: int
