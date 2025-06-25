from app.models import Recipe
from app.schema.ingredients import IngredientWithAmount
from app.schema.recipes import Recipe as RecipeSchema, RecipeMessage
from app.schema.tags import Tag


class RecipeTests:
    recipe_model = Recipe(
        id=1,
        name="Green Curry",
        cuisine="Thai",
        meal_type="Dinner",
        servings=3,
        ingredient_links=[],
        tags=[],
        meal_plan_links=[],
    )
    recipe_schema = RecipeSchema(
        id=1,
        name="Green Curry",
        cuisine="Thai",
        meal_type="Dinner",
        servings=3,
        tags=[Tag(id=1, name="Spicy"), Tag(id=2, name="Healthy")],
        ingredients=[
            IngredientWithAmount(
                id=1, name="Chicken Thigh", units="grams", quantity=500
            )
        ],
    )

    def test_recipe_message(self):
        recipe_message = self.recipe_schema.to_recipe_message()

        assert recipe_message == RecipeMessage(
            id=1,
            name="Green Curry",
            cuisine="Thai",
            meal_type="Dinner",
            servings=3,
            tags=["Spicy", "Healthy"],
            ingredients=["Chicken Thigh"],
        )
