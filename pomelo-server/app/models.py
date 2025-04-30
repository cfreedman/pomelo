from datetime import datetime
from typing import List

from sqlalchemy import Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

from app.database import db


class Base(DeclarativeBase):
    pass


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    units: Mapped[str] = mapped_column(String(20), nullable=True)
    # preferred_store: Mapped[int] = mapped_column(ForeignKey("stores.id"))

    # Field to select list of ingredient-recipe-bridge rows for data stored there
    associated_recipes: Mapped[List["Recipe"]] = relationship(
        "IngredientRecipeBridge", back_populates="ingredient"
    )
    associated_shopping_lists: Mapped[List["ShoppingList"]] = relationship(
        "IngredientShoppingListBridge", back_populates="ingredient"
    )

    def __repr__(self) -> str:
        return f"Ingredient id={self.id}, name={self.name}"


class Tag(db.Model):
    __tablename__ = "tags"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))

    associated_recipes: Mapped[List["TagRecipeBridge"]] = relationship(
        "TagRecipeBridge", back_populates="tag"
    )

    def __repr__(self) -> str:
        return f"Tag id={self.id}, name={self.name}"


class Recipe(db.Model):
    __tablename__ = "recipes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    cuisine: Mapped[str] = mapped_column(String(100), nullable=True)
    meal_type: Mapped[str] = mapped_column(String(50), nullable=True)
    servings: Mapped[int] = mapped_column(Integer)

    # Field to select list of ingredient-recipe-bridge rows for data stored there
    recipe_ingredients: Mapped[List[Ingredient]] = relationship(
        "IngredientRecipeBridge", back_populates="recipe"
    )
    recipe_tags: Mapped[List[Tag]] = relationship(
        "TagRecipeBridge", back_populates="recipe"
    )
    associated_meal_plans: Mapped[List["MealPlan"]] = relationship(
        "RecipeMealPlanBridge", back_populates="recipe"
    )

    def __repr__(self) -> str:
        return f"Recipe id={self.id}, name={self.name}"


class IngredientRecipeBridge(db.Model):
    __tablename__ = "ingredient_recipe_bridge"

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), primary_key=True)
    ingredient_id: Mapped[int] = mapped_column(
        ForeignKey("ingredients.id"), primary_key=True
    )
    quantity: Mapped[int] = mapped_column(Integer)

    recipe = relationship("Recipe", back_populates="recipe_ingredients")
    ingredient = relationship("Ingredient", back_populates="associated_recipes")

    def __repr__(self) -> str:
        return f"Ingredient id={self.ingredient_id} appears in recipe {self.recipe_id} with quantity {self.quantity}"


class TagRecipeBridge(db.Model):
    __tablename__ = "tag_recipe_bridge"

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), primary_key=True)
    tag_id: Mapped[int] = mapped_column(ForeignKey("tags.id"), primary_key=True)
    recipe = relationship("Recipe", back_populates="tag_associations")
    tag = relationship("Tag", back_populates="recipe_associations")

    def __repr__(self) -> str:
        return f"Tag id={self.tag_id} appears in recipe {self.recipe_id}"


class Store(db.Model):
    __tablename__ = "stores"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    address: Mapped[str] = mapped_column(String(75))
    latitude: Mapped[float] = mapped_column(Float)
    longitude: Mapped[float] = mapped_column(Float)

    def __repr__(self) -> str:
        return f"Store {self.name} located at {self.address}"


# This hsould have a many to one relationship (many ingredients mapped to one store) - change this
class IngredientStoreBridge(db.Model):
    __tablename__ = "ingredient_store_bridge"

    ingredient_id: Mapped[int] = mapped_column(
        ForeignKey("ingredients.id"), primary_key=True
    )
    store_id: Mapped[int] = mapped_column(ForeignKey("stores.id"), primary_key=True)

    ingredient = relationship("Ingredient", back_populates="ingredient_stores")
    store = relationship("Store", back_populates="store_ingredients")


class MealPlan(db.Model):
    __tablename__ = "meal_plans"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    week_start: Mapped[datetime] = mapped_column(
        Date
    )  # Represents the Sunday of the week

    recipes: Mapped[List[Recipe]] = relationship(
        "RecipeMealPlanBridge", back_populates="meal_plan"
    )


# Many to many for recipes appearing in weekly meal plans
class RecipeMealPlanBridge(db.Model):
    __tablename__ = "recipe_meal_plan_bridge"

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), primary_key=True)
    meal_plan_id: Mapped[int] = mapped_column(
        ForeignKey("meal_plans.id"), primary_key=True
    )
    quantity: Mapped[int] = mapped_column(Integer, default=1)

    recipe: Mapped[Recipe] = relationship(
        "Recipe", back_populates="associated_meal_plans"
    )
    meal_plan: Mapped[MealPlan] = relationship("MealPlan", back_populates="recipes")


class ShoppingList(db.Model):
    __tablename__ = "shopping_lists"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    week_start: Mapped[datetime] = mapped_column(Date)

    items: Mapped[List[Ingredient]] = relationship(
        "IngredientShoppingListBridge", back_populated="shopping_list"
    )


# Many to many for ingredients appearing in weekly hsopping lists
class IngredientShoppingListBridge(db.Model):
    __tablename__ = "ingredient_shopping_list_bridge"

    ingredient_id: Mapped[int] = mapped_column(
        ForeignKey("ingredients.id"), primary_key=True
    )
    shopping_list_id: Mapped[int] = mapped_column(
        ForeignKey("shopping_lists.id"), primary_key=True
    )
    quantity: Mapped[int] = mapped_column(Integer, default=1)

    ingredient: Mapped[Ingredient] = relationship(
        "Ingredient", back_populateds="associated_shopping_lists"
    )
    shopping_list: Mapped[ShoppingList] = relationship(
        "ShoppingList", back_populates="items"
    )
