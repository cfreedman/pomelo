import os

from app import create_app
from app.db import initialize_collection, client

app = create_app()

print("Weaviate port,", os.environ["WEAVIATE_PORT"])

client.connect()

initialize_collection()

objects = [
    {
        "recipe": "Spaghetti Carbonara: Cook spaghetti. In a bowl, mix eggs, parmesan, and pepper. Fry pancetta, add pasta, then egg mixture. Toss quickly and serve.",
    },
    {
        "recipe": "Chicken Curry: Sauté onions, garlic, and ginger. Add chicken pieces and brown. Stir in curry powder, tomatoes, and coconut milk. Simmer until cooked.",
    },
    {
        "recipe": "Vegetable Stir Fry: Heat oil in a wok. Add chopped vegetables and stir fry. Add soy sauce, garlic, and ginger. Serve with rice or noodles.",
    },
    {
        "recipe": "Beef Tacos: Cook ground beef with taco seasoning. Fill taco shells with beef, lettuce, tomato, cheese, and salsa.",
    },
    {
        "recipe": "Pancakes: Mix flour, eggs, milk, and baking powder. Pour batter onto a hot griddle. Flip when bubbles form. Serve with syrup.",
    },
    {
        "recipe": "Caesar Salad: Toss romaine lettuce with Caesar dressing, croutons, and parmesan cheese. Top with grilled chicken if desired.",
    },
    {
        "recipe": "Tomato Soup: Sauté onions and garlic. Add chopped tomatoes and broth. Simmer, blend until smooth, and season to taste.",
    },
    {
        "recipe": "Grilled Cheese Sandwich: Butter bread slices, add cheese between them, and grill until golden brown on both sides.",
    },
    {
        "recipe": "Banana Bread: Mix mashed bananas, flour, sugar, eggs, and baking soda. Pour into a loaf pan and bake until golden.",
    },
    {
        "recipe": "Omelette: Beat eggs, pour into a pan, add fillings like cheese, ham, or vegetables. Fold and cook until set."
    },
]

collection = client.collections.get("recipes")

# for recipe_object in objects:
#     print(collection.data.insert(recipe_object))

# print("Regular objects list")
# for recipe_object in collection.iterator():
#     print(recipe_object.uuid, recipe_object.properties)

print("Similarity search")
response = collection.query.near_text(query="eggs")

for response_object in response.objects:
    print(response_object.properties)
    print(response_object.metadata.distance)
