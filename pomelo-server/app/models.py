from datetime import datetime
from typing import List, Optional

from sqlalchemy import Date, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app import db
from app.schema.ingredients import Ingredient as IngredientSchema, IngredientWithAmount
from app.schema.tags import Tag as TagSchema
from app.schema.recipes import BaseRecipe, Recipe as RecipeSchema
from app.schema.stores import Store as StoreSchema
from app.schema.meal_plan import MealPlan as MealPlanSchema
from app.schema.shopping_list import ShoppingList as ShoppingListSchema


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    units: Mapped[str] = mapped_column(String(20), nullable=True)
    # preferred_store: Mapped[int] = mapped_column(ForeignKey("stores.id"))

    # Field to select list of ingredient-recipe-bridge rows for data stored there
    recipe_links: Mapped[List["IngredientRecipeBridge"]] = relationship(
        "IngredientRecipeBridge",
        back_populates="ingredient",
        cascade="all, delete-orphan",
    )
    shopping_list_links: Mapped[List["IngredientShoppingListBridge"]] = relationship(
        "IngredientShoppingListBridge",
        back_populates="ingredient",
        cascade="all, delete-orphan",
    )

    store_id: Mapped[Optional[int]] = mapped_column(ForeignKey("stores.id"))
    store: Mapped[Optional["Store"]] = relationship(
        "Store", back_populates="ingredients"
    )

    def __repr__(self) -> str:
        return f"Ingredient id={self.id}, name={self.name}"

    def to_ingredient_schema(self) -> IngredientSchema:
        return IngredientSchema(id=self.id, name=self.name, units=self.units)


class Tag(db.Model):
    __tablename__ = "tags"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50))

    recipes: Mapped[List["Recipe"]] = relationship(
        "Recipe", secondary="tag_recipe_bridge", back_populates="tags"
    )

    def __repr__(self) -> str:
        return f"Tag id={self.id}, name={self.name}"

    def to_tag_schema(self) -> TagSchema:
        return TagSchema(id=self.id, name=self.name)


class Recipe(db.Model):
    __tablename__ = "recipes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    cuisine: Mapped[str] = mapped_column(String(100), nullable=True)
    meal_type: Mapped[str] = mapped_column(String(50), nullable=True)
    servings: Mapped[int] = mapped_column(Integer)

    # Field to select list of ingredient-recipe-bridge rows for data stored there
    ingredient_links: Mapped[List["IngredientRecipeBridge"]] = relationship(
        "IngredientRecipeBridge", back_populates="recipe", cascade="all, delete-orphan"
    )
    tags: Mapped[List[Tag]] = relationship(
        "Tag", secondary="tag_recipe_bridge", back_populates="recipes"
    )
    meal_plan_links: Mapped[List["RecipeMealPlanBridge"]] = relationship(
        "RecipeMealPlanBridge", back_populates="recipe", cascade="all, delete-orphan"
    )

    def __repr__(self) -> str:
        return f"Recipe id={self.id}, name={self.name}"

    def to_recipe_schema(self) -> RecipeSchema:
        tags = [tag.to_tag_schema() for tag in self.tags]
        ingredients = []
        for ingredient_link in self.ingredient_links:
            quantity = ingredient_link.quantity
            id, name, units = (
                ingredient_link.ingredient.id,
                ingredient_link.ingredient.name,
                ingredient_link.ingredient.units,
            )

            ingredients.append(
                IngredientWithAmount(id=id, name=name, units=units, quantity=quantity)
            )

        recipe = RecipeSchema(
            id=self.id,
            name=self.name,
            cuisine=self.cuisine,
            meal_type=self.meal_type,
            servings=self.servings,
            tags=tags,
            ingredients=ingredients,
        )
        return recipe


class IngredientRecipeBridge(db.Model):
    __tablename__ = "ingredient_recipe_bridge"

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), primary_key=True)
    ingredient_id: Mapped[int] = mapped_column(
        ForeignKey("ingredients.id"), primary_key=True
    )
    quantity: Mapped[int] = mapped_column(Integer)

    recipe = relationship("Recipe", back_populates="ingredient_links")
    ingredient = relationship("Ingredient", back_populates="recipe_links")

    def __repr__(self) -> str:
        return f"Ingredient id={self.ingredient_id} appears in recipe {self.recipe_id} with quantity {self.quantity}"


tag_recipe_bridge = db.Table(
    "tag_recipe_bridge",
    db.Column("recipe_id", ForeignKey("recipes.id"), primary_key=True),
    db.Column("tag_id", ForeignKey("tags.id"), primary_key=True),
)


class Store(db.Model):
    __tablename__ = "stores"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    address: Mapped[str] = mapped_column(String(75), nullable=False)
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)

    ingredients: Mapped[List[Ingredient]] = relationship(
        "Ingredient", back_populates="store"
    )

    def __repr__(self) -> str:
        return f"Store {self.name} located at {self.address}"

    def to_store_schema(self) -> StoreSchema:
        ingredients = [
            ingredient.to_ingredient_schema() for ingredient in self.ingredients
        ]

        return StoreSchema(
            id=self.id,
            name=self.name,
            address=self.address,
            latitude=self.latitude,
            longitude=self.longitude,
            ingredients=ingredients,
        )


class MealPlan(db.Model):
    __tablename__ = "meal_plans"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    week_start: Mapped[datetime] = mapped_column(
        Date
    )  # Represents the Sunday of the week

    recipe_links: Mapped[List["RecipeMealPlanBridge"]] = relationship(
        "RecipeMealPlanBridge", back_populates="meal_plan", cascade="all, delete-orphan"
    )

    def to_meal_plan_schema(self):
        items = []
        for link in self.recipe_links:
            base_recipe = BaseRecipe(id=link.recipe.id, name=link.recipe.name)
            items.append(base_recipe)

        return MealPlanSchema(week_start=self.week_start, items=items)


# Many to many for recipes appearing in weekly meal plans
class RecipeMealPlanBridge(db.Model):
    __tablename__ = "recipe_meal_plan_bridge"

    recipe_id: Mapped[int] = mapped_column(ForeignKey("recipes.id"), primary_key=True)
    meal_plan_id: Mapped[int] = mapped_column(
        ForeignKey("meal_plans.id"), primary_key=True
    )
    quantity: Mapped[int] = mapped_column(Integer, default=1)

    recipe: Mapped[Recipe] = relationship("Recipe", back_populates="meal_plan_links")
    meal_plan: Mapped[MealPlan] = relationship(
        "MealPlan", back_populates="recipe_links"
    )


class ShoppingList(db.Model):
    __tablename__ = "shopping_lists"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    week_start: Mapped[datetime] = mapped_column(Date)

    ingredient_links: Mapped[List["IngredientShoppingListBridge"]] = relationship(
        "IngredientShoppingListBridge",
        back_populates="shopping_list",
        cascade="all, delete-orphan",
    )

    def to_shopping_list_schema(self):
        items = []
        for link in self.ingredient_links:
            quantity = link.quantity
            ingredient = IngredientWithAmount(
                id=link.ingredient.id,
                name=link.ingredient.name,
                units=link.ingredient.units,
                quantity=quantity,
            )
            items.append(ingredient)

        return ShoppingListSchema(week_start=self.week_start, items=items)


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
        "Ingredient", back_populates="shopping_list_links"
    )
    shopping_list: Mapped[ShoppingList] = relationship(
        "ShoppingList", back_populates="ingredient_links"
    )
