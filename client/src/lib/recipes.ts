import { BASE_URL } from "@/config/constants";
import { BaseStore } from "./stores";

// Data structures for data types coming in from backend

export interface Tag {
  id: string;
  name: string;
}

export interface Ingredient {
  id: string;
  name: string;
  units?: string;

  foodType?: string;
}

export interface IngredientWithAmount extends Ingredient {
  quantity: number;
}

export interface ShoppingIngredient extends IngredientWithAmount {
  store: BaseStore;
}

export interface Recipe {
  id: string;
  name: string;
  cuisine?: string;
  mealType?: string;
  servings: number;
  tags: Tag[];
  ingredients: IngredientWithAmount[];
}

export function hasCuisine(
  recipe: Recipe
): recipe is Recipe & { cuisine: string } {
  return typeof recipe.cuisine === "string";
}

export function hasMealType(
  recipe: Recipe
): recipe is Recipe & { mealType: string } {
  return typeof recipe.mealType === "string";
}

// Data type to send to backend for creation or updating

export type IngredientCreate = Omit<Ingredient, "id">;
export type IngredientWithAmountCreate = Omit<IngredientWithAmount, "id">;

export type RecipeCreate = Omit<Recipe, "id" | "ingredients" | "tags"> & {
  tags: string[];
  ingredients: IngredientWithAmountCreate[];
};

export const RECIPE_DATA: Recipe[] = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    mealType: "Dinner",
    servings: 4,
    tags: [
      { id: "1", name: "Pasta" },
      { id: "2", name: "Comfort Food" },
    ],
    ingredients: [
      { id: "1", name: "Spaghetti", quantity: 200, units: "g" },
      { id: "2", name: "Eggs", quantity: 3 },
      { id: "3", name: "Pancetta", quantity: 100, units: "g" },
      { id: "4", name: "Parmesan Cheese", quantity: 50, units: "g" },
    ],
  },
  {
    id: "2",
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    mealType: "Dinner",
    servings: 3,
    tags: [
      { id: "3", name: "Spicy" },
      { id: "4", name: "Curry" },
    ],
    ingredients: [
      { id: "5", name: "Chicken Breast", quantity: 300, units: "g" },
      { id: "6", name: "Yogurt", quantity: 100, units: "ml" },
      { id: "7", name: "Tomato Puree", quantity: 200, units: "ml" },
      { id: "8", name: "Spices", quantity: 10, units: "g" },
    ],
  },
  {
    id: "3",
    name: "Vegetable Pad Thai",
    cuisine: "Thai",
    mealType: "Lunch",
    servings: 2,
    tags: [
      { id: "5", name: "Vegetarian" },
      { id: "6", name: "Noodles" },
    ],
    ingredients: [
      { id: "9", name: "Rice Noodles", quantity: 200, units: "g" },
      { id: "10", name: "Tofu", quantity: 150, units: "g" },
      { id: "11", name: "Peanuts", quantity: 50, units: "g" },
      { id: "12", name: "Bean Sprouts", quantity: 100, units: "g" },
    ],
  },
  {
    id: "4",
    name: "Beef Tacos",
    cuisine: "Mexican",
    mealType: "Dinner",
    servings: 2,
    tags: [
      { id: "7", name: "Tacos" },
      { id: "8", name: "Quick Meal" },
    ],
    ingredients: [
      { id: "13", name: "Ground Beef", quantity: 250, units: "g" },
      { id: "14", name: "Taco Shells", quantity: 6 },
      { id: "15", name: "Cheddar Cheese", quantity: 100, units: "g" },
      { id: "16", name: "Lettuce", quantity: 50, units: "g" },
    ],
  },
  {
    id: "5",
    name: "Greek Salad",
    cuisine: "Greek",
    mealType: "Lunch",
    servings: 4,
    tags: [
      { id: "9", name: "Healthy" },
      { id: "10", name: "Salad" },
    ],
    ingredients: [
      { id: "17", name: "Cucumber", quantity: 150, units: "g" },
      { id: "18", name: "Tomatoes", quantity: 200, units: "g" },
      { id: "19", name: "Feta Cheese", quantity: 100, units: "g" },
      { id: "20", name: "Olives", quantity: 50, units: "g" },
    ],
  },
  {
    id: "6",
    name: "Blueberry Pancakes",
    cuisine: "American",
    mealType: "Breakfast",
    servings: 4,
    tags: [
      { id: "11", name: "Sweet" },
      { id: "12", name: "Breakfast" },
    ],
    ingredients: [
      { id: "21", name: "Flour", quantity: 200, units: "g" },
      { id: "22", name: "Milk", quantity: 250, units: "ml" },
      { id: "23", name: "Blueberries", quantity: 100, units: "g" },
      { id: "24", name: "Eggs", quantity: 2 },
    ],
  },
];

export type BaseRecipe = Pick<Recipe, "id" | "name">;

export const BASE_RECIPE_DATA: BaseRecipe[] = [
  { id: "1", name: "Spaghetti Bolognese" },
  { id: "2", name: "Chicken Curry" },
  { id: "3", name: "Beef Stroganoff" },
  { id: "4", name: "Vegetable Stir Fry" },
  { id: "5", name: "Fish Tacos" },
  { id: "6", name: "Margherita Pizza" },
  { id: "7", name: "Caesar Salad" },
  { id: "8", name: "Lentil Soup" },
  { id: "9", name: "Pancakes" },
  { id: "10", name: "Chocolate Brownies" },
];

export const fetchIngredientById = async (id: string): Promise<Ingredient> => {
  const response = await fetch(`${BASE_URL}/ingredients/${id}`);

  return await response.json();
};

export const fetchAllIngredients = async (): Promise<Ingredient[]> => {
  const response = await fetch(`${BASE_URL}/ingredients`);

  return await response.json();
};

export const addIngredient = async (
  ingredient: IngredientCreate
): Promise<Ingredient> => {
  const response = await fetch(`{BASE_URL}/ingredients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });

  return await response.json();
};

export const updateIngredientsById = async (
  id: string,
  ingredient: IngredientCreate
): Promise<Ingredient> => {
  const response = await fetch(`{BASE_URL}/ingredients/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });

  return await response.json();
};

export const deleteIngredientById = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/ingredients/${id}`, {
    method: "DELETE",
  });

  return;
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${BASE_URL}/recipes/${id}`);

  return await response.json();
};

export const fetchAllRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${BASE_URL}/recipes`);

  return await response.json();
};

export const addRecipe = async (recipe: RecipeCreate): Promise<Recipe> => {
  const response = await fetch(`{BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  return await response.json();
};

export const updateRecipeById = async (
  id: string,
  recipe: RecipeCreate
): Promise<Recipe> => {
  const response = await fetch(`{BASE_URL}/recipes/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  return await response.json();
};

export const deleteRecipeById = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/recipes/${id}`, {
    method: "DELETE",
  });

  return;
};
