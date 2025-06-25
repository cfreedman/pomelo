import pytest

from embedder.src.schema import RecipeMessage


def test_embedding_string():
    recipe_message = RecipeMessage(
        id=1,
        name="Green Curry",
        cuisine="Thai",
        meal_type="Dinner",
        servings=3,
        ingredients=[
            "Chicken Thigh",
            "Green Curry Paste",
            "Bamboo Shoots",
            "Coconut Milk",
        ],
        tags=["Spicy", "Healthy"],
    )

    serialized_recipe = """
    Recipe: Green Curry
    Features: Thai, Dinner
    Servings: 3
    Ingredients: Chicken Thigh, Green Curry Paste, Bamboo Shoots, Coconut Milk
    Tags: Spicy, Healthy
    """

    assert recipe_message.to_embedding_string() == serialized_recipe
